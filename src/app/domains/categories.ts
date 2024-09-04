export interface Categories {
  id?:number,
  user_id?:number,
  name_cat?:string,
  description_cat?:string,
  image?:string,
  statut?:string
}

export interface SousCategories {
  id?:number,
  cat_id?:number,
  name_cat?:string,
  statut?:string
}

export interface Products {
  product_id?:number,
  souscat_id?:number,
  provider_id?:number,
  users_id?:number,
  title?:string,
  price?:number,
  tags?:string,
  description?:string,
  summary?:string,
  state?:number,
  interview?:number,
  stock?:number,
  image?:string,
  code_product?:string
  created_at?:string,
  updated_at?:string,
  name_provider?:string,
  name_cat?:string,
}
