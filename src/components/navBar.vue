<template>
  <div class="navBar">
    <div class="logo"></div>
    <div class="operation">
      <i class="icon-user"></i>
      <span>您好</span>
      <span class="logoff" @click="logoffAdmin">注销</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {};
    },
    methods: {
      logoffAdmin() {
        this.$confirm('是否确认退出后台管理系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已成功退出!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
      }
    }
  };
</script>

<style scoped lang="scss" type="text/scss">
  .navBar {
    height: 55px;
    background-color: rgba(66, 185, 131, 0.6);
    -webkit-box-shadow: 0 7px 47px -10px rgba(66, 185, 131, 0.5);
    -moz-box-shadow: 0 7px 47px -10px rgba(66, 185, 131, 0.5);
    box-shadow: 0 7px 47px -10px rgba(66, 185, 131, 0.5);
    padding: 0 20px 0 10px;
    margin-bottom: 20px;
    .logo {
      float: left;
      width: 200px;
      height: 100%;
      background-image: url("logo1.png");
      background-repeat: no-repeat;
      background-position: center;
    }
    .operation {
      margin-top: 20px;
      float: right;
      color: #fff;
      .logoff {
        margin-left: 10px;
        cursor: pointer;
        border-bottom: 2px solid #fff;
        &:hover {
          color: #000;
          border-bottom: 2px solid #000;
        }
      }
    }
  }
  @media (min-width: 768px) {
    .navBar {
      .operation {
        margin-top: 17px;
      }
    }
  }
</style>
