<template>
    <div class="c-app">
        <TheSidebar />
        <div class="c-wrapper">
            <TheHeader />
            <div class="c-body">
                <!-- <div class="container mt-3 mb-3">
                    <form>
                        <div class="form-inline justify-content-center mt-5">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </div>
                    </form>
                </div> -->
                <main class="c-main ">
                    <CContainer fluid>
                        <!-- <transition name="fade"> -->
                        <router-view></router-view>
                        <!-- </transition> -->
                    </CContainer>
                </main>
            </div>
            <!-- <TheFooter/> -->
        </div>
    </div>
</template>

<script>
import TheSidebar from "./TheSidebar";
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";

export default {
    name: "TheContainer",

    components: {
        TheSidebar,
        TheHeader,
        TheFooter,
    },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
