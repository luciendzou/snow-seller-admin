export interface Categories {
  id?:string,
  iduser?:string,
  idParent?:string,
  nameCat?:string,
  description_cat?:string,
  imgCat?:string,
  actived?:boolean,
}

export interface Products {
  product_id?:string,
  souscat_id?:string,
  provider_id?:string,
  users_id?:string,
  title?:string,
  price?:string,
  tags?:string,
  description?:string,
  summary?:string,
  state?:string,
  interview?:string,
  stock?:string,
  image?:string,
  code_product?:string,
  created_at?:any,
}
