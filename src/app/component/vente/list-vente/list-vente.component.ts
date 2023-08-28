import { Component, Input, OnInit } from '@angular/core';
import { IVente } from 'src/app/interface/vente';

@Component({
  selector: 'app-list-vente',
  templateUrl: './list-vente.component.html',
  styleUrls: ['./list-vente.component.css']
})
export class ListVenteComponent implements OnInit {
@Input() articles:IVente[]=[]

ngOnInit(): void {
  console.log(this.articles);
  
}
}
