<template>
    <CSidebar fixed :minimize="minimize" :show.sync="show">
        <CSidebarBrand to="/">
            L i b r a r y
        </CSidebarBrand>
        <CRenderFunction flat :content-to-render="nav" />
        <CSidebarMinimizer
            class="d-md-down-none"
            @click.native="minimize = !minimize"
        />
    </CSidebar>
</template>

<script>
import { admin, user, guest } from "./_nav";
export default {
    name: "TheSidebar",
    data() {
        return {
            minimize: false,
            nav: [],
            show: "responsive",
        };
    },
    created() {
        switch (sessionStorage.getItem("ROLE")) {
            case "admin":
                this.nav = admin;
                break;
            case "user":
                this.nav = user;
                break;
            default:
                break;
        }
    },
    mounted() {
        this.$root.$on("toggle-sidebar", () => {
            const sidebarOpened =
                this.show === true || this.show === "responsive";
            this.show = sidebarOpened ? false : "responsive";
        });
        this.$root.$on("toggle-sidebar-mobile", () => {
            const sidebarClosed =
                this.show === "responsive" || this.show === false;
            this.show = sidebarClosed ? true : "responsive";
        });
    },
};
</script>
