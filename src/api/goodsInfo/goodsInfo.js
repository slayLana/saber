/*
 * @Description: 
 * @Author: LiangTao
 * @Date: 2022-10-10 14:47:26
 * @LastEditTime: 2022-10-11 11:41:27
 * @LastEditors: LiangTao
 * @Reference: 
 */
import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-goodsInfo/goodsInfo/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/blade-goodsInfo/goodsInfo/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-goodsInfo/goodsInfo/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-goodsInfo/goodsInfo/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-goodsInfo/goodsInfo/submit',
    method: 'post',
    data: row
  })
}

