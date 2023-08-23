export default {
  size: 'small',
  expand: true,
  index: true,
  border: true,
  selection: true,
  column: [
    {
      label: "商品id",
      prop: "id",
      fixed:true,
      width:80,
      edit:false,
      sortable:'custom',
      comment:{
        name:'el-button',
        openCopy:true,
        size:'small',
        type:'text',
        onclick:'copyInfo'
      }
    },
    
    {
      label: "商品名称",
      prop: "goodsName",
      fixed:true,
      showOverflowTooltip:true,
      width:105,
      edit:false,
      type:'expand',
      comment:{
        name:'el-button',
        openCopy:true,
        size:'small',
        type:'text',
        onclick:'expandRow',
        style:'styleButton'
      }
    },
    
    
    {
      label: "产商",
      prop: "business",
      fixed:true,
      showOverflowTooltip:true,
      width:75,
      edit:false,
      comment:{
        name:'span',
        openCopy:true,
        size:'small',
        type:'text'
      }
    },
    {
      label: "图片",
      prop: "goodsImage",
      width:70,
      fixed:true,
    },
    {
      label: "SKU",
      prop: "goodsColor",
      fixed:true,
      showOverflowTooltip:true,
      width:75,
      edit:false,
      comment:{
        name:'span',
        openCopy:true,
        size:'small',
        type:'text'
      }
    },
    {
      label: "提报日期",
      prop: "submissionDate",
      width: 100,
      sortable:true,
      edit:true,
      inputType:'el-date-picker',
      datePickOptions:{
        format:"yyyy-MM-dd",
        valueFormat:"yyyy-MM-dd",
      }
    },
    {
      label: "商品条码",
      prop: "goodsCode",
      width: 110,
      edit:true,
      filters:[{text:'全部',value:'all'},{text:'(空)',value:'isNull'}],
      comment:{
        name:'el-button',
        openCopy:true,
        size:'small',
        type:'text',
        onclick:'copyInfo'
      }
    },
    {
      label: "进度",
      prop: "goodsRate",
      width: 90,
      edit:true,
      inputType:'el-select',
      selectOptions: [
        {
          value: "寻源中",
          label: "寻源中",
          color:'#fab132'
        },
        {
          value: "有价格",
          label: "有价格",
          color:'#f5eb3f'
        },
        {
          value: "有样品",
          label: "有样品",
          color:"#bdd86e"
        },

        {
          value: "有完整图片",
          label: "有完整图片",
          color:"#8ec974"
        },
        {
          value: "待采购",
          label: "待采购",
          color:'#e6cb37'
        },
        {
          value: "供货中",
          label: "供货中",
          color:"#78b3b0"
        },
        {
          value: "返单中",
          label: "返单中",
          color:"#17abe1"
        },
        {
          value: "销售中",
          label: "销售中",
          color:"#74d1ee"
        },
        {
          value: "回本期",
          label: "回本期",
          color:"#806eaf"
        },
        {
          value: "盈利期",
          label: "盈利期",
          color:"#fb66a8"
        },
        {
          value: "审核未通过",
          label: "审核未通过",
          color:"#fc7717"
        },
        {
          value: "不再补货",
          label: "不再补货",
          color:"#ccc"
        },
      ],
      comment:{
        name:'span',
        style:'goodsRateStyle'
      }
    },
    {
      label: "库存",
      prop: "goodsNumber",
      width:65
    },
    {
      label: "尺寸",
      prop: "goodsSize",
      width:65,
      edit:true
    },
    {
      label: "克重",
      prop: "goodsWeightK",
      width:55,
      edit:true
    },
    {
      label: "包装",
      prop: "pack",
      width:55,
      edit:true,
      inputType:'el-select',
      selectOptions:[{
        label:'有',
        value:'有'
      },{
        label:'无',
        value:'无'
      }]
    },
    {
      label: "发货地",
      prop: "placeDeliver",
      width:65,
      edit:true
    },
    {
      label: "进价",
      prop: "buyingPrice",
      width:65,
      edit:true,
    },
    {
      label: "利润率",
      prop: "profitRate",
      width:65,
      edit:true
    },
    {
      label: "销量分层",
      prop: "salesVolumLevel",
      width:85,
      edit:true,
      inputType:'el-select',
      selectOptions:[{
        label:'S',
        value:'S'
      },{
        label:'A',
        value:'A'
      },{
        label:'B',
        value:'B'
      },{
        label:'C',
        value:'C'
      },{
        label:'D',
        value:'D'
      },{
        label:'P',
        value:'P'
      }]
    },
    {
      label: "出价",
      prop: "offerPrice",
      width:65,
      tooltip:true,
      comment:{
        name:'el-button',
        type:'text',
        size:'small',
        onclick:'handleOfferPrice'
      }
    },
    {
      label: "报价",
      prop: "quotePrice",
      width:65,
      edit:true
    },
    {
      label: "审核",
      prop: "auditing",
      width:65,
      edit:true,
      inputType:'el-select',
      clearable:true,
      selectOptions:[{
        label:'Y',
        value:'Y'
      },{
        label:'N',
        value:'N'
      }]
    },
    {
      label: "备注",
      prop: "remark",
      showOverflowTooltip:true,
      edit:true
    },
  ]
}
