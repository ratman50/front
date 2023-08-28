import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { IVente } from '../interface/vente';

@Injectable({
  providedIn: 'root'
})
export class VenteService extends RestService<IVente> {
  protected override uri(): string {
    return "vente";
  }
}
