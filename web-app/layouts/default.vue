<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>

      <a-menu theme="dark" mode="horizontal" @click="menuClick" :default-selected-keys="[selector]"
        
        :style="{ lineHeight: '64px' }">

        <a-menu-item key="/">
          Dashboard
        </a-menu-item>
        <a-menu-item key="/prod">
          Production
        </a-menu-item>
        <a-menu-item key="/qc">
          Quality Control
        </a-menu-item>

      </a-menu>
    </a-layout-header>
    <nuxt v-if="!$slots.default" />
   
    <a-layout-footer class="text-center	">
      MES ©2025 Created by Andy
    </a-layout-footer>
  </a-layout>
</template>
<script>
export default {
  methods: {
    menuClick(event) {
      const { key } = event
      //this.selector = key
      this.$router.push(key)
    }
  },
  mounted(){
    if(this.$route.path  && this.$route.path[0] === '/'){
      this.selector = '/'+this.$route.path.split('/')[1]

    }
  },
  data(){
    return {
      selector:this.$route.path
    }
  }
}
</script>
<style>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>