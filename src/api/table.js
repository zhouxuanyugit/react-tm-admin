import request from '@/utils/request'
export function getTableList(data) {
  return request({
    url: '/illness/getIllnessList',
    method: 'post',
    data
  })
}

export function deleteItem(data) {
  return request({
    url: '/table/delete',
    method: 'post',
    data
  })
}
export function editItem(data) {
  return request({
    url: '/table/edit',
    method: 'post',
    data
  })
}