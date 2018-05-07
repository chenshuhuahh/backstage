<template>
  <div class="workInfo">
    <div class="tagList">
      <span class="tagLi" @click="selectTag('0')"><el-tag type="info" size="medium">未审核</el-tag></span>
      <span class="tagLi" @click="selectTag('1')"><el-tag type="success" size="medium">审核通过</el-tag></span>
      <span class="tagLi" @click="selectTag('-1')"><el-tag type="danger" size="medium">审核不通过</el-tag></span>
      <span class="tagLi" @click="selectCat('1')"><el-tag size="medium">摄影</el-tag></span>
      <span class="tagLi" @click="selectCat('2')"><el-tag type="warning" size="medium">设计</el-tag></span>
      <span class="tagLi" @click="selectCat('3')"><el-tag size="medium">文章</el-tag></span>
      <span class="tagLi" @click="selectCat('4')"><el-tag type="warning" size="medium">程序</el-tag></span>
      <el-input
        placeholder="请输入搜索内容"
        suffix-icon="el-icon-search"
        v-model="searchWork"
        @keyup.enter.native="handleSearch">
      </el-input>
    </div>
    <el-table :data="worksList.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
      <el-table-column prop="work_id" label="id" width="50"></el-table-column>
      <el-table-column prop="cat_name" label="分类" width="50"></el-table-column>
      <el-table-column prop="stu_name" label="学生" width="100"></el-table-column>
      <el-table-column prop="work_name" label="作品名称" width="180"></el-table-column>
      <el-table-column label="简介&描述" width="270">
        <template slot-scope="scope">
          <a href="#" class="summary" @click="dialogShow(scope.row)">
            {{scope.row.work_summary}}
          </a>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <span v-for="(imgUrl,index) in scope.row.work_photo.split(',')" :key="index">
            <el-popover
              placement="right"
              width="100%"
              trigger="hover">
                <img class="expandImg" :src="imgUrl" :alt="imgUrl">
                <a href="#" slot="reference"><img class="imgStyle" :src="imgUrl" :alt="imgUrl"></a>
             </el-popover>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="170">
        <template slot-scope="scope">
          <el-tag :type="scope.row.tagType">{{scope.row.work_status}}</el-tag>
          <span></span>
          <el-button
            size="mini"
            @click="handlePass(scope.$index, scope.row)">审核操作
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="work_time" label="上传时间" width="95"></el-table-column>
    </el-table>
    <el-dialog title="作品简介&描述" :visible.sync="dialogDescVisible">
      {{dialogShowObj.work_summary}}<br/><br/>
      <div class="ql-container ql-snow">
        <div class="ql-editor" v-html="dialogShowObj.work_desc">
        </div>
      </div>
    </el-dialog>
    <div class="pageBlock">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="worksList.length">
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
        pageSize: 10,
        dialogShowObj: {},
        dialogDescVisible: false,
        worksList: []
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
          let params = new URLSearchParams();
          params.append('action', 'setWorkStatus');
          params.append('workId', row.work_id);
          params.append('workStatus', '1');
          this.$ajax.post('/api/backstageBox.php', params)
            .then((res) => {
              console.log('setWorkStatus:', res);
              if (res.data === 1) {
                this.$message({
                  type: 'success',
                  message: '《' + row.work_name + '》作品审核通过'
                });
                row.work_status = '通过';
                row.tagType = 'success';
              } else {
                this.$message('该作品已经审核通过');
              }
            });
        }).catch(() => {
          let params = new URLSearchParams();
          params.append('action', 'setWorkStatus');
          params.append('workId', row.work_id);
          params.append('workStatus', '-1');
          this.$ajax.post('/api/backstageBox.php', params)
            .then((res) => {
              console.log('setWorkStatus:', res);
              if (res.data === 1) {
                this.$message({
                  type: 'warning',
                  message: '《' + row.work_name + '》作品审核不通过'
                });
                row.work_status = '不通过';
                row.tagType = 'danger';
              } else {
                this.$message('该作品已审核不通过');
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
        params.append('action', 'selectWorkTag');
        params.append('status', type);
        this.$ajax.post('/api/backstageBox.php', params)
          .then((res) => {
            console.log('selectTag res:', res);
            if (res.data !== 0) {
              this.worksList = res.data;
            } else {
              this.worksList = [];
            }
          });
      },
      selectCat(catId) {
        let params = new URLSearchParams();
        params.append('action', 'selectWorkCat');
        params.append('cat_id', catId);
        this.$ajax.post('/api/backstageBox.php', params)
          .then((res) => {
            console.log('selectWorkCat res:', res);
            if (res.data !== 0) {
              this.worksList = res.data;
            } else {
              this.worksList = [];
            }
          });
      },
      handleSearch() {
        this.worksList = [];
        if (this.searchWork) {
          // 做搜索的时候，是对当前这个分块后的部分进行搜索，得到的结果更新photoIntroduction数组
          console.log(this.searchWork);
          let params = new URLSearchParams();
          params.append('action', 'searchWorks');
          params.append('searchContent', this.searchWork);
          this.$ajax.post('/api/backstageBox.php', params)
            .then((res) => {
              console.log('searchWorks', res.data);
              if (res.data !== 0) {
                this.worksList = res.data;
              } else {
                this.worksList = [];
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
      params.append('action', 'allWorksInfo');
      this.$ajax.post('/api/backstageBox.php', params)
        .then((res) => {
          console.log('allWorksInfo res:', res);
          if (res.data !== 0) {
            this.worksList = res.data;
          } else {
            this.worksList = [];
          }
        });
    }
  };
</script>

<style scoped lang="scss" type="text/scss">
  .summary {
    // 单行文本溢出
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-decoration: underline;
    // 多行文本溢出
    /* overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; */
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
  .imgStyle {
    width: 60px;
    height: auto;
    max-height: 100%;
    margin: 0 4px;
  }

  .expandImg {
    max-height: 400px;
  }
  .pageBlock {
    text-align: right;
    margin: 20px 0 50px;
  }
</style>
