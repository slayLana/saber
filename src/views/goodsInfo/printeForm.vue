<template>
  <el-dialog
    :title="title"
    :visible.sync="box"
    width="50%"
    :before-close="beforeClose"
    append-to-body
  >
    <el-form :size="option.size" ref="form" label-width="80px">
      <el-form-item label="运单号" prop="number">
        <el-input
          @input="handleInput"
          placeholder="请输入内容"
          v-model="number"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <!-- 表单按钮 -->
    <span v-if="!view" slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        icon="el-icon-circle-check"
        :size="option.size"
        @click="handleSubmit"
        >打 印</el-button
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
export default {
  data() {
    return {
      number: "",
    };
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    box: {
      type: Boolean,
      default: false,
    },
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.checkLodop();
  },
  methods: {
    checkLodop() {
      try {
        const LODOP = window.getLodop();
        if (LODOP && LODOP.VERSION) {
          if (LODOP.CVERSION) {
            this.printInstalled = true;
            console.log(
              "当前有WEB打印服务C-Lodop可用!\n C-Lodop版本:" +
                LODOP.CVERSION +
                "(内含Lodop" +
                LODOP.VERSION +
                ")"
            );
          } else {
            this.printInstalled = true;
            console.log(
              "本机已成功安装了Lodop控件！\n 版本号:" + LODOP.VERSION
            );
          }
        } else {
          this.printErrorMessage = window.LODOP_ERROR_MESSAGE || "";
        }
      } catch (err) {
        console.log(err);
        this.printErrorMessage = window.LODOP_ERROR_MESSAGE || "";
      }
    },
    beforeClose(done) {
      done();
      this.$emit("closeBox", "printBox");
    },
    closeBox() {
      this.box = false;
      this.number = "";
      this.$emit("closeBox", "printBox");
    },
    handleSubmit() {
      console.log("printe");
      const LODOP = window.getLodop();
      LODOP.PRINT_INIT("");
      LODOP.SET_PRINT_PAGESIZE(2, "76mm", "130mm", "");
      if (this.number != "") {
        let numberList = this.number.split(",");
        for (let num of numberList) {
          // let printStr = `<!DOCTYPE html>`;
          // printStr += `<body>`;
          // printStr += `
          //       <div style="font-size:24pt;text-align:center;font-family:sans-serif">${num}</div>`
          // printStr += `</body></html>`;
          LODOP.ADD_PRINT_TEXT(
            "5mm",
            "10mm",
            "98%",
            "98%",
            "义乌市栩清进出口有限公司"
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
          // LODOP.ADD_PRINT_BARCODE(55, 25, "50%", "20%", "128B", num);
          LODOP.ADD_PRINT_BARCODE("15mm", "10mm", '115mm', "40mm", "128B", num);
          LODOP.SET_PRINT_STYLEA(0, "QRCodeVersion", 7);
          // LODOP.ADD_PRINT_BARCODE(88,32,206,78,"128B",num);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 17); //设置上面这个条码下方的文字字体大小
          // LODOP.SET_PRINT_STYLEA(0,"FontName","华文行楷");
          // LODOP.SET_PRINT_STYLEA(0,"Color","#FF0000");//设置当前条码以及条码下方字体的颜色
          LODOP.SET_PRINT_STYLEA(0, "ShowBarText", 0); //设置是否显示下方的文字

          LODOP.SET_PRINT_STYLEA(0, "AlignJustify", 2);
          LODOP.ADD_PRINT_TEXT("56mm", "30mm", "98%", "98%", num);
          LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
          LODOP.SET_PRINT_STYLEA(0,"FontName","sans-serif");
          // LODOP.ADD_PRINT_HTM("200pt","10mm",'138mm', "40mm", printStr)
          // LODOP.SET_PRINT_STYLEA(0,"Vorient",2)
          LODOP.NewPage(); //创建新的页，实现多页打印
        }
        LODOP.PREVIEW();
      }
    },
    handleInput(v) {
      const pattern = new RegExp("[\u4E00-\u9FA5]+");
      let res = v.replace(pattern, "").replaceAll(" ", ",").split(",");
      res = res.filter((value, i) => value != "" || i != 0);
      this.number = res.toString();
    },
  },
};
</script>