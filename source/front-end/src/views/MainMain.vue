<template>
    <div class="container">
        <h1 class="w-100 mt-5 text-center">精選書籍</h1>
        <div class="row mt-5">
            <div class="col-10 col-lg-4" v-for="bookISBN in PopularBooks" :key="bookISBN">
                <book-card :isbn="bookISBN" class="h-100" />
            </div>
        </div>
        <div class="container">
            <h1 class="w-100 mt-5 text-center">系統公告</h1>
            <div class="list-group mt-5">
                <a v-for="(an, index) in announcements" :key="index" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1 text-danger">{{ an.title }}</h5>
                        <small>{{ an.date }} days ago</small>
                    </div>
                    <p class="mb-1 mt-2">{{ an.intro }}</p>
                </a>
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
            PopularBooks : [
                "9789865251024", "9789869422642", "9789571378527"
            ],
            announcements: [
                {
                    title: "龍井山頂分館",
                    intro: "因進行公廁改善工程,於111/6/14 ~ 111/9/14 男(女)廁所、哺集乳室以及飲水機暫停使用。",
                    date: 1             // will change to date 
                },
                {
                    title: "沙鹿深波分館",
                    intro: "因進⾏閱讀環境改善⼯程,111/5/1至112/4/30暫停在架預約服務,預約取書等服務請至文昌分館。",
                    date: 2
                },
                {
                    title: "大里德芳分館",
                    intro: "因進行室内裝修改善暨冷氣空調相關設備更新工程前置作業, 111年1⽉7⽇⾄111年8⽉5⽇暫停在架預約服務。",
                    date: 2
                },
                {
                    title: "東區公所圖書室",
                    intro: "因配合東區區公所辦公廳舍耐震補強工程暨防疫需求，即日起至疫情趨緩暫停在架預約服務。",
                    date: 3
                },
            ]
        };
    },

    created() {},

    methods: {},

    components: {
        BookCard
    }
};
</script>

<style>

</style>