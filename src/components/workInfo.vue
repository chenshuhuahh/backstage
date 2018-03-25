<template>
  <div class="workInfo">
    <el-table :data="workInfoData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
      <el-table-column prop="work_id" label="id" width="50"></el-table-column>
      <el-table-column prop="cat_name" label="分类" width="50"></el-table-column>
      <el-table-column prop="stu_name" label="学生" width="85"></el-table-column>
      <el-table-column prop="work_name" label="作品名称" width="160"></el-table-column>
      <el-table-column prop="work_summary" label="简介&描述" width="270">
        <template slot-scope="scope">
          <a href="#" class="summary" @click="dialogDescVisible=true">
            {{scope.row.work_summary}}
          </a>
          <el-dialog title="作品简介&描述" :visible.sync="dialogDescVisible">
            {{scope.row.work_summary}}<br/>
            <div class="ql-container ql-snow">
              <div class="ql-editor" v-html="scope.row.work_desc">
              </div>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <span v-for="(imgUrl,index) in scope.row.work_photo" :key="index">
            <el-popover
              placement="right"
              width="100%"
              trigger="hover">
                <img :src="imgUrl" :alt="imgUrl">
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
    <div class="pageBlock">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="workInfoData.length">
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
        workInfoData: [{
          work_id: '1',
          cat_name: '设计',
          stu_name: '张三dan',
          work_name: '陌路繁花',
          work_summary: '五彩班里的花色结合一起凑成唯美的照片',
          work_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          work_photo: ['./static/img/15.jpg',
            './static/img/6.jpg',
            './static/img/9.jpg',
            './static/img/11.jpg',
            './static/img/15.jpg'],
          work_status: '未审核',
          tagType: 'info'
        }, {
          work_id: '2',
          cat_name: '摄影',
          stu_name: 'a张三',
          work_name: '陌路繁花',
          work_summary: '五彩班里的花色结合一起凑成唯美的照片',
          work_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          work_photo: ['./static/img/15.jpg',
            './static/img/9.jpg',
            './static/img/15.jpg',
            './static/img/6.jpg',
            './static/img/11.jpg'],
          work_status: '未审核',
          tagType: 'info'
        }, {
          work_id: '3',
          cat_name: '设计',
          stu_name: '张三',
          work_name: '陌路繁花',
          work_summary: '五彩班里的花色结合一起凑成唯美的照片',
          work_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          work_photo: ['./static/img/15.jpg',
            './static/img/9.jpg',
            './static/img/15.jpg',
            './static/img/6.jpg',
            './static/img/11.jpg'],
          work_status: '未审核',
          tagType: 'info'
        }, {
          work_id: '4',
          cat_name: '文章',
          stu_name: 'b张三',
          work_name: '陌路繁花',
          work_summary: '五彩班里的花色结合一起凑成唯美的照片',
          work_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          work_photo: ['./static/img/15.jpg',
            './static/img/9.jpg',
            './static/img/15.jpg',
            './static/img/6.jpg',
            './static/img/11.jpg'],
          work_status: '未审核',
          tagType: 'info'
        }, {
          work_id: '5',
          cat_name: '文章',
          stu_name: '张三',
          work_name: '陌路繁花',
          work_summary: '五彩班里的花色结合一起凑成唯美的照片',
          work_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          work_photo: ['./static/img/15.jpg',
            './static/img/9.jpg',
            './static/img/15.jpg',
            './static/img/6.jpg',
            './static/img/11.jpg'],
          work_status: '未审核',
          tagType: 'info'
        }, {
          work_id: '6',
          cat_name: '程序',
          stu_name: 'g张三',
          work_name: '陌路繁花',
          work_summary: '五彩班里的花色结合一起凑成唯美的照片',
          work_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          work_photo: ['./static/img/15.jpg',
            './static/img/9.jpg',
            './static/img/15.jpg',
            './static/img/6.jpg',
            './static/img/11.jpg'],
          work_status: '未审核',
          tagType: 'info'
        }, {
          work_id: '7',
          cat_name: '摄影',
          stu_name: '张三',
          work_name: '陌路繁花',
          work_summary: '五彩班里的花色结合一起凑成唯美的照片',
          work_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          work_photo: ['./static/img/15.jpg',
            './static/img/9.jpg',
            './static/img/15.jpg',
            './static/img/6.jpg',
            './static/img/11.jpg'],
          work_status: '未审核',
          tagType: 'info'
        }, {
          work_id: '8',
          cat_name: '摄影',
          stu_name: 'e张三',
          work_name: '陌路繁花',
          work_summary: '五彩班里的花色结合一起凑成唯美的照片',
          work_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          work_photo: ['./static/img/15.jpg',
            './static/img/9.jpg',
            './static/img/15.jpg',
            './static/img/6.jpg',
            './static/img/11.jpg'],
          work_status: '未审核',
          tagType: 'info'
        }, {
          work_id: '9',
          cat_name: '程序',
          stu_name: '张三',
          work_name: '陌路繁花',
          work_summary: '五彩班里的花色结合一起凑成唯美的照片',
          work_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          work_photo: ['./static/img/15.jpg',
            './static/img/9.jpg',
            './static/img/15.jpg',
            './static/img/6.jpg',
            './static/img/11.jpg'],
          work_status: '未审核',
          tagType: 'info'
        }, {
          work_id: '10',
          cat_name: '摄影',
          stu_name: 'k张三',
          work_name: '陌路繁花',
          work_summary: '五彩班里的花色结合一起凑成唯美的照片',
          work_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          work_photo: ['./static/img/15.jpg',
            './static/img/9.jpg',
            './static/img/15.jpg',
            './static/img/6.jpg',
            './static/img/11.jpg'],
          work_status: '未审核',
          tagType: 'info'
        }, {
          work_id: '11',
          cat_name: '摄影',
          stu_name: '张三',
          work_name: '陌路繁花',
          work_summary: '五彩班里的花色结合一起凑成唯美的照片',
          work_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          work_photo: ['./static/img/15.jpg',
            './static/img/9.jpg',
            './static/img/15.jpg',
            './static/img/6.jpg',
            './static/img/11.jpg'],
          work_status: '未审核',
          tagType: 'info'
        }, {
          work_id: '12',
          cat_name: '摄影',
          stu_name: 'u张三',
          work_name: '陌路繁花',
          work_summary: '五彩班里的花色结合一起凑成唯美的照片',
          work_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          work_photo: ['./static/img/15.jpg',
            './static/img/9.jpg',
            './static/img/15.jpg',
            './static/img/6.jpg',
            './static/img/11.jpg'],
          work_status: '未审核',
          tagType: 'info'
        }, {
          work_id: '13',
          cat_name: '摄影',
          stu_name: 'l张三',
          work_name: '陌路繁花',
          work_summary: '五彩班里的花色结合一起凑成唯美的照片',
          work_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          work_photo: ['./static/img/15.jpg',
            './static/img/9.jpg',
            './static/img/15.jpg',
            './static/img/6.jpg',
            './static/img/11.jpg'],
          work_status: '未审核',
          tagType: 'info'
        }, {
          work_id: '14',
          cat_name: '摄影',
          stu_name: '张三',
          work_name: '陌路繁花',
          work_summary: '五彩班里的花色结合一起凑成唯美的照片',
          work_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          work_photo: ['./static/img/15.jpg',
            './static/img/9.jpg',
            './static/img/15.jpg',
            './static/img/6.jpg',
            './static/img/11.jpg'],
          work_status: '未审核',
          tagType: 'info'
        }, {
          work_id: '15',
          cat_name: '摄影',
          stu_name: 's张三',
          work_name: '陌路繁花',
          work_summary: '五彩班里的花色结合一起凑成唯美的照片',
          work_desc: '上海市普陀区金沙江路 1518 弄五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的' +
          '照片五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结合一起五彩班里的花色结合一起凑成唯美的照片五彩班里的花色结' +
          '合一起凑成唯美的照片五彩班里的花色结合一起凑成唯美的照片凑成唯美的照片',
          work_photo: ['./static/img/15.jpg',
            './static/img/9.jpg',
            './static/img/15.jpg',
            './static/img/6.jpg',
            './static/img/11.jpg'],
          work_status: '未审核',
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
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
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

  .pageBlock {
    text-align: right;
    margin: 20px 0 50px;
  }
</style>
