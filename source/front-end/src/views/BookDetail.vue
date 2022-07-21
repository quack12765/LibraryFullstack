<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="card p-4">
                        <div class="row justify-content-around">
                            <div class="col-sm-12 col-lg mr-5">
                                <img :src="Book.show_img_url">
                            </div>
                            <div class="col-sm-12 col-lg">
                                <div class="card-body">
                                    <h3>{{Book.name}}</h3>
                                    <hr>
                                    <p>作者： {{ Book.author }}</p>
                                    <p>出版社： {{ Book.publisher }}</p>
                                    <p>出版年分: {{ Book.publish_year }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <ul class="nav nav-tabs" style="cursor:pointer;">
                <li class="nav-item">
                    <a class="nav-link " :class="{ active: sel_nav == 0 }" @click=" sel_nav = 0 ">館藏</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: sel_nav == 1 }" @click=" sel_nav = 1 ">更多資訊</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: sel_nav == 2 }" @click=" sel_nav = 2 ">評價</a>
                </li>
            </ul>
            <table v-if="sel_nav == 0" class="table">
                <thead>
                    <tr>
                        <th scope="col">條碼號</th>
                        <th scope="col">索書號</th>
                        <th scope="col">館藏狀態</th>
                        <th scope="col">預約人數</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="copy in Copys" :key="copy.accession_number">
                        <td>{{ copy.accession_number }}</td>
                        <td>{{ copy.call_number }}</td>
                        <td>{{ copy.account === null ? "可借閱" : "借出中 (" + PlusDateByDaysAndParse(copy.borrow_date, 20) + ")"}}</td>
                        <td>{{ copy.account === null ? 0 : copy.reservation.length }}</td>
                        <td>
                            <button 
                                v-if="!copy.account" 
                                class="btn btn-success" @click="HandleBorrow(copy.accession_number)">借閱</button>
                            <button 
                                v-else-if=" copy.reservation.some( r => r.account === account ) "
                                class="btn btn-secondary " disabled>已預約</button>
                            <button 
                                v-else 
                                @click="sel_reserve_copy = copy" class="btn btn-primary">預約</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="sel_nav == 1">
                <p> {{ Book.intro }} </p>
            </div>
            <div v-if="sel_nav == 2">
                <comment-board :commentinfo="mock_comment" />
                <comment-board v-for="comment in comments" :key="comment" :commentinfo="comment" />
            </div>
        </div>

        <div class="jumpFrame row justify-content-center align-items-center" v-if="sel_reserve_copy !== null" @click="sel_reserve_copy = null">
            <div class="card col-6 p-5" @click.stop>
                <h3>選擇取書地點</h3>
                <ul class="mt-3">
                    <li> 此書將會先讓較早預約的人借閱 </li>
                    <li> 如果輪到您取書，將會以電子郵件或是簡訊通知 </li>
                    <li> 館藏將會留在櫃台7天, 如未領取，視同棄權 </li>
                </ul>
                <hr>
                <form>
                    <div class="form-group form-row">
                        <label for="address col" class="col-sm-2 col-form-label">取書地點</label>
                        <select class="form-control col" v-model="sel_reserve_copy.location" id="address">
                            <option v-for="branch in branchs" :key="branch.branch_name" >{{ branch.branch_name }}</option>
                        </select>
                    </div>
                </form>
                <button class="btn btn-primary mt-5" @click="HandleReserve(sel_reserve_copy)">確定</button>
            </div>
        </div>
    </div>
</template>


<script>
import CommentBoard from '../components/commentBoard/commentBoard.vue';

export default {
    inject: ["reload"],

    data() {
        return {
            Book: {},
            Copys: [],
            comments: [],
            mock_comment: {},
            sel_nav: 0,
            sel_branch: "",

            sel_reserve_copy: null
        };
    },

    mounted() {

        // Get Top card information (Book's information)
        this.$http
            .post('/api/searchBook/getBookInfoByISBN', { data: this.$route.params.ISBN })
            .then(res => {
                this.Book = res.data[0]

                // and by the way, use Book data to get the comment information


                // build a personal comment data for user to edit
                this.$http
                    .post('/api/comment/getPersonalComment', { 
                        data: {
                            ISBN: this.Book.ISBN,
                            account: this.account,
                        } 
                    })
                    .then(res => {
                        this.mock_comment = res.data[0] ? res.data[0] : {
                            comment_ISBN: this.Book.ISBN,
                            comment_account: this.account,
                            comment: "",
                            score: 0,

                            // create a var to identify whether user had uploaded data
                            isMock: true
                        }
                    })
                    .catch(e => { 
                        console.log(e) 
                    })

                // get all comment informations
                this.$http
                    .post('/api/comment/getAllCommentsByISBN', { 
                        data: {
                            ISBN: this.Book.ISBN,
                            account: this.account
                        } 
                    })
                    .then(res => {
                        this.comments = res.data
                    })
                    .catch(e => { console.log(e) })
            })
            .catch(e => { console.log(e) })



        // Get first & second nav selection information
        this.$http
            .post('/api/searchBook/getCopyInfoByISBN', { data: this.$route.params.ISBN })
            .then(CopyInfos => {

                // initialize CopyInfo Object format

                this.Copys = CopyInfos.data.map(e => {return {...e, reservation: []}})

                // go through each CopyInfos to get their own Reservation

                CopyInfos.data.map((CopyInfo, index) => {
                    this.$http
                        .post('/api/searchBook/getCopyReservationByAccession', { data: CopyInfo.accession_number })
                        .then(Reservation => {

                            // get Reservation then store in Copys
                            this.$set(this.Copys, index, {
                                ... this.Copys[index],
                                reservation : Reservation.data
                            })

                        })
                        .catch(e => { console.log(e) })
                })
                
            })
            .catch(e => { console.log(e) })
    },

    update() {
        
    },

    components: {
        CommentBoard
    }
};
</script>

<style lang="scss">
    .Hide {
        display: none;
    }
</style>