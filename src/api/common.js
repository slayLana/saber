/*
 * @Description: 
 * @Author: LiangTao
 * @Date: 2022-09-06 14:22:34
 * @LastEditTime: 2022-10-15 15:47:53
 * @LastEditors: LiangTao
 * @Reference: 
 */
import request from "@/router/axios";

/**
 * 文件流返回
 * @param url 接口地址
 */
export const exportBlob = (url,params = null) => {
  return request({
    url: url,
    method: 'get',
    params:params,
    responseType: 'blob'
  })
}
