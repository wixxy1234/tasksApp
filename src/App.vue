<script lang="ts">
import { NConfigProvider, NDialogProvider  } from 'naive-ui'
import { defineComponent } from 'vue';
import Header from './components/header.vue';
import { useRoute } from 'vue-router';


export default defineComponent({
  name: "App",
  components: { NConfigProvider, Header, NDialogProvider },
  setup() {
    const route = useRoute()
    return { route }
  },
  computed: {
    isAuthPage(): boolean {
      return this.route.path === '/login' || this.route.path === '/registration'
    }
  }
})
</script>

<template>
  <n-config-provider>
    <n-dialog-provider>
      <Header v-if="!isAuthPage" />
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

.error-message {
  color: red;
}

.container {
  margin: 0 auto;
  padding: 40px 0;
  width: 80%;
}
</style>
