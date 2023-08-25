import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { BehaviorSubject, elementAt } from 'rxjs';
import { Categorie } from 'src/app/interface/categorie';
import { Response, ResponseData } from 'src/app/interface/response';
import { CategorieService } from 'src/app/service/categorie.service';
enum Action{
  edit="edit",
  ajout="ajout"
}

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent  {
  response!:Response<ResponseData<Categorie>>;
  categoriesId:number[]=[];
  mode!:Action;
  checkAll:boolean=false;
  desactive:boolean=true;
  save:boolean=true;
  constructor(private _categorieSerive:CategorieService){}
  getCategories(url?:string){
    this._categorieSerive.all(url).subscribe({
      next:(response)=>{
        this.response=response;
        
      }
    })
  }
  handleCheckAll(event:Event){
    const target=event.target as HTMLInputElement;
    this.checkAll=target.checked;
    this.categoriesId=[];
    if(target.checked){
      this.categoriesId=this.response.data.categorie?.map(item=>item.id)!;
    }
    console.log(this.checkAll);
    
    
  }
  // searchByName(event:Event){
  //   const target=event.target as HTMLInputElement;
  //   this.desactive=true;
  //   if(target.value.length>3){
  //     this.desactive=false;
  //     this._categorieSerive.show(target.value).subscribe({
  //       next:res=>{
  //         if(res.data)
  //           this.desactive=true
  //       },
  //       error:console.log
  //     })
  //   };
    // }
    // addCategorie(target:HTMLInputElement){
    //   this._categorieSerive.postCategorie(target.value).subscribe({
    //     next:res=>{
    //       target.disabled=true;
    //       target.value="";
    //     }
    //   });  
    // }
    // console.log(this.find);
    
  // fillTabCategoriId(event:Event, checkingAll:HTMLInputElement){
  //   const target=event.target as HTMLInputElement;
  //   this.categoriesId.push(+target.value);
  //   if(!target.checked){
  //     this.categoriesId=this.categoriesId.filter(id=>id!==+target.value);
  //     checkingAll.checked=false;
  //   }else{
  //     checkingAll.checked=this.response.data.length==this.categoriesId.length;
  //     this.checkAll=checkingAll.checked;
      
  //   }
  //   console.log(this.checkAll);
    
    
  // }
  // handleAction(toggleButton:MatButtonToggleGroup){
  //   this.mode=toggleButton.value;
  // }
  // updateField(event:Event){
  //   const target=event.target as HTMLInputElement;
  //   console.log(target);
  //   const nextElement=target.nextElementSibling as HTMLButtonElement;
  //   console.log(nextElement);
    
  //   const id=target.id;
  //   const element:Categorie=this.response.data.find(el=>el.id==+id)!;
  //   nextElement.setAttribute("hidden","");
  //   if(element.libelle!==target.value && target.value.length>3)
  //     nextElement.removeAttribute("hidden");
    
  // }
  // ngOnInit(): void {
  //   this.getCategories();
  // }
  // ngOnDestroy(): void {
  // }
  // saveUpdate(event:Event){
  //   const target=event.target as HTMLButtonElement;
  //   const previousElement=target.previousElementSibling as HTMLInputElement;
  //   console.log(previousElement.id);
  //   const cat=this.response.data.find(el=>el.id==+previousElement.id)!;
  //   console.log(cat);
  //   if(previousElement.value.length>3 && previousElement.value!==cat.libelle)
  //   {
  //     console.log(previousElement.id,previousElement.value);
  //     this._categorieSerive.updateCategorie({id:+previousElement.id,libelle:previousElement.value}).subscribe({
  //       next:res=>{
  //         console.log(res);
  //         target.setAttribute("hidden",'');
  //       }
  //     });
      
  //   }
  //   // this._categorieSerive.updateCategorie()
  // }
  // deleteElement(event:Event){
  //   const target=event.target as HTMLButtonElement;
  //   console.log(this.categoriesId);
  //   this._categorieSerive.handleStateCategorie(this.categoriesId).subscribe({
  //     next:res=>{
  //       target.setAttribute("disabled",'');
  //     }
  //   })
    
  // }
  // changePage(url:string){
  //   this.checkAll=false;
  //   this._categorieSerive.all(url).subscribe({
  //     next:(res)=>{
  //       this.response=res;
  //     }
  //   })
  // }
}
