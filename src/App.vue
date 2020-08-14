<template lang="pug">
  v-app#app
    v-navigation-drawer(app)
    v-app-bar(app)#nav
      v-app-bar-nav-icon
      v-toolbar-title LiveScape
      v-btn(to="/") Home
      v-btn(to="/about") About
      v-btn(icon)
        v-icon mdi-help
    v-main
      v-container(fluid)
        router-view
    v-footer(app)
      p Copyright Polytope Solutions 2020
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
