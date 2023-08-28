import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';
import { ConfectionComponent } from './confection/confection.component';
import { FormVenteComponent } from './form-vente/form-vente.component';
import { Categorie } from 'src/app/interface/categorie';
import { FormBuilder } from '@angular/forms';
import { VenteService } from 'src/app/service/vente.service';
import { IVente } from 'src/app/interface/vente';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent  implements OnInit{
  @ViewChild(FormVenteComponent,{static:false}) FormVente:FormVenteComponent=<FormVenteComponent>{};
  constructor(private _confection$:ArticleService,private _venteService:VenteService){}
  
  handleValSearch(op:{value:string,element:number}){
    this._confection$.show(op.value).subscribe({
      next:res=>{
        let restData=res.data;
        const result=[...this.FormVente.allComponents.values()]
        .filter(component=>res.data.find(element=>element.libelle.startsWith(component.instance.libelle?.value)))
        .map(tmp=>tmp.instance.libelle?.value);
        ;
        
        if(result.length>1)
        {
          restData=res.data.filter(tmp=>result[0]!==tmp.libelle);
        }
          
        this.FormVente.allComponents.get(op.element.toString())!.instance.resultSearch=restData;
      }
    })
    
  }
  searchLibelleVente(value:string){
    this._venteService.show(value).subscribe({
      next:res=>{
        if(res.data){
          this.FormVente.articleExist=res.data
        }

      }
    })

    
  }
  // addConfection(categorie:Categorie){
  //   console.log(categorie);
  //   this.FormVente.confections?.setValue([...this.FormVente.confections?.value,categorie]);
  //   // this.FormVente.confections;
  //   console.log(this.FormVente.confection.reset());
    
    
  // }
  addVente(vente:IVente){
    this._venteService.store(vente).subscribe({
      next:res=>{
        console.log(res);
        
      }
    })
  }
  ngOnInit(): void {
    this._venteService.getData().subscribe({
      next:res=>{
        console.log(res.data.article.data);
        this.FormVente.informationForm=res.data;
      }
    })
  }
}
