<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router'

export default {
  name: 'App',
  components: {
    // Khai báo các component sử dụng trong ứng dụng
  },
  router // Sử dụng router trong ứng dụng
}
</script>

<style>
  body {
    background-color: gray;
    margin-right: 10px;
  }
  .note-text {
    position: absolute;
    top: 110px;
    left: 20px;
    font-size: 16px;
  }
  body {
    min-width: 800px;
    min-height: 600px;
  }
  h1 {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    border-left: 0px solid black;
    border-right: 0px solid black;
  }
</style>

