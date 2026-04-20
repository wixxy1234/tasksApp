<script lang="ts">
import { NConfigProvider, NDialogProvider  } from 'naive-ui'
import { defineComponent } from 'vue';
import Header from './components/header.vue';


export default defineComponent({
  name: "App",
  components: { NConfigProvider, Header, NDialogProvider }
})
</script>

<template>
  <n-config-provider>
    <n-dialog-provider>
      <Header />
      <div class="container">

        <router-view></router-view>
      </div>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  margin: 0 auto;
  padding: 40px 0;
  width: 80%;
}
</style>
