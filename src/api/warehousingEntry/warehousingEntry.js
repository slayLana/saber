/*
 * @Description: 
 * @Author: LiangTao
 * @Date: 2022-10-10 09:59:25
 * @LastEditTime: 2022-10-13 12:37:24
 * @LastEditors: LiangTao
 * @Reference: 
 */
import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-warehousingEntry/warehousingEntry/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const getGoodsInfo = (id) => {
  return request({
    url: '/api/blade-goodsInfo/goodsInfo/detail',
    method: 'get',
    params: {
      id
    }
  })
}
export const getDetail = (id) => {
  return request({
    url: '/api/blade-warehousingEntry/warehousingEntry/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-warehousingEntry/warehousingEntry/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-warehousingEntry/warehousingEntry/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-warehousingEntry/warehousingEntry/submit',
    method: 'post',
    data: row
  })
}

