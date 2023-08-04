<script setup lang="ts">
  import HelloWorld from './components/HelloWorld.vue'
  import axios from 'axios'
  import { encryption } from './encryption.js'
  let encryptionString = encryption({
    userName:"sywbcs@11.com",
    loginPwd:"303421",
  }, 'AABBCCDD')

  axios.post('/api/user/login',encryptionString).then(ret => {
    console.log('请求成功', ret)
  }).catch(err => {
    console.log('请求失败', err)
  })
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
