import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Categorie } from 'src/app/interface/categorie';
import { Fournisseur } from 'src/app/interface/fournisseur';
import { ImageServiceService } from 'src/app/service/image-service.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrls: ['./form-article.component.css'],
})
export class FormArticleComponent implements OnInit {
  @Input() categories!:Categorie[];
  @Input() added!:boolean;
  @Input() fournisseurs:Fournisseur[]|null=[];
  @Input() total!:(Categorie & {total:number})[];
  @Output() onFormGroupChange=new EventEmitter<FormGroup>();
  @Output() onSearchElement=new EventEmitter<string>();
  @Output() newArticleName=new EventEmitter<string>();
  resultFournisseur:Fournisseur[]=[];
  selectedFournisseur:Fournisseur[]=[];
  valueButton:string='ajouter';
  write:boolean=false;
  reference:string='REF-';
  tabReference={
    libelle:"",
    categorie:"",
    pos:"X"
  };
  image_url:string="assets/no_image.png";
  articleForm:FormGroup=<FormGroup>{}
  constructor(private _imageService:ImageServiceService, private _fb:FormBuilder){
   
  }
  checkExistArticle():ValidatorFn {
    return (control:AbstractControl):ValidationErrors|null=>{
      const value=control.value;
      console.log(value);
      
      let isOk=false;
      if(value.length<3)
        return null;
      const hasUpperCase = /[A-Z]+/.test(value);
      return !isOk ?{unique:false}:null;
    }
  }
  
  get libelle(){
    return this.articleForm.get("libelle");
  }
  get prix(){
    return this.articleForm.get("prix_unitaire");
  }
  get stock(){return this.articleForm.get("stock");}
  get path(){
    return this.articleForm.get("path");
  }
  get fournisseur(){
    return this.articleForm.get("fournisseurs")
  }
  get categorie(){
    return this.articleForm.get("categories");
  }
  searchByName(event:Event){
    const target=event.target as HTMLInputElement;
    this.resultFournisseur=[];
    if(target.value.length>3){
      this.onSearchElement.emit(target.value);
      
    }

  }
  putTotal(param:string){
    console.log(param);
    const find=this.total.find(element=>element.libelle==param.trim());

    this.tabReference.pos=`${find ? this.total.find(element=>element.libelle==param.trim())!.total+1 :1}`;


    
  }
  handleSelectedFournisseur(event:Event){
    const target=event.target as HTMLButtonElement;
    target.classList.add("active");
    setTimeout(()=>{
      this.selectedFournisseur.push({id:+target.value,name:target.textContent?.trim()!});
      this.fournisseur?.setValue(this.selectedFournisseur);
      this.resultFournisseur=this.resultFournisseur.filter(founrni=>founrni.id!==+target.value);

    },1200)
    
  }
  loadImage(event:Event){
    const target=event.target as HTMLInputElement;
    console.log( target.value);
    if(target.files){
      const file=target.files[0];
     
      this._imageService.readFile(file).subscribe({next:res=>{
        console.log(res);
        this.image_url=res.codage as string;
        this.path?.setValue({name:file.name,codage:res.codage})
        
      }})
      
    }
  }
  onSubmit(event:Event,button :HTMLButtonElement){
    const target=event.target as HTMLButtonElement;
    if(button.textContent?.trim()=="ajouter"){
    }
    if(target.textContent?.trim()=="modifier"){

    }
    
  }
  deleteElementSelected(inputFournisseur:HTMLInputElement,element:Fournisseur){
    this.selectedFournisseur=this.selectedFournisseur.filter(founrni=>founrni.id!==element.id);
    this.fournisseur?.setValue(this.selectedFournisseur);
    
    this.resultFournisseur.unshift(element);
    
    
  }
 handleRef(params:any){
  this.reference=""
  let tab=Object.entries<string>(params);
  this.reference="REF-"+tab[0][1].slice(0,3).toUpperCase()+'-'+tab[1][1].toUpperCase()+'-'+tab[2][1];
  
 }
  ngOnInit(): void {
    this.articleForm=this._fb.group({
      id:[null,[]],
      reference:["REF",[]],
      libelle:['',[Validators.required, Validators.minLength(3)]],
      prix_unitaire:['',Validators.required,],
      stock:['',Validators.required],
      path:[{name:'',codage:environment.image_url},Validators.required],
      fournisseurs:[[],[]],
      categorie:[null,Validators.required]
    });
   
    
  }
 
}
