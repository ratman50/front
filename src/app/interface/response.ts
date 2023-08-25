import { IArticle } from "./article"
import { Categorie } from "./categorie"
import { Fournisseur } from "./fournisseur"

export interface Response <T>{
    data:T,
    message:string
  

}
export interface ResponsePaginate<T>{
    data:T[],
    links:Ilink[],

}
export interface Ilink{
    url: string
	label: string,
	active: boolean
}

export interface ResponseData<T>{
    fournisseur?:Fournisseur[],
    categorie?:Categorie[],
    article:ResponsePaginate<T>,
    total?: (Categorie & {total:number})[]
}
export interface IImage{
    name:string,
    codage:ArrayBuffer|string|null
  }
  