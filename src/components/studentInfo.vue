<template>
  <div class="studentInfo">
    <el-table :data="studentInfoData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
      <el-table-column prop="stu_id" label="id" width="50"></el-table-column>
      <el-table-column prop="stu_name" label="姓名" width="85"></el-table-column>
      <el-table-column prop="stu_num" label="学号" width="120"></el-table-column>
      <el-table-column prop="stu_school" label="学校" width="150"></el-table-column>
      <el-table-column prop="stu_grade" label="年级" width="50"></el-table-column>
      <el-table-column prop="stu_sex" label="性别" width="50"></el-table-column>
      <el-table-column prop="stu_email" label="邮箱" width="100"></el-table-column>
      <el-table-column label="头像" width="90">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="100%"
            trigger="hover">
            <img :src="scope.row.stu_avatar" :alt="scope.row.stu_name">
            <a href="#" slot="reference"><img class="imgStyle" :src="scope.row.stu_avatar" :alt="scope.row.stu_name"></a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="stu_desc" label="自我介绍">
        <template slot-scope="scope">
          <a href="#" class="summary" @click="dialogDescVisible=true">
            {{scope.row.stu_desc}}
          </a>
          <el-dialog title="自我介绍" :visible.sync="dialogDescVisible">
            {{scope.row.stu_desc}}
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="170">
        <template slot-scope="scope">
          <el-tag :type="scope.row.tagType">{{scope.row.stu_status}}</el-tag>
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
        :total="studentInfoData.length">
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
        studentInfoData: [{
          stu_id: '1',
          stu_name: '张三dan',
          stu_num: '201421314305',
          stu_school: '仲恺农业工程学院',
          stu_grade: '大二',
          stu_sex: '女',
          stu_email: '1124203375@qq.com',
          stu_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          stu_avatar: './static/img/15.jpg',
          stu_status: '未审核',
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
            message: '《' + row.stu_name + '》作品审核通过'
          });
          row.stu_status = '通过';
          row.tagType = 'success';
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '《' + row.stu_name + '》作品审核不通过'
          });
          row.stu_status = '不通过';
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

  .imgStyle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .pageBlock {
    text-align: right;
    margin: 20px 0 50px;
  }
</style>
