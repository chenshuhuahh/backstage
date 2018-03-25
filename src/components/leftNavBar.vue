<template>
  <div class="leftNavBar">
    <ul class="menu-ul">
      <router-link class="menu-link" to="/studentInfo" tag="li">
        <i class="icon-reddit"></i>
        <span>Student Info</span>
      </router-link>
      <router-link class="menu-link" to="/companyInfo" tag="li">
        <i class="icon-hipster"></i>
        <span>Company Info</span>
      </router-link>
      <router-link class="menu-link" to="/workInfo" tag="li">
        <i class="icon-quill"></i>
        <span>Works Info</span>
      </router-link>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {};
    }
  };
</script>

<style lang="scss" type="text/scss">
  .leftNavBar {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: auto;
    margin-bottom: 20px;
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    .menu-ul {
      display: block;
      padding: 0;
      margin: 0;
      .menu-link {
        display: block;
        padding: 0 0 0 25px;
        list-style-type: none;
        height: 60px;
        cursor: pointer;
        line-height: 60px;
        transition: all .4s;
        &.router-link-exact-active {
          font-weight: bold;
          color: #353535;
          background: #DCF9F5;
        }
        i {
          vertical-align: text-top;
          font-size: 16px;
        }
      }
    }
  }
</style>
