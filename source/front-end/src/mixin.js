import moment from 'moment';

export default {
    data(){
        return {
            account: "",
            branchs: [],
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

        PlusDateByDaysAndParse(date, days){
            return moment(date).add(days, "d").format("yyyy-MM-DD")
        },



        // Book & Copy

        MapCodeToState (s) {
            if(s === 0){
                return '架上'
            }else if (s === 1){
                return '跨行移轉中'
            }else if (s === 2){
                return '待預約者取書'
            }
            return ''
        },

        HandleBorrow(acc, loc) {
            this.$http
                .post('/api/searchBook/borrowCopy', { 
                    data: {
                        accession_number: acc,
                        account: 'user',
                        location: loc
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

        HandleReserve(copyinfo) {
            this.$http
                .post('/api/searchBook/reserveCopy', { 
                    data: {
                        accession_number: copyinfo.accession_number,
                        cur_location: copyinfo.cur_location,
                        to_location: copyinfo.location,
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

        // Get all branchs info
        this.$http
            .post('/api/location/getBranchList')
            .then(res => {
                this.branchs = res.data
            })
            .catch(e => { console.log(e) })
    }
}