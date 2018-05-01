 <template>
  <div id="app">
    <div>
      <navBar></navBar>
      <div class="bothContainer">
        <leftNavBar></leftNavBar>
        <div class="mainContainer"><router-view/></div>
      </div>
    </div>
  </div>
</template>

<script>
  import navBar from './components/navBar';
  import leftNavBar from './components/leftNavBar';
  export default {
    name: 'App',
    components: {
      navBar,
      leftNavBar
    }
  };
</script>

<style scoped lang="scss" type="text/scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    .bothContainer {
      margin: 0 20px;
    }
    .mainContainer {
      height: 100%;
    }
  }
</style>
