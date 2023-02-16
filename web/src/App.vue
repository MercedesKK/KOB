<template>
  <div>
    Hello: {{ name }}
  </div>
  <router-view />
</template>

<script>
import { ref } from 'vue';
import $ from 'jquery';

export default {
  name: "App",
  setup() {
    let name = ref("");

    $.ajax({
      url: "http://127.0.0.1:3000/pk/getInfo",
      type: "GET",
      success(resp) {
        console.log(resp);
        name.value = resp.name;
      }
    })

    return {
      name,
    };
  }
}
</script>

<style>

</style>
