<template>
  <div class="workInfo">
    <el-table :data="worksList.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
      <el-table-column prop="work_id" label="id" width="50"></el-table-column>
      <el-table-column prop="cat_name" label="分类" width="50"></el-table-column>
      <el-table-column prop="stu_name" label="学生" width="85"></el-table-column>
      <el-table-column prop="work_name" label="作品名称" width="160"></el-table-column>
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
    </el-table>
    <el-dialog title="作品简介&描述" :visible.sync="dialogDescVisible">
      {{dialogShowObj.work_summary}}<br/>
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
        currentPage: 1,
        pageSize: 5,
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
          this.$message({
            type: 'success',
            message: '《' + row.work_name + '》作品审核通过'
          });
          row.work_status = '通过';
          row.tagType = 'success';
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '《' + row.work_name + '》作品审核不通过'
          });
          row.work_status = '不通过';
          row.tagType = 'danger';
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
      }
    },
    mounted() {
      let params = new URLSearchParams();
      params.append('action', 'allWorksInfo');
      this.$ajax.post('/api/backstageBox.php', params)
        .then((res) => {
          console.log('allWorksInfo res:', res);
          this.worksList = res.data;
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

  .imgStyle {
    width: 50px;
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
