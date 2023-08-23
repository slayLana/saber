/*
 * @Description: 
 * @Author: LiangTao
 * @Date: 2022-10-10 09:59:25
 * @LastEditTime: 2022-10-21 23:14:39
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
      label: "下单日期",
      prop: "orderDate",
      width: 90,
    },
    {
      label: "货品Id",
      prop: "skuId",
      width:65
    },
    {
      label: "产商",
      prop: "business",
    },
    {
      label: "商品名称",
      prop: "goodsName",
      showOverflowTooltip:true,
    },
    {
      label: "颜色规格",
      prop: "goodsColor",
      width:120,
      showOverflowTooltip:true,
    },
    {
      label: "数量",
      prop: "goodsNumber",
      width:55
    },
    {
      label: "单价",
      prop: "goodsPrice",
      width:55
    },
    {
      label: "总价",
      prop: "totalPrice",
      width:55
    },
    {
      label: "到货/出货时间",
      prop: "arrivalDate",
      width: 100
    },
    {
      label: "状态",
      prop: "operate",
    },
    {
      label: "出货对象",
      prop: "out_target",
    },
    {
      label: "备注",
      prop: "remark",
    }
    
  ]
}
