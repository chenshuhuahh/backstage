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
    text-align: center;
    margin-bottom: 20px;
    .menu-ul {
      display: block;
      padding: 0;
      margin: 0;
      .menu-link {
        display: inline-block;
        border: 1px solid #f1f1f1;
        border-radius: 5px;
        padding: 0 25px;
        list-style-type: none;
        cursor: pointer;
        line-height: 50px;
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
