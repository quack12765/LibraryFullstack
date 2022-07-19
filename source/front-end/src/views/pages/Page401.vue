<template>
  <CContainer class="d-flex align-items-center min-vh-100">
    <CRow class="w-100 justify-content-center">
      <CCol md="7">
        <div class="w-100">
        <div class="clearfix">
          <CCard
            text-color="white"
            class="text-center py-4 d-md-down-none"
            style="width:100%; background-image: linear-gradient(-20deg, #616161 0%, #9bc5c3 100%);"
          >
            <CCardBody>
          <h1 class="display-3 mr-2">401</h1>
          <h4 class="pt-3">您無權限進入此頁面</h4>
          <p class="text-muted">請聯絡系統管理員</p>
          <CButton color="info" @click="goBack">回到前頁</CButton>
            </CCardBody>
          </CCard>
        </div>
      </div>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
export default {
  name: 'Page403',
  data() {
    return {

    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
