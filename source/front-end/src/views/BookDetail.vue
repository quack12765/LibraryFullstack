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
                        <td>{{ copy.account === null ? "可借閱" : "借出中 " }}</td>
                        <td>{{ copy.account === null ? 0 : getCopyReservationByAccession(copy.accession_number) }}</td>
                        <td>
                            <button v-if="!copy.account" @click="HandleBorrow(copy.accession_number)" class="btn btn-success">借閱</button>
                            <button v-if="copy.account" @click="HandleReserve(copy.accession_number)" class="btn btn-primary">預約</button>
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
            .then(res => {
                this.Copys = res.data
                console.log(res.data)
            })
            .catch(e => { console.log(e) })

    },

    update() {
        
    },

    methods: {
        getCopyReservationByAccession(acc){
            this.$http
                .post('/api/searchBook/getCopyReservationByAccession', { data: acc })
                .then(res => {
                    console.log(res.data.length)
                })
                .catch(e => { console.log(e) })
            
            return 1
        },

        HandleBorrow(acc) {
            this.$http
                .post('/api/searchBook/borrowCopy', { 
                    data: {
                        accession_number: acc,
                        account: sessionStorage.getItem("ACCOUNT")
                    } 
                })
                .then(res => {
                    alert("借閱成功!")
                    location.reload()
                })
                .catch(e => { 
                    alert("借閱失敗")
                    console.log(e) 
                })
        },

        HandleReserve(acc) {
            this.$http
                .post('/api/searchBook/reserveCopy', { 
                    data: {
                        accession_number: acc,
                        account: sessionStorage.getItem("ACCOUNT")
                    } 
                })
                .then(res => {
                    alert("預約成功!")
                    location.reload()
                })
                .catch(e => { 
                    alert("預約失敗")
                    console.log(e) 
                })
        }
    },
};
</script>

<style lang="scss" scoped>
    .Hide {
        display: none;
    }
</style>