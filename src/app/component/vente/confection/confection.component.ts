import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { IArticle, IELement } from 'src/app/interface/article';
import { Categorie } from 'src/app/interface/categorie';

@Component({
  selector: 'app-confection',
  templateUrl: './confection.component.html',
  styleUrls: ['./confection.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class ConfectionComponent implements OnInit,AfterViewInit,OnDestroy {
  @Output() confectionEmitter:EventEmitter<string>=new EventEmitter();
  @Output() confectionFormEmitter:EventEmitter<IELement>=new EventEmitter();
   reference:number=0;
   val:any;
  @ViewChild('input',{static:true}) input!:ElementRef;
  resultSearch:IArticle[]=[];
  ConfectionForm:FormGroup=<FormGroup>{};
  isOK:boolean=true;
  constructor(private _fb:FormBuilder){

  }
  ngAfterViewInit(): void {
    this.input.nativeElement.setAttribute("list","dataListOptions"+this.reference)
  }
  ngOnDestroy(): void {
  }
  handleAutoComplete(event:Event){
    const target=event.target as HTMLInputElement;
    this.resultSearch=[];
    this.quantite?.disable();
    if(target.value.length>=2){
      this.confectionEmitter.emit(target.value);
      if(this.libelle?.valid){
        this.quantite?.enable();
        setTimeout(()=>{

          this.id?.setValue(this.resultSearch.find(elemt=>elemt.libelle==this.libelle?.value)?.id )
        },20)
      }

    }
    
  }
  checkConfectionArticleExist():ValidatorFn{
    return (control:AbstractControl):ValidationErrors|null=>{
      const value=control.value;
      if(!value )
        return null;
      
      return !(this.resultSearch.find(elemt=>elemt.libelle==value.trim()) ) ?{exist:true}:null;
    }
  }
  checkQuantiteIsOk():ValidatorFn{
    return(control:AbstractControl):ValidationErrors|null=>{
      const value=control.value;
      return !(value>0)  ?{quantite:true}:null;

    }
  }
  update(element:IELement){
    this.ConfectionForm.patchValue(element)
  }
  get libelle(){return this.ConfectionForm.get("libelle")}
  get quantite(){return this.ConfectionForm.get("quantite")}
  get id(){return this.ConfectionForm.get("id")}
  ngOnInit(): void {
    this.ConfectionForm=this._fb.group({
      "id":['',[]],
      "libelle":["",[Validators.required, this.checkConfectionArticleExist()]],
      "quantite":[{value:'1',disabled:true},[Validators.required,this.checkQuantiteIsOk()]]
    });
  }
  
}
