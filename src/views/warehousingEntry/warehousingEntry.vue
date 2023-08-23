<template>
  <basic-container v-loading="fullscreenLoading">
    <div class="avue-crud">
      <el-row :hidden="!search" style="padding: 5px">
        <!-- 查询模块 -->
        <el-form :inline="true" :size="option.size" :model="query">
          <template>
            <el-form-item label="货品ID">
              <el-input v-model="query.skuId" placeholder="请输入货品ID"></el-input>
            </el-form-item>
            <el-form-item label="产商">
              <el-input v-model="query.business" placeholder="请输入产商"></el-input>
            </el-form-item>
            <el-form-item label="商品">
              <el-input v-model="query.goodsName" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="颜色规格">
              <el-input v-model="query.goodsName" placeholder="请输入颜色规格"></el-input>
            </el-form-item>
            <el-form-item label="操作状态">
              <el-select
              v-model="query.operate"
                clearable
                multiple
                placeholder="请选择"
              >
              <el-option
                  :key="1"
                  label="入库"
                  :value="1"
                >
                </el-option>
                <el-option
                  :key="0"
                  label="出库"
                  :value="0"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="下单日期">
              <el-date-picker
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
      v-model="query.orderDateRange"
      placeholder="选择日期">
    </el-date-picker>
            </el-form-item>
          </template>
          <!-- 查询按钮 -->
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="searchChange"
              >搜索</el-button
            >
            <el-button icon="el-icon-delete" @click="searchReset()"
              >清空</el-button
            >
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <div class="avue-crud__menu">
          <!-- 头部左侧按钮模块 -->
          <div class="avue-crud__left">
            <el-button
              :size="option.size"
              type="primary"
              icon="el-icon-plus"
              @click="handleAdd"
              >新增</el-button
            >
            <el-button
              :size="option.size"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete"
              plain
              >删除
            </el-button>
             <el-dropdown >
  <el-button type="primary" :size="option.size">
    导入<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown" >
    <el-dropdown-item ><el-upload
              class="upload"
              :headers="headers"
              action="/api/blade-warehousingEntry/warehousingEntry/import-excel?operate=1"
              multiple
              ref="upload1"
              :show-file-list="false"
              :limit="1"
              :on-success="handleSuccess"
              :before-upload="hadleUpload"
            >
              入库单
            </el-upload></el-dropdown-item>
            <el-dropdown-item >
            <el-upload
              class="upload"
              :headers="headers"
              action="/api/blade-warehousingEntry/warehousingEntry/import-excel?operate=0"
              multiple
              ref="upload2"
              :show-file-list="false"
              :limit="1"
              :on-success="handleSuccess"
              :before-upload="hadleUpload"
            >出库单
            </el-upload></el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
            <!-- <el-upload
              class="upload"
              :headers="headers"
              action="/api/blade-warehousingEntry/warehousingEntry/import-excel?operate=1"
              multiple
              ref="upload"
              :show-file-list="false"
              :limit="1"
              :on-success="handleSuccess"
              :before-upload="hadleUpload"
            >
              <el-button :size="option.size" type="primary" 
                >导入入库单</el-button
              >
            </el-upload> -->
            <el-dropdown @command="clickMenu">
  <el-button type="primary" :size="option.size">
    导出<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown" >
    <el-dropdown-item :command="handleExport">入库单数据</el-dropdown-item>
    <el-dropdown-item :command="exportInTemp">入库单模板</el-dropdown-item>
    <el-dropdown-item :command="exportOutTemp">出库单模板</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
          </div>
          <!-- 头部右侧按钮模块 -->
          <div class="avue-crud__right">
            <el-button
              :size="option.size"
              icon="el-icon-refresh"
              @click="searchChange"
              circle
            ></el-button>
            <el-button
              :size="option.size"
              icon="el-icon-search"
              @click="searchHide"
              circle
            ></el-button>
          </div>
        </div>
      </el-row>
      <el-row>
        <!-- 列表模块 -->
        <el-table
          ref="table"
          v-loading="loading"
          :size="option.size"
          @selection-change="selectionChange"
          :data="data"
          style="width: 100%"
          :border="option.border"
        >
          <el-table-column
            type="selection"
            v-if="option.selection"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column
            type="expand"
            v-if="option.expand"
            align="center"
          ></el-table-column>
          <template v-for="(item, index) in option.column">
            <!-- table字段 -->
            <el-table-column
              v-if="item.hide !== true"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :showOverflowTooltip="item.showOverflowTooltip"
              :key="index"
            >
              <template slot-scope="{ row }">
                <template v-if="item.prop == 'operate'">
                  <el-tag type="success" v-if="row.operate == 1">入库</el-tag>
                  <el-tag type="warning" v-if="row.operate == 0">出库</el-tag>
                </template>
                <template v-else>{{ row[item.prop] }}</template>
              </template>
            </el-table-column>
          </template>
          <!-- 操作栏模块 -->
          <el-table-column prop="menu" label="操作" :width="180" align="center">
            <template slot-scope="{ row }">
              <el-button
                :size="option.size"
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(row)"
                >编辑</el-button
              >
              <el-button
                :size="option.size"
                type="text"
                icon="el-icon-delete"
                @click="rowDel(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <!-- 分页模块 -->
        <el-pagination
          align="right"
          background
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </el-row>
      <!-- 表单模块 -->
      <el-dialog
        :title="title"
        :visible.sync="box"
        width="50%"
        :before-close="beforeClose"
        append-to-body
      >
        <el-form
          :disabled="view"
          :size="option.size"
          ref="form"
          :model="form"
          label-width="80px"
        >
          <!-- 表单字段 -->
          <el-form-item label="下单日期" prop="orderDate">
            <!-- <el-input v-model="form.orderDate" placeholder="请输入提报日期" /> -->
            <el-date-picker
      v-model="form.orderDate"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      type="date"

      placeholder="选择日期">
    </el-date-picker>
          </el-form-item>
          <el-form-item label="货品Id" prop="skuId">
            <el-input v-model="form.skuId" placeholder="请输入货品Id" @change="getGoodsInfo"/>
          </el-form-item>
          <el-form-item label="产商" prop="business">
            <el-input v-model="form.business" placeholder="请输入产商" disabled/>
          </el-form-item>
          <el-form-item label="货品条码" prop="goodsCode">
            <el-input v-model="form.goodsCode" placeholder="请输入条码" disabled/>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsName">
            <el-input v-model="form.goodsName" placeholder="请输入商品名称" disabled/>
          </el-form-item>
          <el-form-item label="颜色规格" prop="goodsColor">
            <el-input v-model="form.goodsColor" placeholder="请输入颜色规格" disabled/>
          </el-form-item>
          <el-form-item label="克重" prop="goodsWeightK">
            <el-input v-model="form.goodsWeightK" placeholder="请输入克重" disabled/>
          </el-form-item>
          <el-form-item label="单位" prop="unit">
            <el-input v-model="form.unit" placeholder="请输入单位" />
          </el-form-item>
          <el-form-item label="单价" prop="goodsPrice">
            <el-input v-model="form.goodsPrice" placeholder="请输入单价" />
          </el-form-item>
          <el-form-item label="补货量" prop="goodsNumber">
            <el-input v-model="form.goodsNumber" placeholder="请输入补货量" />
          </el-form-item>
          <el-form-item label="总价" prop="totalPrice">
            <el-input v-model="form.totalPrice" placeholder="请输入总价" disabled/>
          </el-form-item>
          <el-form-item label="到货/出货时间" prop="arrivalDate">
            <!-- <el-input v-model="form.arrivalDate" placeholder="预计到货时间" /> -->
            <el-date-picker
      v-model="form.arrivalDate"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      type="date"

      placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="操作" prop="remark">
            <!-- <el-input v-model="form.remark" placeholder="请输入备注" /> -->
                <el-radio-group v-model="form.operate" >
                  <el-radio :label="1" >入库</el-radio>
                  <el-radio :label="0" >出库</el-radio>
                </el-radio-group>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入备注" />
          </el-form-item>
          
        </el-form>
        <!-- 表单按钮 -->
        <span v-if="!view" slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            icon="el-icon-circle-check"
            :size="option.size"
            @click="handleSubmit"
            >提 交</el-button
          >
          <el-button
            icon="el-icon-circle-close"
            :size="option.size"
            @click="box = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
    </div>
  </basic-container>
</template>

<script>
import {
  getList,
  getDetail,
  getGoodsInfo,
  add,
  update,
  remove,
} from "@/api/warehousingEntry/warehousingEntry";
import option from "@/const/warehousingEntry/warehousingEntry";
import { mapGetters } from "vuex";
import store from "../../store";
  import {exportBlob} from "@/api/common";
  import {getToken} from "@/util/auth";
  import NProgress from 'nprogress';
  import 'nprogress/nprogress.css';
  import { downloadXls, timeFormate } from "@/util/util";

export default {
  data() {
    return {
      fullscreenLoading: false,
      headers: {
        "Blade-Auth": "Bearer " + store.getters.token,
      },
      // 弹框标题
      title: "",
      // 是否展示弹框
      box: false,
      // 是否显示查询
      search: true,
      // 加载中
      loading: true,
      // 是否为查看模式
      view: false,
      // 查询信息
      query: {},
      // 分页信息
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 40,
      },
      
      // 表单数据
      form: {},
      // 选择行
      selectionList: [],
      // 表单配置
      option: option,
      // 表单列表
      data: [],
    };
  },
  mounted() {
    this.init();
    this.onLoad(this.page);
  },
  watch:{
    totalPrice(){
      this.form.totalPrice = this.totalPrice
    }
  },
  computed: {
    ...mapGetters(["permission"]),
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
    totalPrice(){
      return (this.form.goodsNumber * this.form.goodsPrice).toFixed(2) || 0;
    }
  },
  methods: {
    init() {},
    searchHide() {
      this.search = !this.search;
    },
    getGoodsInfo(id){
      if(id.length == 6){
        getGoodsInfo(id).then( res =>{
          const tmp = {
            business:res.data.data.business,
            goodsCode:res.data.data.goodsCode,
            goodsName:res.data.data.goodsName,
            goodsColor:res.data.data.goodsColor,
            goodsWeightK:res.data.data.goodsWeightK
          }
          this.form = {...this.form,...tmp};
        })
      }
    },
    clickMenu(f){
      f()
    },
    exportInTemp(){
       exportBlob(`/api/blade-warehousingEntry/warehousingEntry/export-temp?op=1&${this.website.tokenHeader}=${getToken()}`,1).then(res => {
             downloadXls(res.data, `入库单模板.xlsx`);
          })
    },
    exportOutTemp(){
       exportBlob(`/api/blade-warehousingEntry/warehousingEntry/export-temp?op=0&${this.website.tokenHeader}=${getToken()}`,0).then(res => {
            downloadXls(res.data, `出库单模板.xlsx`)
          })
    },
    handleExport() {
        this.$confirm("是否导出入库单数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          NProgress.start();
          exportBlob(`/api/blade-warehousingEntry/warehousingEntry/export-data?${this.website.tokenHeader}=${getToken()}`,this.query).then(res => {
            downloadXls(res.data, `入库单${timeFormate(new Date())}.xlsx`);
            NProgress.done();
          })
        });
      },
    searchChange() {
      this.onLoad(this.page);
    },
    searchReset() {
      this.query = {};
      this.page.currentPage = 1;
      this.onLoad(this.page);
    },
    handleSubmit() {
      if (!this.form.id) {
        add(this.form).then(() => {
          this.box = false;
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
      } else {
        update(this.form).then(() => {
          this.box = false;
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
      }
    },
    handleAdd() {
      this.title = "新增";
      this.form = {};
      this.box = true;
    },
    handleEdit(row) {
      this.title = "编辑";
      this.box = true;
      getDetail(row.id).then((res) => {
        this.form = res.data.data;
      });
    },
    handleView(row) {
      this.title = "查看";
      this.view = true;
      this.box = true;
      getDetail(row.id).then((res) => {
        this.form = res.data.data;
      });
    },
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.selectionClear();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    beforeClose(done) {
      done();
      this.form = {};
      this.view = false;
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.table.clearSelection();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.onLoad(this.page);
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.onLoad(this.page);
    },
    onLoad(page, params = {}) {
      this.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then((res) => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    },
    handleSuccess(res) {
      this.$refs.upload1.clearFiles();
      this.$refs.upload2.clearFiles();
      this.$message({
        message: res.msg,
        type: "success",
      });
      this.fullscreenLoading = false;
      this.onLoad(this.page);
    },
    hadleUpload() {
      this.fullscreenLoading = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
.upload {
  display: inline-block;
}
</style>
