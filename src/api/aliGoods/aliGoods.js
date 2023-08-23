/*
 * @Description: 
 * @Author: LiangTao
 * @Date: 2022-10-12 13:54:49
 * @LastEditTime: 2022-10-12 14:08:44
 * @LastEditors: LiangTao
 * @Reference: 
 */
import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-aliGoods/aliGoods/list',
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
    url: '/api/blade-aliGoods/aliGoods/detail',
    method: 'get',
    params: {
      id
    }
  })
}
export const updateData = (ids) => {
  return request({
    url: '/api/blade-aliGoods/aliGoods/updateData',
    method: 'post',
    params: {
      ids
    }
  })
}
export const remove = (ids) => {
  return request({
    url: '/api/blade-aliGoods/aliGoods/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-aliGoods/aliGoods/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-aliGoods/aliGoods/submit',
    method: 'post',
    data: row
  })
}

