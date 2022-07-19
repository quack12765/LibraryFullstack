import moment from 'moment';

export default {
    data(){
        return {
            account: ""
        }
    },

    methods: {

        // moment

        ParseDate(str){
            let date = moment(str)
            return date.format("yyyy-MM-DD")
        },

        GetRemainDays(str, deadline){
            let date = moment(str)
            return Math.floor(deadline + moment.duration(date.diff(moment())).asDays())
        },



        // Book & Copy

        HandleBorrow(acc) {
            this.$http
                .post('/api/searchBook/borrowCopy', { 
                    data: {
                        accession_number: acc,
                        account: sessionStorage.getItem("ACCOUNT")
                    } 
                })
                .then(res => {
                    alert("借閱成功!")
                    location.reload()
                })
                .catch(e => { 
                    alert("借閱失敗")
                    console.log(e) 
                })
        },

        HandleReserve(acc) {
            this.$http
                .post('/api/searchBook/reserveCopy', { 
                    data: {
                        accession_number: acc,
                        account: sessionStorage.getItem("ACCOUNT")
                    } 
                })
                .then(res => {
                    alert("預約成功!")
                    location.reload()
                })
                .catch(e => { 
                    alert("預約失敗")
                    console.log(e) 
                })
        },
        HandleCancelReserve(acc) {
            this.$http
                .post('/api/searchBook/cancelReserveCopy', { 
                    data: {
                        accession_number: acc,
                        account: sessionStorage.getItem("ACCOUNT")
                    } 
                })
                .then(res => {
                    alert("取消成功!")
                    location.reload()
                })
                .catch(e => { 
                    alert("取消失敗")
                    console.log(e) 
                })
        },

        // !!! NOTICE !!!  
        getCopyReservationByAccession(acc){
            this.$http
                .post('/api/searchBook/getCopyReservationByAccession', { data: acc })
                .then(res => {
                    console.log(res.data.length)
                })
                .catch(e => { console.log(e) })
        },
    },

    mounted() {
        this.account = sessionStorage.getItem("ACCOUNT") 
    }
}