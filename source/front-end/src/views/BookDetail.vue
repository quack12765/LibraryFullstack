<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="card p-4">
                        <div class="row justify-content-around">
                            <div class="col-3 mr-5">
                                <img :src="Book.show_img_url">
                            </div>
                            <div class="col-6">
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
            <ul class="nav nav-tabs">
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
                        <td>{{ copy.account === null ? "可借閱" : "借出中 (" + ParseDate(copy.borrow_date) + ")"}}</td>
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
                                @click="HandleReserve(copy.accession_number)" class="btn btn-primary">預約</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="sel_nav == 1">
                <p> {{ Book.intro }} </p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    inject: ["reload"],

    data() {
        return {
            Book: {},
            Copys: [],
            account: "",
            sel_nav: 0,
        };
    },

    mounted() {
        this.$http
            .post('/api/searchBook/getBookInfoByISBN', { data: this.$route.params.ISBN })
            .then(res => {
                this.Book = res.data[0]
            })
            .catch(e => { console.log(e) })

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

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
    .Hide {
        display: none;
    }
</style>