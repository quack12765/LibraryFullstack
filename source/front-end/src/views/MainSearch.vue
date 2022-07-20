<template>
  <div class="container">
    <div class="row justify-content-around">
        <div v-for="book in Books" :key="book.ISBN" class="col-4 pt-3">
            <book-card :isbn="book.ISBN" />
        </div>
        <div v-if="Books[0] === undefined" class="mt-5">
            <p class="display-4 text-center">尚無搜尋結果</p>
        </div>
    </div>
  </div>
</template>

<script>
import BookCard from '../components/cards/BookCard.vue';

export default {
    inject: ["reload"],

    data() {
        return {
            Books: [],
        };
    },

    mounted() {
        this.$http
            .post('/api/searchBook/searchBooksByName', { data: this.$route.params.name })
            .then(res => {
                this.Books = res.data
                console.log(res.data)
            })
            .catch(e => { console.log(e) })
    },

    components: {
        BookCard
    },

    watch: {
        '$route.params.name': {
            handler() {
                location.reload()
            }
        }
    }
    
}
</script>

<style>

</style>