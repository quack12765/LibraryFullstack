<template>
    <div class="container">
        <h3 class="text-center">{{ branch }}</h3>
        <div class="card p-4 border mt-5">
            <h3>館內書籍一覽</h3>
            <table class="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">書名</th>
                        <th scope="col">條碼號</th>
                        <th scope="col">索書號</th>
                        <th scope="col">狀態</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(b, index) in Copys" :key="b.accession_number" class="h-100">
                        <td>{{ index + 1 }}</td>
                        <td><router-link :to=" '/book/' + b.ISBN ">{{ b.name }}</router-link></td>
                        <td>{{ b.accession_number }}</td>
                        <td>{{ b.call_number }}</td>
                        <td>{{ MapCodeToState(b.state) === '' ? "借出中" : MapCodeToState(b.state)}}</td>
                        <td>
                            <button v-if="b.state === 0" @click="HandleBorrow(b.accession_number, branch)" class="btn btn-danger">借閱</button>
                            <button v-else class="btn btn-second" disabled>已借閱</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="card p-4 border mt-5">
            <h3>所有外借書詳情</h3>
            <table class="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">書名</th>
                        <th scope="col">條碼號</th>
                        <th scope="col">借閱日期</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(b, index) in Borrowing" :key="b.accession_number" class="h-100">
                        <td>{{ index + 1 }}</td>
                        <td><router-link :to=" '/book/' + b.ISBN ">{{ b.name }}</router-link></td>
                        <td>{{ b.accession_number }}</td>
                        <td>{{ ParseDate(b.borrow_date) }}</td>
                        <td><button @click="HandleBackCopy(b)" class="btn btn-danger">歸還</button></td>
                        <td><button @click="HandleBackCopy(b)" class="btn btn-danger">查看預約情形</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="card p-4 border mt-5">
            <h3>正在移轉 <mark>進</mark> 的館藏</h3>
            <table class="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">書名</th>
                        <th scope="col">條碼號</th>
                        <th scope="col">移轉日期</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(b, index) in Span_in" :key="b.accession_number" class="h-100">
                        <td>{{ index + 1 }}</td>
                        <td><router-link :to=" '/book/' + b.ISBN ">{{ b.name }}</router-link></td>
                        <td>{{ b.accession_number }}</td>
                        <td>{{ ParseDate(b.date) }}</td>
                        <td><button @click="HandleSpan(b.accession_number)" class="btn btn-danger">登記進館</button></td>
                    </tr>
                </tbody>
            </table>
        </div>



        <div class="jumpFrame row justify-content-center align-items-center" v-if=" branch === '' ">
            <div class="card col-6 p-5" @click.stop>
                <h3>您所在的分館是？</h3>
                <hr>
                <form>
                    <div class="form-group form-row">
                        <label for="address col" class="col-sm-2 col-form-label">分館</label>
                        <select class="form-control col" v-model="sel_branch" id="address">
                            <option v-for="(b) in branchs" :key="b.branch_name">{{ b.branch_name }}</option>
                        </select>
                    </div>
                </form>
                <button class="btn btn-primary mt-5" @click="SetBranch(sel_branch)">確定</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            Copys: [],
            Borrowing: [],
            Span_in: [],
            Span_out: [],
            ReadyToReserverBorrow: [],
            sel_branch: '',
            branch: sessionStorage.getItem('Branch') || ""
        }
    },

    mounted() {
        this.$http
            .post('/api/searchBook/getBorrowingByBranch', {
                data: {
                    branch: this.branch
                }
            })
            .then(res => {
                this.Borrowing = res.data
            })
            .catch(e => { console.log(e) })

        this.$http
            .post('/api/location/getInTransferByBranch', {
                data: {
                    branch: this.branch
                }
            })
            .then(res => {
                this.Span_in = res.data
                console.log(res.data)
            })
            .catch(e => { console.log(e) })

        this.$http
            .post('/api/location/getOutTransferByBranch', {
                data: {
                    branch: this.branch
                }
            })
            .then(res => {
                this.Span_out = res.data
                console.log(res.data)
            })
            .catch(e => { console.log(e) })
        

        this.$http
            .post('/api/searchBook/getAllCopyByBranch', { 
                data: {
                    location: this.branch 
                }
            })
            .then(copys => {
                this.Copys = copys.data
            })
            .catch(e => { console.log(e) })

        this.$http
            .post('/api/searchBook/getState2Copy', { 
                data: {
                    location: this.branch 
                }
            })
            .then(copys => {
                this.ReadyToReserverBorrow = copys.data
                console.log("DADADA", copys.data)
            })
            .catch(e => { console.log(e) })
    },

    methods: {
        SetBranch(b) {
            sessionStorage.setItem('Branch', b)
            this.branch = b
        },

        HandleBackCopy(CopyInfo) {
            this.$http
                .post('/api/searchBook/backCopyByAccession', { 
                    data: CopyInfo
                })
                .then(res => {
                    alert(res.data.affectedRows === 0 ? "歸還失敗!" : "歸還成功!")
                    location.reload()
                })
                .catch(e => { console.log(e) })
        },

        HandleSpan(acc) {
            this.$http
                .post('/api/searchBook/span', { 
                    data: {
                        accession_number: acc,
                        location: this.branch
                    }
                })
                .then(res => {
                    alert("移轉成功！")
                    location.reload()
                })
                .catch(e => { console.log(e) })
        },
    },

    watch: {
        branch: {
            handler() {
                location.reload()
            }
        }
    }
}
</script>

<style>

</style>