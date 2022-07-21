<template>
  <CContainer class="min-vh-100 d-flex align-items-center">
    <CRow class="w-100 justify-content-center">
      <CCol md="6" sm="8">
        <CCard class="mx-4 mb-0">
          <CCardBody class="p-4">
            <CForm>
              	<h1>Register</h1>
              	<p class="text-muted">Create your account</p>
              	<CInput
                	placeholder="Username"
                	autocomplete="username"
					v-model="in_registData.account"
              	>
                	<template #prepend-content><CIcon name="cil-user"/></template>
              	</CInput>
              	<CInput
					placeholder="Password"
					type="password"
					autocomplete="new-password"
					v-model="in_registData.password"
              	>
                	<template #prepend-content><CIcon name="cil-lock-locked"/></template>
              	</CInput>
              	<CInput
					placeholder="Repeat password"
					type="password"
					autocomplete="new-password"
					class="mb-4"
					v-model="in_registData.confirmPassword"
				>
					<template #prepend-content><CIcon name="cil-lock-locked"/></template>
				</CInput>
              	<CButton color="success" block @click="HandleRegist">Create Account</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
export default {
    name: 'Register',

	data(){
		return {
			in_registData : {
				account: "",
				password: "",
				confirmPassword: ""
			}
		}
	},

	methods: {
		HandleRegist() {
			if(this.in_registData.password !== this.in_registData.confirmPassword){
				alert("密碼不一致!");
				return ;
			}

			this.$http
				.post('/api/accounts/insert_accounts',{
					data: this.in_registData
				})
				.then(res => {
					console.log(res)

					alert(res.data.affectedRows === 0 ? "註冊失敗!" : "註冊成功!")
                    
					this.$router.push("/")
				})
				.catch(err => { 
					alert("註冊失敗")
					console.log(err.response.data.message) 
				})
		}
	}
}
</script>
