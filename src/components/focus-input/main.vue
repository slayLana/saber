
<template>
  <div class="focus-input" @dblclick="onDivClick">
    <!-- 默认状态 -->
    <template v-if="getStatus()"> 
      <!-- <span v-if="value" class="focus-input__placeholder">
        {{ value }}
      </span> -->
      <component :is="commentOption.name" v-if="value || value === 0" class="focus-input__placeholder"
      :style="mystyle"
      @click="handleClick"
      :size="commentOption.size"
      :type="commentOption.type" :icon="commentOption.icon">
      {{value}}
      </component>
      <span v-else class="focus-input__placeholder " style="color:#ccc">
        {{placeholder}}
      </span>
      
      <!-- <template v-else>
        <slot name="default" v-bind="currentOption">
          <span v-html="computedModelValue"></span>
        </slot>
      </template> -->
    </template>
    <component
      :is="inputType"
      v-if="openEdit && !getStatus()"
      ref="inputRef"
      v-bind="$attrs"
      :format="datePickOptions.format"
      :value-format="datePickOptions.format"
      :disabled="disabled"
      v-model="value"
      :clearable="clearable"
      :placeholder="placeholder"
      @blur="onBlur"
      @focus="onFocus"
      @keyup.enter.native="onEnter"
      @change="dateChange"
      @clear="clearInput"
    >
    <template v-if="inputType == 'el-select'">
    <el-option
                    @click.native="clickOption"
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                  </template>
    </component>
  </div>
</template>
<script>
import {  nextTick } from "vue";
export default {
  name: "focusInput",
  props: {
    commentOption:{
      type:[Object],
      default:() => ({
        name:'span',
        size:'small',
        icon:null,
        type:'text',
        openCopy:false,
        copySuccess:() => {}
      })
    },
    mystyle:{
      type:[Object],
      default:()=>({
        
      })
    },
    clearable:{
      type:Boolean,
      default:true
    },
    openEdit:{
      type: Boolean,
      default: false,
    },
    //分割线
    disabled: {
      type: Boolean,
      default: false,
    },
    value:{
      type: [String, Number],
      default: null,
    },
    modelValue: {
      type: [String, Number],
      default: null,
    },
    selectOptions: {
      type:[Object],
      default:()=>({
        
      })
    },
    inputType: {
      type: String,
      default: "el-input",
    },
    placeholder: {
      type: String,
      default: null,
    },
    scoreInput: {
      type: Boolean,
      default: false,
    },
    datePickOptions:{
      type:[Object],
      default:()=>({})
    },
    isTextarea: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      focusing:false,
      optionShow:false,
      format:"yyyy-MM-dd",
      oldValue:'',
      tmpTimeout:null,
    };
  },
  mounted(){
  },
  computed: {
    isInput() {
      return this.inputType == "el-input";
    },
    isDataPick(){
      return this.inputType == "el-date-picker";
    },
    isSelect(){
      return this.inputType == "el-select";
    },
    computedModelValue() {
      if (this.isInput) {
        return this.modelValue;
      }
      return null;
    },
  },
  methods: {
    onDivClick(event) {
      if (!this.openEdit) {
        return;
      }
      if (this.focusing) {
        return;
      }
      this.focusing = true;
      this.oldValue = this.value
      // if (this.isInput || this.isSelect) {
        nextTick(() => {
          this.$refs.inputRef.focus();
          this.$refs.inputRef.handleFocus &&
          this.$refs.inputRef.handleFocus(event);
          this.$emit('openEdit')
        });
      // }
    },
    onFocus(){
      
      
    },
    onBlur() {
      // debugger
      console.log(22222,this.oldValue,this.value)
        this.tmpTimeout = setTimeout(()=>{
        if(this.isInput || this.isSelect  || this.isDataPick){
        if(this.oldValue != this.value){
          this.$emit('myOnBlur',this.value,true) 
        }
        else{
          this.$emit('myOnBlur',this.value,false)
        }
          this.focusing = false;
          this.tmpTimeout = null
          return
        }
      },300)
    },
    clearInput(){
      clearTimeout(this.tmpTimeout)
      this.$emit('clear')
      // this.$refs.inputRef.blur()
      this.$refs.inputRef.focus()
      // this.tmpTimeout = null;
    },
    onEnter(){
      this.$refs.inputRef.blur();
    },
    getStatus() {
      // return this.open;
      if (this.scoreInput) {
        return this.disabled;
      } else {
        return !this.focusing;
      }
    },
    clickOption(bol){
      console.log("111",bol)
      clearTimeout(this.tmpTimeout)
      //bug，这里要重新失去焦点再获取，仅获取焦点的话，会导致之后blur事件不能正常触发
      this.$refs.inputRef.blur()
     this.$refs.inputRef.focus() 
      // @visible-change="clickOption"
      
    },
    dateChange(v){
      console.log(v)
    },

    handleClick(){
      this.$emit('myclick',this.value)
    },
    copySuccess(){
      this.$message({
        message: "复制成功",
        type: "success",
      })
    }
  },
}
</script>

<style lang="scss">
.basic-block {
  opacity: 0;

  box-sizing: border-box;
  color: #fff;
  animation: mymove 1s;
  animation-fill-mode: forwards;
  .box {
    position: relative;
    box-sizing: border-box;
    padding: 15px;
    width: 100%;
    height: 100%;
    transition: all 1s;
    background-size: cover;
    &:hover {
      transform: rotateY(360deg);
    }
  }

  a {
    color: #fff;
  }
  span {
    display: block;
    font-size: 16px;
  }
  p {
    width: 80%;
    font-size: 10px;
    color: #eee;
    line-height: 22px;
  }
  i {
    position: absolute;
    bottom: 15px;
    right: 15px;
    font-size: 50px !important ;
  }
  @keyframes mymove {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
