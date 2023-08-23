/*
 * @Description: 
 * @Author: LiangTao
 * @Date: 2022-10-12 13:54:18
 * @LastEditTime: 2022-10-12 14:04:07
 * @LastEditors: LiangTao
 * @Reference: 
 */
export default {
  size: 'small',
  expand: false,
  index: true,
  border: true,
  selection: true,
  column: [
    {
      label: "日期时间",
      prop: "createDate",
      display: false,
      search: true,
    },
    {
      label: "阿里商品id",
      prop: "aliGoodsId",
      display: false,
      search: true,
    },
    {
      label: "阿里商品图片",
      prop: "aliGoodsImg",
      display: false,
    },
    {
      label: "累计订单",
      prop: "totalOrder",
      display: false,
    },
  ]
}
