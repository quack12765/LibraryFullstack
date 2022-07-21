<template>
    <div id="app">
    	<router-view v-if="isRouterAlive"></router-view>
	</div>
</template>

<script>


export default {
  name: 'App',

  provide () {
    return {
      reload: this.reload
    }
  },

  data() {
    return{
      isRouterAlive: true
    }
  },

  methods: {
    reload () {
      this.isRouterAlive = false;

      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  },
}
</script>

<style lang="scss">
  	// Import Main styles for this application
  	@import 'assets/scss/style';

  	.jumpFrame {
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
	
</style>
