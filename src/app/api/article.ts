import { request } from "@/service";

const baseUrl = "/apis";
export const getCategoryData = () => {
  return request.get(baseUrl + "/api/category/list")
};

export const getArticleData = (typeId: number) => {
  return request.get(baseUrl + "/api/article/list?categoryId="+ typeId)
};

export const getArticleDetail = (id: number | string) => {
  console.log(id, 222)
  return request.get(baseUrl + "/api/article/detail/" + id)
};