import request from '@/utils/request.js'

export const category1 = ()=>request.get(`/admin/product/getCategory1`)
export const category2 = (category1Id)=>request.get(`/admin/product/getCategory2/${category1Id}`)
export const category3 = (category2Id)=>request.get(`/admin/product/getCategory3/${category2Id}`)

12
export const getList = (page,limit,category3Id) => request.get(`/admin/product/${page}/${limit}`,{params:{category3Id}})
// export const getList =  (page, limit, category3Id) =>{
//     // return request.get(`/admin/product/${page}/${limit}`, {params: {category3Id}})

//     return request({
//       url: `/admin/product/${page}/${limit}`,
//       method: 'GET',
//       params: {category3Id}
//     })
//   }