import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IArticle } from 'src/app/interface/article';
import { Categorie } from 'src/app/interface/categorie';
import { Fournisseur } from 'src/app/interface/fournisseur';
import { Response, ResponseData, ResponsePaginate } from 'src/app/interface/response';
import { ArticleService } from 'src/app/service/article.service';
import { FormArticleComponent } from './form-article/form-article.component';
import { FournisseurService } from 'src/app/service/fournisseur.service';
import { Observable, elementAt, filter, map, of } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  response!:Response<ResponseData<IArticle>>;
  isAdded:boolean=false;
  fournisseur$!:Observable<Fournisseur[]>;
  categorie$!:Observable<Categorie[]>;
  articles!:IArticle[];
  @ViewChild(FormArticleComponent,{static:false}) FormArticle!:FormArticleComponent;
  constructor(public _articleSerive$:ArticleService, private _fournisseurService:FournisseurService){}
  ngOnInit(){
   this._articleSerive$.all().subscribe({
    next:res=>{
      this.fournisseur$=of(res.data.fournisseur!);
      this.categorie$=of(res.data.categorie!);
      this.articles=res.data.article.data;
      this.response=res;
      
    }
   })
  }
  handleUpdate(article:IArticle, formArticle:FormArticleComponent){
    console.log(article);
    formArticle.articleForm.patchValue(article,{onlySelf:false});
    formArticle.valueButton="modifier";
    console.log(formArticle.articleForm.value);
    
    
  }
 
  changePage(url:string){
    this._articleSerive$.all(url).subscribe({
      next:(res)=>{
        // this.response=res;
      },
      error:err=>{
      }
    })
  }
  handleDelete(el:string){
    console.log(el);
    this._articleSerive$.delete(el).subscribe(res=>{
      console.log(res);
      
    })
    
  }
  searchFournisseur(fournisseur:string){
    console.log(fournisseur);
    this._fournisseurService.show(fournisseur.trim()).subscribe({
      next:res=>{
       console.log(this.FormArticle.fournisseur?.value);
        
        this.FormArticle.resultFournisseur=res.data
          .filter(item=>!(this.FormArticle.fournisseur?.value.map((element:Fournisseur)=>element.id).includes(item.id)))
        

      },
      error:console.log
      
    })
    
  }
  searchArticle(article:string){
    console.log(article);
    
  }
  addArticle(elemnt:FormGroup){
    this.isAdded=false;
    
    this._articleSerive$.store(elemnt.value).subscribe({
      next:res=>{
        console.log(res);
        this.isAdded=true
      },
      error:err=>{
        console.log(err);
        
      }
    })
    
  }



}
