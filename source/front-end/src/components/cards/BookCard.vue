<template>
    <div>
        <div class="card pt-4 h-100 text-center justify-content-around">
            <router-link :to=" 'book/' + book.ISBN ">
                <img :src="book.show_img_url" class="w-100">
            </router-link>
            <div class="card-body">
                <h3 class="card-title">{{ book.name }}</h3>
                <p class="card-text">{{ book.summary }}</p>
                <button class="btn btn-primary">borrow</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "book-card",

    data() {
        return {
            book : {}
        }
    },

    props: ["isbn"],

    mounted(){
        this.$http
            .post('/api/searchBook/getBookInfoByISBN', { data: this.isbn })
            .then(res => {
                this.book = res.data[0]
            })
            .catch(e => { console.log(e) })
    }
}
</script>

<style>

</style>