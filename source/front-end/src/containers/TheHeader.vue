<template>
    <CHeader fixed with-subheader light>
        <CToggler
            in-header
            class="ml-1 d-lg-none"
            v-c-emit-root-event:toggle-sidebar-mobile
        />
        <CToggler
            in-header
            class="ml-1 d-md-down-none"
            v-c-emit-root-event:toggle-sidebar
        />
        <CHeaderBrand
            class="mx-auto d-lg-none"
            src="img/brand/logo-black.png"
            width="200"
            height="38"
            alt="CoreUI Logo"
        />
        <CHeaderNav class="d-md-down-none mr-auto"> </CHeaderNav>
        <CHeaderNav class="mr-1">
            <!-- <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-bell"/>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-list"/>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-envelope-open"/>
        </CHeaderNavLink>
      </CHeaderNavItem> -->
            <TheHeaderDropdownAccnt />
        </CHeaderNav>
        <CSubheader class="px-0">
            <CBreadcrumbRouter class="border-0 mb-0" />
        </CSubheader>
    </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";

export default {
    name: "TheHeader",
    components: {
        TheHeaderDropdownAccnt,
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {},
};
</script>

<style>
.blink_me {
    animation: blinker 3s linear infinite;
}

@keyframes blinker {
    50% {
        opacity: 0.4;
    }
}
</style>
