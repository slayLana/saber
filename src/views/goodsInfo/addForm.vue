<template>
    <el-dialog
        :title="title"
        :visible.sync="box"
        width="50%"
        :before-close="beforeClose"
        append-to-body
      >
        <el-form
          :size="option.size"
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-row>
            <el-col span="12">
              <el-form-item label="提报日期" prop="submissionDate">
                <el-date-picker
                  v-model="form.submissionDate"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="产商" prop="business">
                <el-input v-model="form.business" placeholder="请输入产商" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="商品条码" prop="goodsCode">
                <el-input v-model="form.goodsCode" placeholder="请输入条码" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="商品名称" prop="goodsName">
                <el-input
                  v-model="form.goodsName"
                  placeholder="请输入商品名称"
                />
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="商品Sku" prop="goodsColor">
                <el-input
                  v-model="form.goodsColor"
                  placeholder="请输入商品Sku"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="商品尺寸" prop="goodsSize">
                <el-input
                  v-model="form.goodsSize"
                  placeholder="请输入商品尺寸"
                />
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="克重" prop="goodsWeightK">
                <el-input
                  v-model="form.goodsWeightK"
                  placeholder="请输入克重"
                />
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="包装" prop="pack">
                <!-- <el-input v-model="form.pack" placeholder="请输入包装" /> -->
                <el-select v-model="form.pack" clearable placeholder="请选择">
                  <el-option key="有" label="有" value="有"> </el-option>
                  <el-option key="无" label="无" value="无"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="商品进价" prop="buyingPrice">
                <el-input
                  v-model="form.buyingPrice"
                  placeholder="请输入商品进价"
                />
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="发货地" prop="placeDeliver">
                <el-input
                  v-model="form.placeDeliver"
                  placeholder="请输入发货地"
                />
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="利润率" prop="profitRate">
                <el-input
                  v-model="form.profitRate"
                  placeholder="请输入利润率"
                />
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="进度" prop="business">
                <el-select
                  v-model="form.goodsRate"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in rateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="8"
              ><el-form-item label="审核" prop="auditing">
                <!-- <el-input v-model="form.auditing" placeholder="请输入审核"/> -->
                <el-switch
                  v-model="form.auditing"
                  active-value="Y"
                  inactive-value=" "
                >
                </el-switch> </el-form-item
            ></el-col>

            <el-col span="8"
              ><el-form-item label="保留表单" prop="auditing">
                <!-- <el-input v-model="form.auditing" placeholder="请输入审核"/> -->
                <el-switch v-model="form.isSave"> </el-switch> </el-form-item
            ></el-col>
          </el-row>
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
            @click="closeBox"
            >取 消</el-button
          >
        </span>
      </el-dialog>
</template>
<script>
import {
  add,
  update
} from "@/api/goodsInfo/goodsInfo";
export default {
    data() {
        return{
          
        }
    },
    props:{
        rateOptions:{
            type:[],
            default:()=>[]
        },
         title:{
            type:String,
            default:""
        },
        box:{
            type:Boolean,
            default:false
        },
        option:{
            type:Object,
            default:()=>({})
        },
        form:{
            type:Object,
            default:()=>({})
        }
    },
    methods:{
    beforeClose(done) {
      done();
      this.$emit("closeBox","box")
    },
    closeBox(){
        this.box = false;
        this.$emit("closeBox","box")
    },
    handleSubmit() {
      this.form.auditing = this.form.auditing ? this.form.auditing.trim() : "";
      if (!this.form.id) {
        add(this.form).then(() => {
          this.box = false;
          this.$emit("submitSuccess","box")
        });
      } else {
        update(this.form).then(() => {
          this.box = false;
          this.$emit("submitSuccess","box")
        });
      }
    },
    }
}
</script>