<template>
  <div>
    <!-- 三级分类列表 -->
    <el-card style="margin:10px 10px">
      <el-form :inline="true" label-width="80px">
        <el-form-item label="一级分类">
          <el-select @change="changeCategory2" v-model="cForm.category1Id" placeholder="请选择">
            <el-option v-for="c1 in category1List" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select @change="changeCategory3" v-model="cForm.category2Id" placeholder="请选择">
            <el-option v-for="c2 in category2List" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select @change="getList" v-model="cForm.category3Id" placeholder="请选择">
            <el-option v-for="c3 in category3List" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>


    <!-- spu列表 -->
    <el-card>
      <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
      <el-table border :data="records" style="width: 100%">
        <el-table-column type="index" label="序号" width="80px"></el-table-column>
        <el-table-column prop="spuName" label="SPU名称" width="width"></el-table-column>
        <el-table-column prop="description" label="SPU描述" width="width"></el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
        </el-table-column>
      </el-table> 
      <!-- @size-change="handleSizeChange"
         -->
      <el-pagination
        @current-change="handleCurrentChange"
        align='center'
        :current-page="page"
        :page-sizes="[3, 5, 7]"
        :page-size="limit"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {category1,category2,category3,getList} from '@/api/category'
export default {
  name: "Spu",
  data(){
    return {
      category1List:[],
      category2List:[],
      category3List:[],
      cForm:{
        category1Id:'',
        category2Id:'',
        category3Id:''
      },
      page: 1,
      limit: 3,
      total: 0,
      records:[]
    }
  },
  mounted(){
    this.changeCategory1()
  },
  methods:{
    /* 获取一级分类数据 */
    async changeCategory1(){
      try {
        const result = await category1()
        this.category1List = result.data
      } catch (error) {
        this.$message.error('获取一级分类列表请求失败')
      }
    },

    /* 选择一级分类 根据一级分类id获取二级分类数据 */
    async changeCategory2(category1Id){
      /* 点击一级分类删除二三级分类数据和id 、以及spu列表数据*/
      this.category2List = []
      this.category3List = []
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''
      this.records = []
      try {
        const result = await category2(category1Id)
        this.category2List = result.data
      } catch (error) {
        this.$message.error('获取二级分类请求失败')
      }
    },

    /* 选择二级分类 根据二级分类id获取二级分类数据 */
    async changeCategory3(category2Id){
      /* 点击二级分类删除三级分类数据和id 、以及spu列表数据*/
      this.category3List = []
      this.cForm.category3Id = ''
      this.records = []
      try {
        const result = await category3(category2Id)
        this.category3List = result.data
      } catch (error) {
        this.$message.error('获取三级分类请求失败')
      }
    },
    /* 选中三级分类，根据三级分类id、每页数量limit、当前页page获取spu列表数据 */
    async getList(category3Id){
      try {
        let {page,limit} = this
        const result = await getList(page,limit,category3Id) 
        this.records = result.data.records
        this.total = result.data.total
      } catch (error) {
        this.$message.error('请求获取spu列表失败')
      }
    },
    /* 改变页码，获取当前页的spu列表数据 */
    /* pager是handleCurrentChange传递下来的当前页码 */
    async handleCurrentChange(pager = 1){
      // console.log(pager);
      this.page = pager
      try {
        let {page,limit} = this
        let {category3Id} = this.cForm

        const result = await getList(page,limit,category3Id) 

        this.records = result.data.records
        this.total = result.data.total
      } catch (error) {
        this.$message.error('请求获取spu列表失败')
      }
    }
  }
};
</script>

<style>
</style>