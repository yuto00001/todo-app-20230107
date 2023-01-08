<template>
  <div id="app">
    <nav>
      <router-link to="/myPage">myPage(ログインしたら飛ぶページ)</router-link> <br/>
      <router-link to="/">Home</router-link> |
      <router-link to="/signIn">signIn</router-link> |
      <router-link to="/login">login</router-link> |
      <router-link to="/HomeView">HomeView</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.signInAndloginArea {
    height: 25vh;
    border: 1px solid;
    margin: 5% 30%;
    padding: 5% 0;
  }
</style>

<script>
  import firebase from 'firebase/app'

  new Vue({
  data() {},
  component: {},
  methods: {},
  created() {}
})
</script>
