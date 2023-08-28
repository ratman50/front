import { Form, FormArray, FormControl } from "@angular/forms";
import { Categorie } from "./categorie";
import { Fournisseur } from "./fournisseur";
import { IImage, Ilink } from "./response";


export interface IArticle{
    id:number|null,
    libelle:string,
    prix_unitaire:number,
    fournisseur:Fournisseur[],
    path:IImage,
    reference:string,
    categorie:Categorie,
    stock:number,

}
export interface IELement{
    id?:number,
    libelle:string,
    quantite:number
  }