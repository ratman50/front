import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ResponseData } from '../interface/response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from "../interface/response";
import { Categorie } from '../interface/categorie';
@Injectable({
  providedIn: 'root'
})
export  abstract class RestService<T> {

  constructor(protected _http:HttpClient) { }
  protected abstract  uri():string;
  getData(url?:string):Observable<Response<ResponseData<T>>>{
    if(url)
      return this._http.get<Response<ResponseData<T>>>(`${url}`);
    return this._http.get<Response<ResponseData<T>>>(`${environment.url}/${this.uri()}`);
  }
  all(url?:string){
    return this.getData(url).pipe(tap(
      response=>console.log(response)));
  }
  store(element:T):Observable<Response<T>>{
    
    return this._http.post<Response<T>>(`${environment.url}/${this.uri()}`,{...element},
    {headers:{
      "Accept":"Application/json",
      "Content-type":"Application/json"

    }});
  }
   update(element:T):Observable<Response<T>>{
    
    return this._http.put<Response<T>>(`${environment.url}/${this.uri()}`,{element},
    {headers:{
      "Accept":"Application/json",
      "Content-type":"Application/json"

    }});
  }
  delete(id:string){
    return this._http.delete(`${environment.url}/${this.uri()}/${id}`,{headers:{
      "Accept":"Application/json",
      "Content-type":"Application/json"

    }});
  }
  show(libelle:string):Observable<Response<T[]>>{

    return this._http.get<Response<T[]>>(`${environment.url}/${this.uri()}/${libelle}`);
  }


}
