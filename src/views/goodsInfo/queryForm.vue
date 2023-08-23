<template>
    <el-row :hidden="!search" style="padding: 5px">
        <!-- 查询模块 -->
        <el-form :inline="true" :size="option.size" :model="query" @keyup.enter.native="searchChange">
          <template>
            <el-form-item label="提报日期">
              <el-date-picker
                v-model="query.submissionDateStr"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="进度" prop="business">
              <el-select
                v-model="query.goodsRate"
                clearable
                multiple
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
            <el-form-item label="产商">
              <el-input
                v-model="query.business"
                placeholder="请输入产商"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品">
              <el-input
                v-model="query.goodsName"
                placeholder="请输入商品名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品Id">
              <el-input
                v-model="query.id"
                placeholder="请输入商品ID"
              ></el-input>
            </el-form-item>
            <el-form-item label="发货地">
              <el-input
                v-model="query.placeDeliver"
                placeholder="请输入发货地"
              ></el-input>
            </el-form-item>
            <el-form-item label="条码" class="form-item">
              <el-select
                v-model="query.goodsCodeIsNull"
                clearable
                placeholder="请选择"
              >
                <el-option key="null" label="空" :value="true"> </el-option>
                <el-option key="notNull" label="非空" :value="false">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" v-if="!query.goodsCodeIsNull">
              <el-input
              @input="handleInput"
                v-model="query.goodsCodes"
                placeholder="请输入条码"
              ></el-input>
            </el-form-item>
            <el-form-item label="商链" size="small" class="form-item">
              <el-select
                v-model="query.goodsUrlIdIsNull"
                clearable
                placeholder="请选择"
              >
                <el-option key="null" label="空" :value="true"> </el-option>
                <el-option key="notNull" label="非空" :value="false">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核" class="form-item">
              <el-select
                v-model="query.auditing"
                clearable
                placeholder="请选择"
              >
                <el-option key="Y" label="Y" value="Y"> </el-option>
                <el-option key="N" label="N" value="N"> </el-option>
              </el-select>
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
</template>
<script>
export default {
    props:{
        search:{
            type:Boolean,
            default:true
        },
        option:{
            type:Object,
            default:()=>({})
        },
        rateOptions:{
            type:[],
            default:()=>[]
        },
        query:{
            type:Object,
            default:()=>({})
        }
    },
    methods:{
        searchReset(){
            this.$emit("searchReset")
        },
        handleInput(v){
          const pattern = new RegExp("[\u4E00-\u9FA5]+");
      let res = v.replace(pattern,'').replaceAll(' ',',').split(',');
      res = res.filter((value,i) =>value != '' || i != 0)
      this.query.goodsCodes = res.toString();
        },
        searchChange(){
            this.$emit("searchChange")
        }
    }
}
</script>