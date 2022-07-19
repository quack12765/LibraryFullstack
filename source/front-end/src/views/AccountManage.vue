<template>
    <div>
       <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="card p-5 border">
                        <div class="row">
                            <div class="col-3 ">
                                <img class="w-75 rounded-circle border" src="https://cdn-icons-png.flaticon.com/512/709/709699.png">
                            </div>
                            <div class="col-9 card-body">
                                <div class="card-title">
                                    <h1>USER</h1>
                                </div>
                                <hr>
                                <div class="card-text">
                                    <p> Hello guys! </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
       <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="card p-4 border">
                        <h3>借閱中</h3>
                        <table class="table mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">書名</th>
                                    <th scope="col">條碼號</th>
                                    <th scope="col">借閱日期</th>
                                    <th scope="col">剩餘天數</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(b, index) in Borrowing" :key="b.accession_number">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ b.name }}</td>
                                    <td>{{ b.accession_number }}</td>
                                    <td>{{ ParseDate(b.borrow_date) }}</td>
                                    <td>{{ GetRemainDays(b.borrow_date, 20) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="card p-4 border">
                        <h3>預約中</h3>
                        <table class="table mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">書名</th>
                                    <th scope="col">條碼號</th>
                                    <th scope="col">預約日期</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(b, index) in Reserving" :key="b.accession_number" class="h-100">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ b.name }}</td>
                                    <td>{{ b.accession_number }}</td>
                                    <td>{{ ParseDate(b.borrow_date) }}</td>
                                    <td><button @click="HandleCancelReserve(b.accession_number)" class="btn btn-danger">取消預約</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
       </div>
       <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="card p-4 border">
                        <h3>帳號管理</h3>
                        <div class="row">
                            <div class="card col-4 m-2">
                                <div class="card-body">
                                    <div class="row mb-4">
                                        <router-link :to=" { name: '帳號設定' } " class="border-right col-6 text-primary">修改個人資料</router-link>
                                        <a class="col text-primary">修改密碼</a>
                                    </div>
                                    <div class="card-text border-left p-3">
                                        <small class="">
                                            關於會員的基本資料，例如名字、帳戶、密碼......修改
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="card col-4 m-2">
                                <div class="card-body">
                                    <div class="row mb-4">
                                        <a class="col-6 text-primary">系統設定</a>
                                    </div>
                                    <div class="card-text border-left p-3">
                                        <small class="">
                                            關於會員的基本資料，例如名字、帳戶、密碼......修改
                                        </small>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </div>
</template>

<script>


export default {
    data(){
        return {
            Borrowing: [],
            Reserving: []
        }
    },
    created(){
        
    },
    mounted() {
        this.$http
            .post('/api/searchBook/getBorrowingByAccount', { 
                data: {
                    account: sessionStorage.getItem("ACCOUNT") 
                }
            })
            .then(res => {
                this.Borrowing = res.data
                console.log(res.data)
            })
            .catch(e => { console.log(e) })

        this.$http
            .post('/api/searchBook/getReservingByAccount', { 
                data: {
                    account: sessionStorage.getItem("ACCOUNT") 
                }
            })
            .then(res => {
                this.Reserving = res.data
                console.log(res.data)
            })
            .catch(e => { console.log(e) })
    },
    methods:{
    
    }
}
</script>

<style>
</style>