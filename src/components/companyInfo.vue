<template>
  <div class="companyInfo">
    <el-table :data="companyInfoData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
      <el-table-column prop="com_id" label="id" width="50"></el-table-column>
      <el-table-column prop="com_name" label="名称" width="85"></el-table-column>
      <el-table-column prop="com_address" label="地址" width="150"></el-table-column>
      <el-table-column prop="com_boss" label="法定人" width="85"></el-table-column>
      <el-table-column prop="com_phone" label="联系电话" width="110"></el-table-column>
      <el-table-column prop="com_email" label="邮箱" width="100"></el-table-column>
      <el-table-column label="营业执照" width="90">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="100%"
            trigger="hover">
            <img :src="scope.row.com_license" :alt="scope.row.com_name">
            <a href="#" slot="reference"><img class="licenseImgStyle" :src="scope.row.com_license" :alt="scope.row.com_name"></a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="90">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="100%"
            trigger="hover">
            <img :src="scope.row.com_avatar" :alt="scope.row.com_name">
            <a href="#" slot="reference"><img class="avatarImgStyle" :src="scope.row.com_avatar" :alt="scope.row.com_name"></a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="com_desc" label="企业介绍">
        <template slot-scope="scope">
          <a href="#" class="summary" @click="dialogDescVisible=true">
            {{scope.row.com_desc}}
          </a>
          <el-dialog title="自我介绍" :visible.sync="dialogDescVisible">
            {{scope.row.com_desc}}
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="170">
        <template slot-scope="scope">
          <el-tag :type="scope.row.tagType">{{scope.row.com_status}}</el-tag>
          <span></span>
          <el-button
            size="mini"
            @click="handlePass(scope.$index, scope.row)">审核操作
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pageBlock">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="companyInfoData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        currentPage: 1,
        pageSize: 5,
        dialogDescVisible: false,
        companyInfoData: [{
          com_id: '1',
          com_name: '张三dan',
          com_address: '上海市普陀区金沙江路 1518',
          com_boss: '仲恺农',
          com_phone: '18814379708',
          com_email: '1124203375@qq.com',
          com_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          com_license: './static/img/6.jpg',
          com_avatar: './static/img/15.jpg',
          com_status: '未审核',
          tagType: 'info'
        }]
      };
    },
    methods: {
      handlePass(index, row) {
        console.log(index, row);
        this.$confirm('本作品是否审核通过?', '提示', {
          confirmButtonText: '通过',
          cancelButtonText: '不通过',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '《' + row.com_name + '》作品审核通过'
          });
          row.com_status = '通过';
          row.tagType = 'success';
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '《' + row.com_name + '》作品审核不通过'
          });
          row.com_status = '不通过';
          row.tagType = 'danger';
        });
      },
      handleCurrentChange(currentPage) {
        console.log(`当前页: ${currentPage}`);
        this.currentPage = currentPage;
      }
    }
  };
</script>

<style scoped lang="scss" type="text/scss">
  .summary {
    // 多行文本溢出
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-decoration: underline;
  }

  .avatarImgStyle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .licenseImgStyle {
    width: 70px;
    height: auto;
    max-height: 100%;
  }
  .pageBlock {
    text-align: right;
    margin: 20px 0 50px;
  }
</style>
