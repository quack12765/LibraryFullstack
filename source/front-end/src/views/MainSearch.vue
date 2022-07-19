<template>
  <div class="container">
    <div class="row">
        <div v-for="book in Books" :key="book.ISBN" class="col-4 pt-3">
            <book-card :isbn="book.ISBN" />
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
    }
    
}
</script>

<style>

</style>