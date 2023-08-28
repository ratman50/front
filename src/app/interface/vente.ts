import { Categorie } from "./categorie";

export interface IVente {
    libelle:string,
    categorie:Categorie,
    promo:number,
    confection:Categorie[],
    reference:string,
    path:string,
    marge:number
}
