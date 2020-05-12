<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="tableData"
      fit
      border
      resizable
      element-loading-text="Loading"
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>

      <el-table-column label="Title" min-width="200">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>

      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>

      <el-table-column label="过滤器时间" width="150" align="center">
        {{ 1563807494000 | parseTime('{y}-{m}-{d} {h}:{i}') }}
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | textFilter }}</el-tag>-->
          <el-tag :type="statusMap[scope.row.status].color">{{ statusMap[scope.row.status].text }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getList } from '@/api/table'

export default {
  name: 'Table',
  filters: {
    //    statusFilter(status) {
    //      const statusMap = {
    //        published: 'success',
    //        draft: '',
    //        deleted: 'danger'
    //      }
    //      return statusMap[status]
    //    },
    //    textFilter(status) {
    //      const statusMap = {
    //        published: '已发布',
    //        draft: '起草中',
    //        deleted: '已删除'
    //      }
    //      return statusMap[status]
    //    }
  },
  data() {
    return {
      statusMap: {
        published: { color: 'success', text: '已发布' },
        draft: { color: '', text: '起草中' },
        deleted: { color: 'danger', text: '已删除' }
      },
      listLoading: false,
      tableData: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取列表数据
    async fetchData() {
      // this.listLoading = true // 显示loading
      // const res = await getList()
      // this.tableData = res.data.items
      // this.listLoading = false
      try {
        this.listLoading = true
        const res = await getList()
        this.tableData = res.data.items
        this.listLoading = false // 获取数据后不显示loading
      } catch (err) {
        this.tableData = []
        this.listLoading = false // 如果接口异常不显示loading
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
