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
