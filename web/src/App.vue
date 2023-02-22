<template>
  <NavBar />
  <router-view />
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import NavBar from './components/NavBar.vue';
// import $ from 'jquery';

export default {
  name: "App",

  // 是当前页面要用的组件
  components: {
    NavBar,
  },


  // 是当前template中要用的函数和变量
  // 记得return出去
  setup() {
  }
}
</script>

<style>
body {
  background-image: url("../src/assets/images/background.png");
  background-size: cover;
}
</style>
