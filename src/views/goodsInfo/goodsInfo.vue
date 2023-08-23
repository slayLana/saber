<template>
  <basic-container>
    <div class="avue-crud">
      <!-- 查询模块 -->
      <query-form
        :rateOptions="rateOptions"
        :option="option"
        :query="query"
        :search="search"
        @searchReset="searchReset"
        @searchChange="searchChange"
      ></query-form>
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
            <el-button
              :size="option.size"
              type="primary"
              @click="handleImport"
              plain
              >导入
            </el-button>
            <el-dropdown @command="clickMenu">
              <el-button type="primary" :size="option.size">
                批量审核<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="handleAudit('Y')"
                  >Y</el-dropdown-item
                >
                <el-dropdown-item :command="handleAudit('N')"
                  >N</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
              :size="option.size"
              @click="handlePrint"
              >打印条码</el-button
            >
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
              icon="el-icon-s-operation"
              @click="handleDrawer"
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
      <el-row :gutter="10">
        <el-col :span="6"
          ><el-input
            @input="handleInput"
            v-model="exportGoodsCodes"
            placeholder="请输入导出条码"
          ></el-input
        ></el-col>
        <el-col :span="8"
          ><el-button
            :size="option.size"
            type="primary"
            @click="handleExport"
            plain
            >导出
          </el-button></el-col
        >
      </el-row>
      <el-row>
        <!-- 列表模块 -->
        <el-table
          :row-key="
            (row) => {
              return row.id;
            }
          "
          :expand-row-keys="expands"
          ref="table"
          v-loading="loading"
          :size="option.size"
          @selection-change="selectionChange"
          :data="data"
          style="width: 100%"
          :border="option.border"
          @sort-change="handleSort"
          :row-style="tableRowStyle"
        >
          <el-table-column
            type="selection"
            v-if="option.selection"
            width="55"
            align="center"
            fixed
          ></el-table-column>

          <template v-for="(item, index) in option.column">
            <!-- table字段 -->
            <el-table-column
              v-if="item.hide !== true"
              :prop="item.prop"
              :sortable="item.sortable"
              :label="item.label"
              :fixed="item.fixed"
              :width="item.width"
              :show-overflow-tooltip="item.showOverflowTooltip"
              :key="index"
              :max-height="5"
            >
              <template slot-scope="{ row }">
                <template v-if="item.prop == 'goodsImage'">
                  <el-upload
                    v-model="row.goodsImage"
                    :beforeUpload="beforeUpload"
                    accept=".jpg,.jpeg,.png,"
                    :http-request="uploadImage"
                    :headers="headers"
                    class="avatar-uploader"
                    :show-file-list="false"
                    action=""
                  >
                    <img
                      v-if="row.goodsImage"
                      :src="row.goodsImage"
                      class="avatar"
                      style="width: 50px; height: 50px"
                      @click="bind_Id(row.id)"
                    />
                    <i
                      v-else
                      class="el-icon-plus avatar-uploader-icon"
                      @click="bind_Id(row.id)"
                    ></i>
                  </el-upload>
                </template>
                <template v-else>
                  <!-- <div>test</div> -->
                  <el-tooltip placement="top" :disabled="!item.tooltip">
                    <div slot="content" v-if="item.prop == 'offerPrice'">
                      数量：{{ row.goodsCount }}<br />
                      运费1：{{ row.freightFee1 }}<br />成本1：{{
                        row.primeCost1
                      }}<br />
                      运费2：{{ row.freightFee2 }}<br />成本2：{{
                        row.primeCost2
                      }}
                    </div>
                    <focus-input
                      :openEdit="item.edit"
                      v-model="row[item.prop]"
                      :placeholder="item.label"
                      :clearable="item.clearable"
                      :selectOptions="item.selectOptions || {}"
                      :commentOption="item.comment"
                      :datePickOptions="item.datePickOptions"
                      :mystyle="
                        myFuction(item.comment ? item.comment.style : null, row)
                      "
                      @myclick="
                        myFuction(
                          item.comment ? item.comment.onclick : null,
                          row,
                          arguments[0]
                        )
                      "
                      @openEdit="openEdit(item)"
                      :inputType="item.inputType"
                      @myOnBlur="
                        handleOnBlur(row, item, arguments[0], arguments[1])
                      "
                    >
                    </focus-input>
                  </el-tooltip>
                </template>
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
          <!-- 展开模块 -->
          <el-table-column type="expand" v-if="option.expand" width="1">
            <template>
              <div class="expand">
                <el-row>
                  <el-col
                    v-for="item in goodsShopList"
                    :key="item"
                    :span="2"
                    align="center"
                  >
                    <el-tooltip placement="top" :content="item.shopType">
                      <el-button
                        icon="el-icon-link"
                        class="el-button--text"
                        style="
                          font-size: 12px;
                          font-weight: normal;
                          padding-bottom: 0;
                          width: fit-content;
                          max-width: 80%;
                          overflow: hidden;
                          text-overflow: ellipsis;
                        "
                        @click="toUrl(item.shopUrl)"
                        >{{ item.shopType }}</el-button
                      >
                    </el-tooltip>
                    <el-button
                      type="text"
                      icon="el-icon-remove-outline"
                      style="margin-left: 5px; color: red; padding-bottom: 0"
                      @click="delShopRul(item.id)"
                    ></el-button>
                  </el-col>
                  <el-col :span="3" align="left">
                    <div class="el-empty" v-if="goodsShopList.length == 0">
                      <div class="el-empty__description">
                        <p>暂无商链记录</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-form
                  :size="option.size"
                  ref="goodsUrlForm"
                  :model="goodsUrlForm"
                  label-width="80px"
                >
                  <el-row gutter="10">
                    <el-col :span="4">
                      <el-form-item label="链接" prop="shopUrl">
                        <el-input
                          v-model="goodsUrlForm.shopUrl"
                          placeholder="请输入链接"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="备注名" prop="shopType">
                        <el-input
                          v-model="goodsUrlForm.shopType"
                          placeholder="备注名"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-button type="primary" size="small" @click="addShopRul"
                        >添加</el-button
                      >
                    </el-col>
                  </el-row>
                </el-form>
              </div>
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
      <el-dialog
        title="数据导入"
        append-to-body
        :visible.sync="excelBox"
        width="555px"
      >
        <avue-form
          :option="excelOption"
          v-model="excelForm"
          :upload-after="uploadAfter"
        >
          <template slot="excelTemplate">
            <el-button type="primary" @click="handleTemplate">
              点击下载<i class="el-icon-download el-icon--right"></i>
            </el-button>
          </template>
        </avue-form>
      </el-dialog>
      <!-- 表单模块 -->
      <add-form
        :box.sync="box"
        :form="form"
        :title="title"
        :option="option"
        :rateOptions="rateOptions"
        @submitSuccess="submitSuccess"
        @closeBox="closeBox"
      ></add-form>
      <printe-form
        :box.sync="printBox"
        :title="title"
        :option="option"
        @closeBox="closeBox"
      ></printe-form>

      <!-- 算价模块 -->
      <price-form
        :title="title"
        :priceBox.sync="priceBox"
        :priceForm="priceForm"
        :option="option"
        :request="request"
        @submitSuccess="submitSuccess"
        @closeBox="closeBox"
      ></price-form>

      <table-drawer
        :visible.sync="visibleDrawer"
        :option="option"
      ></table-drawer>
    </div>
  </basic-container>
</template>

<script>
import { getList, getDetail, update, remove } from "@/api/goodsInfo/goodsInfo";
// import request from "@/router/axios";
import option from "@/const/goodsInfo/goodsInfo";
import priceForm from "./priceForm.vue";
import addForm from "./addForm.vue";
import printeForm from "./printeForm.vue";
import queryForm from "./queryForm.vue";
import focusInput from "@/components/focus-input/main.vue";
import tableDrawer from "@/components/table-drawer/main.vue";
import request from "@/router/axios";
import { mapGetters } from "vuex";
import store from "../../store";
import { exportBlob } from "@/api/common";
import { downloadXls, timeFormate } from "@/util/util";
import { getToken } from "@/util/auth";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default {
  components: {
    "focus-input": focusInput,
    "table-drawer": tableDrawer,
    "price-form": priceForm,
    "add-form": addForm,
    "query-form": queryForm,
    "printe-form":printeForm
  },
  data() {
    return {
      expands: [], //展开显示商链的列
      goodsShopList: [], //商链列表
      goodsUrlForm: {}, //商链表单
      visibleDrawer: false, //表格列显引模块控制
      request: {}, //算价模块结果
      tmp: null, //临时settimeout的tmp，用于控制单双击不冲突。
      bindId: "",
      exportGoodsCodes: "", //导出条码
      cityList: [],
      excelBox: false, //控制导入模块
      rateOptions: null, //商品进度的配置
      excelForm: {},
      excelOption: {
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: "模板上传",
            prop: "excelFile",
            type: "upload",
            drag: true,
            loadText: "模板上传中，请稍等",
            span: 24,
            propsHttp: {
              res: "data",
            },
            tip: "请上传 .xls,.xlsx 标准格式文件",
            action: "/api/blade-goodsInfo/goodsInfo/import-goodsInfo",
          },
          {
            label: "数据覆盖",
            prop: "isCovered",
            type: "switch",
            align: "center",
            width: 80,
            dicData: [
              {
                label: "否",
                value: 0,
              },
              {
                label: "是",
                value: 1,
              },
            ],
            value: 0,
            slot: true,
            rules: [
              {
                required: true,
                message: "请选择是否覆盖",
                trigger: "blur",
              },
            ],
          },
          {
            label: "模板下载",
            prop: "excelTemplate",
            formslot: true,
            span: 24,
          },
        ],
      },
      // 弹框标题
      title: "",
      // 是否展示弹框
      box: false,
      printBox: false,
      priceBox: false,
      // 是否显示查询
      search: true,
      // 加载中
      loading: true,
      loadingDailog: false,
      // 是否为查看模式
      view: false,
      // 查询信息
      query: {},
      headers: {
        "Blade-Auth": "Bearer " + store.getters.token,
      },
      // 分页信息
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 40,
      },
      // 表单数据
      form: {},
      priceForm: {},
      // 选择行
      selectionList: [],
      // 表单配置
      option: option,
      // 表单列表
      data: [],
      editCellOption: {},
    };
  },
  watch: {
    "excelForm.isCovered"() {
      if (this.excelForm.isCovered !== "") {
        const column = this.findObject(this.excelOption.column, "excelFile");
        column.action = `/api/blade-goodsInfo/goodsInfo/import-goodsInfo?isCovered=${this.excelForm.isCovered}`;
      }
    },
    "priceForm.goodsCount"() {
      this.priceForm.weight =
        (this.priceForm.goodsCount * this.priceForm.goodsWeightK) / 1000;
    },
  },
  mounted() {
    this.init();
    this.onLoad(this.page);
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
  },
  methods: {
    init() {
      this.rateOptions = this.option.column.find(
        (item) => item.prop == "goodsRate"
      ).selectOptions;
    },
    bind_Id(id) {
      this.bindId = id;
      console.log(this.bindId);
    },
    myFuction(fname, param, ...args) {
      if (fname) {
        return this[fname](param, ...args);
      }
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 1MB");
        return false;
      }
    },
    uploadImage(params) {
      this.loading = true;
      let file = params.file;
      const form = new FormData();

      const imageConversion1 = require("image-conversion");
      imageConversion1.compressAccurately(file, 100).then((res) => {
        let resFile = new File([res], file.name);
        form.append("file", resFile);
        request({
          url: "/api/blade-resource/oss/endpoint/put-file-attach",
          method: "post",
          data: form,
        })
          .then(({ data }) => {
            this.imageSuccess(data);
          })
          .catch(() => {
            this.loading = false;
            this.$message({
              message: "上传失败，请重试",
              type: "error",
            });
          });
      });
    },
    openEdit(option) {
      this.editCellOption = { ...option };
      console.log(this.editCellOption);
      option.width = option.width + 45;
    },
    handleOfferPrice(row) {
      this.title = row.goodsName;
      this.priceForm = {
        goodsId: row.id,
        profitRate: row.profitRate,
        goodsCount: row.goodsCount || 200,
        goodsWeightK: row.goodsWeightK,
        buyingPrice: row.buyingPrice,
        weight: (row.goodsCount * row.goodsWeightK) / 1000,
      };
      this.request = {
        primeCost1: row.primeCost1,
        primeCost2: row.primeCost2,
        freightFee1: row.freightFee1,
        freightFee2: row.freightFee2,
      };
      this.priceBox = true;
    },
    goodsRateStyle(row) {
      const rateinfo = this.rateOptions.find(
        (rate) => rate.value == row.goodsRate
      );
      if (rateinfo) {
        return {
          color: rateinfo.color,
        };
      } else return {};
    },
    styleButton() {
      return { color: "#6c6e71" };
    },
    uploadAfter(res, done, loading, column) {
      window.console.log(column);
      this.excelBox = false;
      this.onLoad(this.page);
      done();
    },
    handleExport() {
      if (this.exportGoodsCodes == "" && this.ids == "") {
        this.$message({
          type: "error",
          message: "请选择导出的数据或者输入导出条码。",
        });
        return;
      }
      const form = {
        exportGoodsCodes: this.exportGoodsCodes || "99999",
        ids: this.ids,
      };
      this.$confirm("是否导出商品信息数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        NProgress.start();
        request({
          url: "/api/blade-goodsInfo/goodsInfo/export-goodsInfo",
          method: "get",
          params: form,
          responseType: "blob",
        }).then((res) => {
          downloadXls(res.data, `商品信息${timeFormate(new Date())}.xlsx`);
          NProgress.done();
        });
      });
    },
    handleSort({ prop, order }) {
      this.$delete(this.query, "descs");
      this.$delete(this.query, "ascs");
      const orderS = order == "descending" ? "descs" : "ascs";
      if (order) {
        prop = prop.replace(/([A-Z])/g, "_$1").toLowerCase();
        this.query = {
          ...this.query,
          [orderS]: prop,
        };
      }
      this.onLoad(this.page);
    },
    searchHide() {
      this.search = !this.search;
    },
    searchChange() {
      this.onLoad(this.page);
    },
    searchReset() {
      this.query = {};
      this.page.currentPage = 1;
      this.onLoad(this.page);
    },
    handleTemplate() {
      exportBlob(
        `/api/blade-goodsInfo/goodsInfo/export-template?${
          this.website.tokenHeader
        }=${getToken()}`
      ).then((res) => {
        downloadXls(res.data, `商品信息模板.xlsx`);
      });
    },
    handleImport() {
      this.excelBox = true;
    },
    handleAdd() {
      this.title = "新增";
      this.form.id = null;
      if (!this.form.isSave) {
        this.form = {
          submissionDate: new Date(),
        };
      }
      this.box = true;
    },
    handlePrint(){
      this.printBox = true;
    },
    handleEdit(row) {
      this.title = "编辑";
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
    handleAudit(auditStatus) {
     const f = () =>{ if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据审核?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const res = (ids, status) =>
            request({
              url: "/api/blade-goodsInfo/goodsInfo/audit",
              method: "post",
              params: { ids, status },
            });
          return res(this.ids, auditStatus);
        })
        .then(() => {
          this.selectionClear();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
     }
     return f;
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
    tableRowStyle({ rowIndex }) {
      if (rowIndex % 2 != 0) {
        return {
          "background-color": "#f6f6f6",
        };
      }
    },
    handleDrawer() {
      // debugger
      console.log(this.visibleDrawer);
      this.visibleDrawer = true;
    },
    handleOnBlur(row, item, value, isChange) {
      let form = {
        id: row.id,
        [item.prop]: value,
      };
      if (item.prop == "profitRate" && value) {
        let tmp = +(value.replace("%", "") / 100).toFixed(2);
        form = {
          ...form,
          offerPrice: (row.primeCost2 * (1 + tmp)).toFixed(1),
        };
      }
      item.width = this.editCellOption.width;
      if (isChange) {
        this.loading = true;
        update(form).then(() => {
          this.onLoad(this.page);
          this.editCellOption = {};
          this.$message({
            type: "success",
            message: "更新成功!",
          });
        });
      }
    },

    copySuccess() {
      this.$message({
        message: "复制成功",
        type: "success",
      });
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
    imageSuccess(res) {
      console.log(res);
      // this.onLoad(this.page);
      const form = {
        goodsImage: res.data.link,
        id: this.bindId,
      };
      update(form)
        .then(() => {
          this.loading = false;
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    copyInfo(row, value) {
      if (!this.tmp) {
        this.tmp = setTimeout(() => {
          console.log(value);
          // 创建输入框元素
          let oInput = document.createElement("input");
          // 将想要复制的值
          oInput.value = value;
          // 页面底部追加输入框
          document.body.appendChild(oInput);
          // 选中输入框
          oInput.select();
          // 执行浏览器复制命令
          document.execCommand("Copy");
          // 弹出复制成功信息
          this.$message.success("复制成功");
          // 复制后移除输入框
          oInput.remove();
          this.tmp = null;
        }, 300);
      } else {
        clearTimeout(this.tmp);
        this.tmp = null;
      }
    },
    expandRow(row, value) {
      if (!this.tmp) {
        this.tmp = setTimeout(() => {
          console.log(value);
          // 创建输入框元素
          let oInput = document.createElement("input");
          // 将想要复制的值
          oInput.value = value;
          // 页面底部追加输入框
          document.body.appendChild(oInput);
          // 选中输入框
          oInput.select();
          // 执行浏览器复制命令
          document.execCommand("Copy");
          // 弹出复制成功信息
          this.$message.success("复制成功");
          // 复制后移除输入框
          oInput.remove();
          this.tmp = null;
        }, 250);
      } else {
        clearTimeout(this.tmp);
        this.tmp = null;
        this.goodsShopList = [];
        this.goodsUrlForm = {};
        if (this.expands.includes(row.id)) {
          this.expands = this.expands.filter((val) => val !== row.id);
        } else {
          this.expands = [];
          this.loadUrl(row.id).then((res) => {
            this.goodsShopList = res.data.data;
            this.expands.push(row.id);
            this.goodsUrlForm = { goodsId: row.id };
          });
        }
      }
    },
    addShopRul() {
      if (!this.goodsUrlForm.shopType || !this.goodsUrlForm.shopUrl) {
        this.$message({
          type: "error",
          message: "url或备注名不能为空",
        });
        return;
      }
      if (
        !this.goodsUrlForm.shopUrl.startsWith("http://") &&
        !this.goodsUrlForm.shopUrl.startsWith("https://")
      ) {
        this.$message({
          type: "error",
          message: "url请已https//或http//开头",
        });
        return;
      }
      request({
        url: "/api/blade-goodsShop/goodsShop/submit",
        method: "post",
        data: this.goodsUrlForm,
      }).then(() => {
        // this.goodsShopList.push(this.goodsUrlForm)
        this.loadUrl(this.goodsUrlForm.goodsId).then((res) => {
          this.goodsShopList = res.data.data;
          this.goodsUrlForm.shopType = "";
          this.goodsUrlForm.shopUrl = "";
        });
      });
    },
    toUrl(url) {
      window.open(url);
    },
    delShopRul(id) {
      this.$confirm("是否删除商链该记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        request({
          url: "/api/blade-goodsShop/goodsShop/remove",
          method: "post",
          params: {
            ids: id,
          },
        }).then(() => {
          this.loadUrl(this.goodsUrlForm.goodsId).then((res) => {
            this.goodsShopList = res.data.data;
          });
        });
      });
    },
    handleInput(v) {
      // const re = /[u4E00-u9FA5]/g;
      debugger;
      const pattern = new RegExp("[\u4E00-\u9FA5]+");
      let res = v.replace(pattern, "").replaceAll(" ", ",").split(",");
      res = res.filter((value, i) => value != "" || i != 0);
      this.exportGoodsCodes = res.toString();
    },
    loadUrl(goodsId) {
      return request({
        url: "/api/blade-goodsShop/goodsShop/list",
        method: "get",
        params: { goodsId },
      });
    },
    submitSuccess(value) {
      this[value] = false;
      this.onLoad(this.page);
      this.$message({
        type: "success",
        message: "操作成功!",
      });
    },
    clickMenu(f){
      f()
    },
    // headerClick(column, event){
    //   console.log(column,event)
    //   if(column.property != 'goodsCode'){
    //     return
    //   }
    //   const goodsCodes = this.data.map(i => i.goodsCode)
    //   console.log(goodsCodes.toString())
    //    // 创建输入框元素
    //       let oInput = document.createElement("input");
    //       // 将想要复制的值
    //       oInput.value = goodsCodes.toString();
    //       // 页面底部追加输入框
    //       document.body.appendChild(oInput);
    //       // 选中输入框
    //       oInput.select();
    //       // 执行浏览器复制命令
    //       document.execCommand("Copy");
    //       // 弹出复制成功信息
    //       this.$message.success("复制成功");
    //       // 复制后移除输入框
    //       oInput.remove();
    // },
    closeBox(value) {
      this[value] = false;
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
  },
};
</script>
<style lang="scss">
.form-item .el-form-item__content {
  width: 90px;
}
.el-table__expand-icon {
  display: unset !important;
}
.avue-crud .el-table .el-form-item__label {
  position: unset !important;
}

.el-table__cell.el-table__expanded-cell .el-empty {
  height: 1px;
  padding: 20px;
  .el-empty__description {
    margin-top: 0px;
  }
}
.el-table__body-wrapper {
  .el-table__expanded-cell {
    z-index: 100;
    padding: 0;
  }
}
.el-table__fixed,
.el-table__fixed-right {
  .el-table__expanded-cell {
    visibility: hidden;
    padding: 0;
  }
}
.expand {
  width: 100%;
  padding-left: 2rem;
  /* padding: 20px; */
  background-color: #dcdfe6 !important; //盖住fixed产生的阴影
  font-size: 12px;

  .el-form-item__label {
    font-size: 12px !important;
  }
  .el-input__inner {
    font-size: 12px !important;
  }
}
</style>
<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
.avatar {
  display: block;
}
</style>
