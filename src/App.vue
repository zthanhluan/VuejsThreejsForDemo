<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router'
import LegendaryCursor from "legendary-cursor";

export default {
  name: 'App',
  components: {
    // Khai báo các component sử dụng trong ứng dụng
  },
  router, // Sử dụng router trong ứng dụng
  mounted() {
    window.addEventListener("load", () => {
      LegendaryCursor.init();
    });
  }
}
</script>

<style>
  html, body {
    margin: 0;
    height: 100%;
  }
  .note-text {
    position: absolute;
    top: 110px;
    left: 20px;
    font-size: 16px;
  }
  h1 {
    position: absolute;
    top: 0px;
    left: 20px;
  }
  .nav-buttons {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 70px;
  }

  .nav-button {
    background-color: #ccc;
    border: 1px solid black;
    color: #333;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    font-size: 12px;
    cursor: pointer;
    flex-grow: 1;
    margin: 0 0px;
  }


  .active {
    background-color: #f00;
    color: #fff;
  }
  .x-axis-label {
    position: absolute;
    top: 10px;
    right: 20px;
    color: #ff0000;
    font-size: 16px;
  }
  .y-axis-label {
    position: absolute;
    top: 30px;
    right: 20px;
    color: #00ff00;
    font-size: 16px;
  }
  .z-axis-label {
    position: absolute;
    top: 50px;
    right: 20px;
    color: #0000ff;
    font-size: 16px;
  }
  .x-axis-label, .y-axis-label, .z-axis-label {
    z-index: 1000;
  }
  .x-color-box {
    top: 12px;
    right: 60px;
    width: 30px;
    height: 12px;
    background-color: red;
    display: inline-block;
    position: absolute;
    margin-right: 10px;
  }
  .y-color-box {
    top: 32px;
    right: 60px;
    width: 30px;
    height: 12px;
    background-color: green;
    display: inline-block;
    position: absolute;
    margin-right: 10px;
  }
  .z-color-box {
    top: 52px;
    right: 60px;
    width: 30px;
    height: 12px;
    background-color: blue;
    display: inline-block;
    position: absolute;
    margin-right: 10px;
  }
</style>

