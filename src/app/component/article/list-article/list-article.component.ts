import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArticle } from 'src/app/interface/article';
import { Categorie } from 'src/app/interface/categorie';
import { Ilink, Response, ResponseData } from 'src/app/interface/response';
import { ArticleService } from 'src/app/service/article.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent {
 @Input() articles!: IArticle[];
 @Input() categories!:Categorie[];
 @Output() dataArticle:EventEmitter<IArticle>=new EventEmitter();
 @Output() deletedArticle:EventEmitter<string>=new EventEmitter();
  links!:Ilink[];

  advertise:string='supprimmer';
  constructor(){}

  ngOnInit(){
   
  }
  // changePage(url:string){
  //   this._articleService.all(url).subscribe({
  //     next:(res)=>{
  //       this.articles=res.data;
  //       this.links=res.meta.links;
  //     }
  //   })
  // }
  fillForm(event:Event){
    const target=event.target as HTMLButtonElement;
    console.log(target);
    console.log(this.articles);
    
    // console.log(this.articles.find(elmt=>elmt.id==+target.value));
    // this.dataArticle.emit(this.articles.find(elmt=>elmt.id==+target.value));
    

  }
  deleteArticle(event:Event){
    const target=event.target as HTMLButtonElement;
    const articleId=target.value;

    let seconde=1;
    if(target.textContent?.includes("supprimer"))
    {
      target.textContent=`ok(${seconde})`;
        var timer= setInterval(()=>{
           seconde++;
           target.textContent=`ok(${seconde})`;
           if(seconde==4 ){
             clearInterval(timer);
             target.textContent="supprimer"
            }
           
          },1000)

    }else
    {
      // this.articles=this.articles.filter(item=>item.id!==+articleId);
      this.deletedArticle.emit(articleId)
      console.log(this.articles);
      
      
    }

    
  }
}
