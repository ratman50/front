import { AfterViewInit, Component, ComponentRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ConfectionComponent } from '../confection/confection.component';
import { Categorie } from 'src/app/interface/categorie';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ResponseData } from 'src/app/interface/response';
import { IVente } from 'src/app/interface/vente';
import { ImageServiceService } from 'src/app/service/image-service.service';
import { environment } from 'src/environments/environment.development';
import { IELement } from 'src/app/interface/article';

@Component({
  selector: 'app-form-vente',
  templateUrl: './form-vente.component.html',
  styleUrls: ['./form-vente.component.css']
})
export class FormVenteComponent implements OnInit,AfterViewInit {
  @Output() valueLibelleSearch:EventEmitter<{value:string,element:number}>=new EventEmitter();
  @Output() articleVenteLibelle:EventEmitter<string>=new EventEmitter();
  @Output() VenteFormEmitter:EventEmitter<IVente>=new EventEmitter();
  confectionsElements:number[]=[1];
  informationForm:ResponseData<IVente>=<ResponseData<IVente>>{};
  @ViewChild(ConfectionComponent) confection:ConfectionComponent=<ConfectionComponent>{};
  @ViewChild("container",{read:ViewContainerRef,static:true}) container:ViewContainerRef=<ViewContainerRef>{};
  allComponents=new Map<string,ComponentRef<ConfectionComponent>>();
  promoIsChecked=false;
  position:number=1;
  cout:number=0;
  VenteForm:FormGroup=<FormGroup>{};
  articleExist:IVente[]=[];
  categorieRequired:string[]=[
    "boutons",
    "fil",
    "tissu"
  ];
  default=environment.image_url;
  constructor(private _fb:FormBuilder,private _imageService:ImageServiceService){

  }
  ngAfterViewInit(): void {
  }
  getValue(libelle:string,i:number){
    
    this.valueLibelleSearch.emit({value:libelle,element:i});
   
  }
  onSubmit(){
    console.log(this.VenteForm.value);
    this.VenteFormEmitter.emit(this.VenteForm.value);
  }
  checkValidity():boolean{

    return [...this.allComponents.values()].
    reduce((acc,elemt)=>elemt.instance.ConfectionForm.valid && acc,true)
  
  }
  addConfection(libelle:string='',quantite:number=1){
    const lastInsert=[...this.allComponents.values()].at(-1)?.instance.ConfectionForm.value;
    
    this.confections?.setValue([...this.confections.value,lastInsert]);
    if(!this.confections?.value[0])
    {
      this.confections?.patchValue(this.confections.value?.filter((ele:any)=>ele))
    }
    this.cout=this.confections?.value.reduce((acc:number,element:IELement)=>acc+(element.quantite*200),0)
    const ref=this.container.createComponent(ConfectionComponent); 
    const temp:IELement={libelle:libelle,quantite:quantite};
    ref.instance.reference=this.position;
    this.allComponents.set(this.position.toString(),ref); 
    this.position++; 
    ref.instance.confectionEmitter.subscribe(res=>{
      this.getValue(res,this.position-1);
    });
    ref.instance.confectionFormEmitter.subscribe(res=>{
      console.log(this.position); 
      
      
    })
    
  }
  get confections(){return this.VenteForm.get("confections");}
  get libelle(){return this.VenteForm.get("libelle");}
  get path(){return this.VenteForm.get("path");}
  get promo(){return this.VenteForm.get("promo")}
  get marge(){return this.VenteForm.get("marge")}
  loadImage(event:Event){
    const target=event.target as HTMLInputElement;
    console.log( target.value);
    if(target.files){
      const file=target.files[0];
     
      this._imageService.readFile(file).subscribe({next:res=>{
        console.log(res);
        this.path?.setValue(res.codage)
        
      }})
      
    }

  }
  get reference(){return this.VenteForm.get("reference")}
  get categorie(){return this.VenteForm.get("categorie")}
  ngOnInit():void{
    this.VenteForm=this._fb.group({
      libelle:['',[Validators.required,Validators.minLength(3),this.checkLibelleExist()]],
      categorie:['',[Validators.required]],
      promo:[0,[]],
      confections:[[],[this.validateConfection()]],
      reference:["REF-",[Validators.required]],
      path:[environment.image_url,[Validators.required]],
      marge:["",[Validators.required,this.validateMarge()]]
    });
    this.addConfection();

  }
  validateMarge(){
    return  (control:AbstractControl):ValidationErrors|null=>{
      const value=control.value;
      
      if(!value){

        return null;
      }
     
      return !(value>=500 && value<=this.cout/3)
      ?{error:true}:null;
    }

  }

  handlePromo(event:Event){
    const target=event.target as HTMLInputElement;
    this.promoIsChecked=!this.promoIsChecked;
    this.promo?.clearValidators();
    if(target.checked){
      this.promo?.addValidators(Validators.required);
      this.promo?.addValidators(Validators.min(1));
      
    }
    
  
    
  }
  handleRef(){
    const val=this.categorie?.valid?this.categorie.value.libelle.toUpperCase()+"-1":'-';
    const refLib=this.libelle?.valid?this.libelle.value.slice(0,2).toUpperCase():'-';
    
    this.reference?.setValue(`REF-${refLib}-${val}`)

  }
  getVenteExist(event:Event){
    const target=event.target as HTMLInputElement;
    this.articleExist=[];
    if(target.value.length>=3){
      this.articleVenteLibelle.emit(target.value);
    }
    this.handleRef();

  }
  checkLibelleExist(){
    return  (control:AbstractControl):ValidationErrors|null=>{
      const value=control.value;
      
      if(!value){

        return null;
      }
     
      return (this.articleExist.find(ele=>ele.libelle==value))
      ?{exist:true}:null;
    }
  }
  validateConfection()
  {
    return  (control:AbstractControl):ValidationErrors|null=>{
      const value=control.value;
      
      if(!value){

        return null;
      }
     
      return (value.length<3)
      ?{error:true}:null;
    }
  }
  compareFn(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  
  validatePath(){
    return  (control:AbstractControl):ValidationErrors|null=>{
      const value=control.value;
      
      if(!value){

        return null;
      }
     
      return (value==this.default)
      ?{error:true}:null;
    }
  }

}
