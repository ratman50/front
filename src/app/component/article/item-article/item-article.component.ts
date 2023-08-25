import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/interface/article';

@Component({
  selector: 'app-item-article',
  templateUrl: './item-article.component.html',
  styleUrls: ['./item-article.component.css']
})
export class ItemArticleComponent {
  @Input() article!:IArticle;
  constructor(){
  }
}
