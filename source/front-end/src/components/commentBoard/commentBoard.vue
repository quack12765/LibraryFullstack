<template>
    <div>
        <div class="card  h-100 mt-3">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="vertical-center col pt-2">
                        <h2 class="card-title">user: <mark>{{ commentinfo.comment_account }}</mark></h2>
                    </div>
                    <div class="col" style="font-size:30px; cursor:pointer;">
                        <span 
                            v-for="(isFill, index) in sel_scoreMap" :key="index" 
                            @mouseover="HandleSelectScore(index)"
                            @mouseleave="sel_scoreMap = ori_scoreMap" 
                            @click="ori_scoreMap = sel_scoreMap; commentinfo.score = index + 1; "
                        > 
                            {{ isFill ? '★' : '☆' }} 
                        </span>
                    </div>
                </div>
                <hr>
                <div class="card-text">
                    <div v-if="commentinfo.isMock !== true">
                        {{ commentinfo.comment }} 
                    </div>
                    <div v-else>
                        <form>
                            <textarea v-model="commentinfo.comment" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="輸入評論..."></textarea>
                            <button @click.prevent="HandleSendCommit" class="btn btn-danger mt-3">送出評論</button>
                        </form>
                    </div>
                    <div class="mt-3">
                        <button v-if="commentinfo.isMock !== true" @click="$set(commentinfo, 'isMock', true)" class="btn btn-primary mt-3">修改評論</button>
                        <button v-if="commentinfo.isMock !== true" @click="HandleDeleteComment" class="btn btn-danger mt-3 ml-3">刪除評論</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- text-center justify-content-around -->
</template>


<script>


export default {
    name: "comment-board ",

    data() {
        return {
            maxScore: 5,
            ori_scoreMap: [],
            sel_scoreMap: []
        }
    },

    props: ["commentinfo"],

    mounted(){
        this.ori_scoreMap = this.MapScoreToTFArray(this.maxScore, this.commentinfo.score)
        this.sel_scoreMap = this.ori_scoreMap
    },

    methods: {
        HandleSendCommit: function (e) {

            if(this.commentinfo.score === 0) return ;

            // this component enable to edit, so we should delete the data before sending it.

            // detete
            this.$http
                .post('/api/comment/delCommentByAccount', { 
                    data: {
                        ISBN: this.commentinfo.comment_ISBN,
                        account: this.account,
                    } 
                })
                .then(res => {

                    // add
                    this.$http
                        .post('/api/comment/addCommentByAccount', { 
                            data: {
                                ISBN: this.commentinfo.comment_ISBN,
                                account: this.account,
                                score: this.commentinfo.score,
                                comment: this.commentinfo.comment
                            } 
                        })
                        .then(res => {
                            alert("送出成功")
                            location.reload()
                        })
                        .catch(e => { 
                            alert("送出失敗")
                            console.log(e) 
                        })
                        
                })
                .catch(e => { 
                    alert("替換失敗")
                    console.log(e) 
                })
        },
        

        // call while hover
        HandleSelectScore(index) {
            if( !this.commentinfo.isMock ) return ;

            this.sel_scoreMap = this.MapScoreToTFArray(this.maxScore, index + 1)
        },

        MapScoreToTFArray(max, n) {
            return (new Array(n)).fill(true).concat((new Array(max - n)).fill(false))
        },

        HandleDeleteComment() {
            this.$http
                .post('/api/comment/delCommentByAccount', { 
                    data: {
                        ISBN: this.commentinfo.comment_ISBN,
                        account: this.account,
                    } 
                })
                .then(res => {
                    alert("刪除成功")
                    location.reload()
                })
                .catch(e => { 
                    alert("刪除失敗")
                    console.log(e) 
                })
        }
    },
}
</script>

<style>

</style>