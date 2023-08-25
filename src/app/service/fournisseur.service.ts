import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Fournisseur } from '../interface/fournisseur';
import { environment } from 'src/environments/environment';
import { Response } from '../interface/response';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor(private _http:HttpClient) { }
  all():Observable<Response<Fournisseur>>{
    return this._http.get<Response<Fournisseur>>(`${environment.url}/fournisseur`);
  }
  show(libelle:string):Observable<Response<Fournisseur[]>>{
    return this._http.get<Response<Fournisseur[]>>(`${environment.url}/fournisseur/${libelle}`);
  }
}
