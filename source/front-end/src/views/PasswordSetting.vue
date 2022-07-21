<template>
    <div class="container">
        <div class="card p-5">
            <h3>修改個人資料</h3>
            <form class="mt-4">
                <div class="form-group row">
                    <label for="old_password" class="col-sm-2 col-form-label">舊密碼</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="old_password"
                                v-model="in_oldPassword"
                        >
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password" class="col-sm-2 col-form-label">新密碼</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="password"
                                v-model="in_Password"
                        >
                    </div>
                </div>
                <div class="form-group row">
                    <label for="confirm_password" class="col-sm-2 col-form-label">確認新密碼</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="confirm_password"
                                v-model="in_confirmPassword"
                        >
                    </div>
                </div>
                <button @click.prevent="HandleModifyPassword" class="btn btn-primary mt-3">確定修改</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            in_oldPassword: "",
            in_Password: "",
            in_confirmPassword: ""
        }
    },

    methods: {
        HandleModifyPassword() {
            if ( this.in_Password !== this.in_confirmPassword ) {
                alert("密碼不一致!");

                return ;
            }

            this.$http
                .post('/api/accounts/update_password_by_old_password', { 
                    data: {
                        oldPassword: this.in_oldPassword,
                        password: this.in_Password,
                        account: this.account,
                    } 
                })
                .then(res => {
                    alert(res.data.affectedRows === 0 ? "修改失敗!" : "修改成功!")
                    location.reload()
                })
                .catch(e => {
                    alert("修改失敗!") 
                    console.log(e) 
                })
        }
    }
}
</script>

<style>

</style>