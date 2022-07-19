<template>
    <div class="container">
        <h3>修改個人資料</h3>
        <form class="mt-4">
            <div class="form-group row">
                <label for="email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="email">
                </div>
            </div>
            <div class="form-group row">
                <label for="name" class="col-sm-2 col-form-label">姓名</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="name">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">性別</label>
                <div class="col-sm-10">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="RadioMale" value="male" name="sex" checked>
                        <label class="form-check-label" for="RadioMale">Male</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="RadioFeMale" value="female" name="sex">
                        <label class="form-check-label" for="RadioFeMale">Female</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="RadioOther" value="other" name="sex">
                        <label class="form-check-label" for="RadioOther">Other</label>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="phone" class="col-sm-2 col-form-label">行動電話</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="phone">
                </div>
            </div>
            <div class="form-group row">
                <label for="address" class="col-sm-2 col-form-label">聯絡地址</label>
                <div class="col-sm-10">
                    <div class="form-row">
                        <div class="form-group col-md-2 form-inline">
                            <select class="form-control">
                                <option v-for="city in citys" :key="city">{{ city }}</option>
                            </select>
                        </div>
                        <div class="form-group col-md-2 form-inline">
                            <select class="form-control">
                                <option selected>潭子區</option>
                                <option>...</option>
                            </select>
                        </div>
                    </div>
                    <input type="text" class="form-control" id="address">
                </div>
            </div>
            <button type="submit" class="btn btn-primary">確定修改</button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            citys: [
                "台北市","基隆市","宜蘭縣","新北市","連江縣","新竹市","新竹縣","桃園市","苗栗縣","台中市","南投縣",
                "彰化縣","嘉義市","嘉義縣","雲林縣","台南市","澎湖縣","金門縣","高雄市","台東縣","屏東縣","花蓮縣",
            ],
        }
    },

}
</script>

<style>

</style>