<template>
    <div class="container">
        <h3>修改個人資料</h3>
        <form class="mt-4">
            <div class="form-group row">
                <label for="email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="email"
                            v-model="account_info.email"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="name" class="col-sm-2 col-form-label">姓名</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="name"
                            v-model="account_info.name"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">性別</label>
                <div class="col-sm-10">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="RadioMale" value=1 name="sex" 
                            :checked=" account_info.sex === 1 " v-model="account_info.sex">
                        <label class="form-check-label" for="RadioMale">Male</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="RadioFeMale" value=2 name="sex" 
                            :checked=" account_info.sex === 2 " v-model="account_info.sex">
                        <label class="form-check-label" for="RadioFeMale">Female</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="RadioOther" value=3 name="sex" 
                            :checked=" account_info.sex === 3 " v-model="account_info.sex">
                        <label class="form-check-label" for="RadioOther">Other</label>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="phone" class="col-sm-2 col-form-label">行動電話</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="phone"
                        v-model="account_info.phone"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="address" class="col-sm-2 col-form-label">聯絡地址</label>
                <div class="col-sm-10">
                    <div class="form-row">
                        <div class="form-group col-md-2 form-inline">
                            <select class="form-control" v-model="account_info.city">
                                <option v-for="city in citys" :key="city.name" >{{ city.name }}</option>
                            </select>
                        </div>
                        <div class="form-group col-md-2 form-inline">
                            <select class="form-control" v-model="account_info.region">
                                <option v-for="region in regions" :key="region.name">{{ region.name }}</option>
                            </select>
                        </div>
                    </div>
                    <input type="text" class="form-control" id="address"
                        v-model="account_info.address"
                    >
                </div>
            </div>
            <button @click.prevent="HandleSaveAccountInfo" class="btn btn-primary">確定修改</button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            citys: [],
            regions: [],
            selected_city: "",
            account_info: {},
        }
    },

    mounted(){
        this.$http
            .post('/api/accounts/getAccountInfoByAccount', { 
                data: {
                    account: this.account 
                }
            })
            .then(res => {
                this.account_info = res.data[0]
            })
            .catch(e => { console.log(e) })

        this.$http
            .post('/api/location/getCityList')
            .then(res => {
                this.citys = res.data
            })
            .catch(e => { console.log(e) })
    },

    methods: {
        HandleSaveAccountInfo() {
            console.log(this.account_info.sex)
            this.$http
                .post('/api/accounts/saveAccountInfo', { 
                    data: {
                        ... this.account_info,
                        account: this.account
                    }
                })
                .then(res => {
                    alert("儲存成功")
                    location.reload()
                })
                .catch(e => { 
                    alert("儲存失敗")
                    console.log(e) 
                })
        },
        GetRegionList(){
            this.$http
                .post('/api/location/getRegionList', { 
                    data: {
                        city: this.selected_city 
                    }
                })
                .then(res => {
                    this.regions = res.data
                })
                .catch(e => { console.log(e) })
        }
    },

    watch: {
        'account_info.city': {
            handler(){
                this.GetRegionList()
            },
        }
    }
}
</script>

<style>

</style>