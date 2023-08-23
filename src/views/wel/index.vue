<template>
  <div>
    <el-row>
      <el-col :span="24">
        <third-register></third-register>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <basic-container>
          小工具
          <!-- <p style="text-align: center">
            <img src="https://img.shields.io/badge/Release-V3.0.1-green.svg" alt="Downloads"/>
            <img src="https://img.shields.io/badge/JDK-1.8+-green.svg" alt="Build Status"/>
            <img src="https://img.shields.io/badge/Spring%20Cloud-2021-blue.svg" alt="Coverage Status"/>
            <img src="https://img.shields.io/badge/Spring%20Boot-2.7-blue.svg" alt="Downloads"/>
            <a target="_blank" href="https://bladex.vip">
              <img src="https://img.shields.io/badge/Saber%20Author-Small%20Chill-ff69b4.svg" alt="Downloads"/>
            </a>
            <a target="_blank" href="https://bladex.vip">
              <img src="https://img.shields.io/badge/Copyright%20-@BladeX-%23ff3f59.svg" alt="Downloads"/>
            </a>
          </p> -->
        </basic-container>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <basic-container>
          pdf转word
          <el-upload
            class="upload-demo"
            drag
            :beforeUpload="beforeUpload"
            accept=".pdf"
            ref="pdf2docx"
            :http-request="uploadFile"
            :headers="headers"
            :show-file-list="false"
            action=""
            multiple
            :on-success="download"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传pdf文件，且不超过30MB
            </div>
          </el-upload>
        </basic-container>
      </el-col>
      <el-col :span="8">
        <el-row>
          <basic-container> </basic-container>
        </el-row>
        <el-row>
          <basic-container> </basic-container>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { downloadXls } from "@/util/util";
import request from "@/router/axios";
import store from "../../store";
export default {
  name: "wel",
  data() {
    return {
      headers: {
        "Blade-Auth": "Bearer " + store.getters.token,
      },
      activeNames: ["1", "2", "3", "5"],
      logActiveNames: ["28"],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    handleChange(val) {
      window.console.log(val);
    },
    uploadFile(params) {
      console.log(params.file);
      const form = new FormData();
      let name = params.file.name;
      name = name.replace(".pdf", ".docx");
      form.append("file", params.file);
      request({
        url: "/api/blade-goodsInfo/goodsInfo/pdf2doc",
        method: "post",
        data: form,
        responseType: "blob",
      }).then((res) => {
        this.$refs.pdf2docx.clearFiles();
        downloadXls(res.data, name);
      });
    },
    beforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);

      const whiteList = ["pdf"];

      if (!whiteList.includes(fileSuffix)) {
        this.$message.error("上传文件只能是 pdf格式");
        return false;
      }

      const isLt2M = file.size / 1024 / 1024 < 30;

      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 30MB");
        return false;
      }
    },
  },
};
</script>

<style>
.el-font-size {
  font-size: 14px;
}
</style>

