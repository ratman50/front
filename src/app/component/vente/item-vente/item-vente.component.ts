import { Component, Directive, Input, OnInit } from '@angular/core';
import { IVente } from 'src/app/interface/vente';

@Component({
  selector: '[app-item-vente]',
  templateUrl: './item-vente.component.html',
  styleUrls: ['./item-vente.component.css']
})
export class ItemVenteComponent  implements OnInit{
  @Input() article!:IVente;
  confections:string="";
  ngOnInit(): void {
    console.log(this.article);
    this.confections=this.article.confection.reduce((acc:string,elt)=>`${acc}${elt.libelle}-${elt.stock};`,"")
    console.log(this.confections);
    
  }
  deleteArticle(event:Event){

  }
  fillForm(event:Event){
    
  }
}

