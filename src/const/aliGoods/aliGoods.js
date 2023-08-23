/*
 * @Description: 
 * @Author: LiangTao
 * @Date: 2022-10-12 13:54:49
 * @LastEditTime: 2022-10-12 16:13:56
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
      label: "商品id",
      prop: "id",
      search: true,
    },
    {
      label: "订单数",
      prop: "totalOrder",
      display: false,
    },
    {
      label: "图片",
      prop: "image",
      display: false,
    },
  ]
}
