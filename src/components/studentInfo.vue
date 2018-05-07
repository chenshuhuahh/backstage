<template>
  <div class="studentInfo">
    <div class="tagList">
      <span class="tagLi" @click="selectTag('0')"><el-tag type="info" size="medium">未审核</el-tag></span>
      <span class="tagLi" @click="selectTag('1')"><el-tag type="success" size="medium">审核通过</el-tag></span>
      <span class="tagLi" @click="selectTag('-1')"><el-tag type="danger" size="medium">审核不通过</el-tag></span>
      <el-input
        placeholder="请输入搜索内容"
        suffix-icon="el-icon-search"
        v-model="searchWork"
        @keyup.enter.native="handleSearch">
      </el-input>
    </div>
    <el-table :data="studentInfoData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
      <el-table-column prop="stu_id" label="id" width="50"></el-table-column>
      <el-table-column prop="stu_name" label="姓名" width="85"></el-table-column>
      <el-table-column prop="stu_num" label="学号" width="120"></el-table-column>
      <el-table-column prop="stu_school" label="学校" width="150"></el-table-column>
      <el-table-column prop="stu_grade" label="入学年份" width="60"></el-table-column>
      <el-table-column label="学生证照" width="90">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="100%"
            trigger="hover">
            <img class="expandImg" :src="scope.row.stu_card" :alt="scope.row.stu_name">
            <a href="#" slot="reference"><img class="imgCardStyle" :src="scope.row.stu_card" :alt="scope.row.stu_name"></a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="stu_sex" label="性别" width="50"></el-table-column>
      <el-table-column prop="stu_email" label="邮箱" width="180"></el-table-column>
      <el-table-column label="头像" width="90">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="100%"
            trigger="hover">
            <img class="expandImg" :src="scope.row.stu_avatar" :alt="scope.row.stu_name">
            <a href="#" slot="reference"><img class="imgStyle" :src="scope.row.stu_avatar" :alt="scope.row.stu_name"></a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="stu_desc" label="自我介绍">
        <template slot-scope="scope">
          <a href="#" class="summary" @click="dialogShow(scope.row)">
            {{scope.row.stu_desc}}
          </a>
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
      <el-table-column prop="stu_time" label="注册时间" width="95"></el-table-column>
    </el-table>
    <el-dialog title="自我介绍" :visible.sync="dialogDescVisible">
      {{dialogShowObj.stu_desc}}
    </el-dialog>
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
        searchWork: '',
        currentPage: 1,
        pageSize: 5,
        dialogShowObj: {},
        dialogDescVisible: false,
        studentInfoData: []
      };
    },
    methods: {
      handlePass(index, row) {
        console.log(index, row);
        this.$confirm('该学生身份是否审核通过?', '提示', {
          confirmButtonText: '通过',
          cancelButtonText: '不通过',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append('action', 'setStudentStatus');
          params.append('stuId', row.stu_id);
          params.append('stuStatus', '1');
          this.$ajax.post('/api/backstageBox.php', params)
            .then((res) => {
              console.log('setStudentStatus:', res);
              if (res.data === 1) {
                this.$message({
                  type: 'success',
                  message: '学生[ ' + row.stu_name + ' ]身份审核通过'
                });
                row.stu_status = '通过';
                row.tagType = 'success';
              } else {
                this.$message('该学生身份已经审核通过');
              }
            });
        }).catch(() => {
          let params = new URLSearchParams();
          params.append('action', 'setStudentStatus');
          params.append('stuId', row.stu_id);
          params.append('stuStatus', '-1');
          this.$ajax.post('/api/backstageBox.php', params)
            .then((res) => {
              console.log('setStudentStatus:', res);
              if (res.data === 1) {
                this.$message({
                  type: 'warning',
                  message: '学生[ ' + row.stu_name + ' ]身份审核不通过'
                });
                row.com_status = '不通过';
                row.tagType = 'danger';
              } else {
                this.$message('该学生身份已审核不通过');
              }
            });
        });
      },
      handleCurrentChange(currentPage) {
        console.log(`当前页: ${currentPage}`);
        this.currentPage = currentPage;
      },
      dialogShow(row) {
        // 记录数据
        this.dialogShowObj = row;
        // 显示弹窗
        this.dialogDescVisible = true;
      },
      selectTag(type) {
        let params = new URLSearchParams();
        params.append('action', 'selectStudentTag');
        params.append('status', type);
        this.$ajax.post('/api/backstageBox.php', params)
          .then((res) => {
            console.log('selectTag res:', res);
            if (res.data !== 0) {
              this.studentInfoData = res.data;
            } else {
              this.studentInfoData = [];
            }
          });
      },
      handleSearch() {
        this.studentInfoData = [];
        if (this.searchWork) {
          // 做搜索的时候，是对当前这个分块后的部分进行搜索，得到的结果更新数组
          let params = new URLSearchParams();
          params.append('action', 'searchStudent');
          params.append('searchContent', this.searchWork);
          this.$ajax.post('/api/backstageBox.php', params)
            .then((res) => {
              console.log('searchStudent', res.data);
              if (res.data === 0) {
                this.studentInfoData = [];
              } else {
                this.studentInfoData = res.data;
              }
            });
        } else {
          this.$message('请输入搜索内容');
          return false;
        }
      }
    },
    mounted() {
      let params = new URLSearchParams();
      params.append('action', 'allStudentInfo');
      this.$ajax.post('/api/backstageBox.php', params)
        .then((res) => {
          console.log('allStudentInfo res:', res);
          if (res.data !== 0) {
            this.studentInfoData = res.data;
          } else {
            this.studentInfoData = [];
          }
        });
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
  .el-input {
    display: inline-block;
    margin-left: 20px;
    width: 300px;
  }
  .tagList {
    margin-bottom: 10px;
    .tagLi {
      cursor: pointer;
    }
  }
  .expandImg {
    max-height: 400px;
  }

  .imgStyle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .imgCardStyle {
    width: 70px;
    height: auto;
    max-height: 100%;
  }
  .pageBlock {
    text-align: right;
    margin: 20px 0 50px;
  }
</style>
