<template>
    <el-dialog
        v-loading="loadingDialog"
        :title="title"
        :visible.sync="priceBox"
        width="50%"
        :before-close="beforeClose"
        append-to-body
      >
        <el-form
          :size="option.size"
          ref="priceForm"
          :model="priceForm"
          label-width="80px"
        >
          <el-row>
            <el-col span="8">
              <el-form-item label="数量" prop="goodsCount">
                <el-input
                  v-model="priceForm.goodsCount"
                  placeholder="请输入数量"
                />
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="重量" prop="weight">
                <el-input
                  v-model="priceForm.weight"
                  placeholder="请输入"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="嘉兴收" prop="city1">
                <!-- <el-cascader
                  clearable
                  :props="propsCity1"
                  :options="cityList"
                  v-model="priceForm.city1"
                  @change="changeCity1"
                ></el-cascader> -->
                <el-select
                  clearable
                  v-model="priceForm.city1"
                  filterable
                  remote
                  reserve-keyword
                  @change="changeCity1"
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                >
                  <el-option
                    v-for="item in cityList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="嘉兴发" prop="city2">
                <!-- <el-cascader
                  clearable
                  :props="propsCity1"
                  :options="cityList"
                  v-model="priceForm.city2"
                  @change="changeCity1"
                ></el-cascader> -->
                <el-select
                  clearable
                  v-model="priceForm.city2"
                  filterable
                  remote
                  reserve-keyword
                  @change="changeCity2"
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                >
                  <el-option
                    v-for="item in cityList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="运费1:" prop="city1">
                {{ this.request.freightFee1 }}
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="成本1:" prop="city1">
                {{ this.request.primeCost1 }}
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="运费2:" prop="city1">
                {{ this.request.freightFee2 }}
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="成本2:" prop="city1">
                {{ this.request.primeCost2 }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" :size="option.size" @click="handleComputed"
            >计 算</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-circle-check"
            :size="option.size"
            @click="handleSavePrice"
            >保 存</el-button
          >
          <el-button
            icon="el-icon-circle-close"
            :size="option.size"
            @click="closeBox"
            >取 消</el-button
          >
        </span>
      </el-dialog>
</template>
<script>
import {
  update,
} from "@/api/goodsInfo/goodsInfo";
export default {
    name: "priceForm",
    data() {
        return {
        cityList:[]}
    },
    props:{
        title:{
            type:String,
            default:""
        },
        priceBox:{
            type:Boolean,
            default:false
        },
        option:{
            type:Object,
            default:()=>({})
        },
        request:{
            type:Object,
            default:()=>({})
        },
        priceForm:{
            type:Object,
            default:()=>({})
        }
    },
     watch: {
    "priceForm.goodsCount"() {
      this.priceForm.weight =
        (this.priceForm.goodsCount * this.priceForm.goodsWeightK) / 1000;
    },
  },
    methods:{
    loadCityBypId(pCode, event) {
      this.$http({
        url: `/api/blade-system/region/lazy-tree?parentCode=${pCode}`,
        method: "get",
      }).then(event);
    },
    remoteMethod(query) {
      if (query) {
        this.$http({
          url: `/api/blade-system/region/allList?name=${query}`,
          method: "get",
        }).then((res) => {
          this.cityList = res.data.data;
        });
      }
    },
    changeCity2(city2) {
      if (city2) {
        const city = this.cityList.find((item) => item.code == city2);
        this.priceForm.receiveCityId = city.code;
        this.priceForm.receiveProvinceId = city.parentCode;
      } else {
        this.priceForm.receiveCityId = null;
        this.priceForm.receiveProvinceId = null;
      }
    },
    changeCity1(city1) {
      if (city1) {
        const city = this.cityList.find((item) => item.code == city1);
        this.priceForm.sendCityId = city.code;
        this.priceForm.sendProvinceId = city.parentCode;
      } else {
        this.priceForm.sendCityId = null;
        this.priceForm.sendProvinceId = null;
      }
    },
    handleSavePrice() {
      if (!this.request.primeCost1) {
        this.$message({
          type: "error",
          message: "请先计算费用!",
        });
      }
      let tmp = +(this.priceForm.profitRate.replace("%", "") / 100).toFixed(2);
      const form = {
        id: this.priceForm.goodsId,
        goodsCount: this.priceForm.goodsCount,
        goodsWeightKg: this.priceForm.goodsWeightKg,
        offerPrice: (this.request.primeCost2 * (1 + tmp)).toFixed(1),
        ...this.request,
      };
      update(form).then(() => {
        this.priceBox = false;
        this.$emit("submitSuccess","priceBox")
      });
    },
    beforeClose(done) {
      done();
      this.request = {};
      this.priceForm = {};
      this.$emit("closeBox","priceBox")
    },
    closeBox(){
        this.priceBox = false
        this.$emit("closeBox","priceBox")
    },
    handleComputed() {
      console.log(this.priceForm);
      this.loadingDailog = true;
      // };
      this.$http({
        url: `/api/blade-goodsInfo/goodsInfo/computedPrice`,
        params: this.priceForm,
      }).then((res) => {
        this.loadingDailog = false;
        console.log(res);
        this.request = res.data.data;
      });
    },
    }
}
</script>