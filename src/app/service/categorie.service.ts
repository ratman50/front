import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../interface/response';
import { Categorie } from '../interface/categorie';
import { environment } from 'src/environments/environment';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieService  extends RestService<Categorie>{
  protected override uri(): string {
    return "categorie";
  }
  // constructor(private _http:HttpClient) { }
  // findByLibelle(libelle:string):Observable<Response<Categorie>>{
  //   return this._http.get<Response<Categorie>>(`${environment.url}/categorie/${libelle}`);
  // }
  // postCategorie(libelle:string):Observable<Response<Categorie>>{
  //   const headers={
  //     "Accept":"Application/json",
  //     "Content-type":"Application/json"
  //   };
  //   const body={
  //     "libelle":libelle
  //   }
  //   return this._http.post<Response<Categorie>>(`${environment.url}/categorie`,body,{headers:headers})
  // }
  // updateCategorie(cat:Categorie):Observable<Response<Categorie>>{
  //   return this._http.put<Response<Categorie>>(`${environment.url}/categorie/${cat.id}`,{libelle:cat.libelle},{headers:{
  //     "Accept":"Application/json",
  //     "Content-type":"Application/json"
  //   }});
  // }
  // all(url?:string):Observable<Response<Categorie>>{
  //   if(url)
  //     return this._http.get<Response<Categorie>>(`${url}`);
  //   return this._http.get<Response<Categorie>>(`${environment.url}/categories`);
  // }
  // handleStateCategorie(tab:number[]):Observable<Response<Categorie>>{
  //   const headers={
  //     "Accept":"Application/json",
  //     "Content-type":"Application/json"
  //   };
  //   const body={
  //     "ids":tab
  //   }
  //   return this._http.delete<Response<Categorie>>(`${environment.url}/categorie`,{headers:headers,body:body});
  // }
}
