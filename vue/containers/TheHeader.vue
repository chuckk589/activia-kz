<template>
  <CHeader with-subheader>
    <CToggler in-header class="ml-3 d-lg-none" @click="$store.commit('toggleSidebarMobile')" />
    <CToggler in-header class="ml-3 d-md-down-none" @click="$store.commit('toggleSidebarDesktop')" />
    <CHeaderBrand class="mx-auto d-lg-none" src="img/brand/coreui-vue-pro-logo.svg" width="190" height="46"
      alt="CoreUI Logo" />
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/users">
          Home
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/locales">
          Locales
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/prizes">
          Prizes
        </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav>
      <CHeaderNavItem class="px-3">
        <CButton shape="square" @click="logout" size="sm" color="primary">
          Logout
        </CButton>
      </CHeaderNavItem>
    </CHeaderNav>

    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0" />
    </CSubheader>
  </CHeader>
</template>

<script>

export default {
  name: 'TheHeader',
  methods: {
    logout() {
      localStorage.removeItem('jwt')
      this.$router.push('/login')
    }
  }
}
</script>
