<template>
    <div>
        <CCard>
            <CCardBody class="pb-5">
                <h4 style="color: #8c5c7d">
                    <CIcon name="cil-home" size="lg" />首頁
                </h4>
                <hr class="mt-0 mb-2" />
                <div class="container mt-5 mb-5">
                    <!-- <router-link to="search/">click me</router-link> -->
                    <form @submit="submitSearch">
                        <div class="form-inline justify-content-center mt-5">
                            <input v-model="searchStr" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </div>
                    </form>
                </div>
                <router-view></router-view>
            </CCardBody>
        </CCard>
    </div>
</template>


<script>
export default {
    inject: ["reload"],

    data() {
        return {
            searchStr: ""
        };
    },

    created() {},

    methods: {
        submitSearch(event) {
            event.preventDefault()

            this.$router.push('search/' + this.searchStr)
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
