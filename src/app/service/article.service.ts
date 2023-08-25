import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { IArticle } from '../interface/article';
import { Observable, tap } from 'rxjs';
import { Response, ResponseData } from '../interface/response';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends RestService<IArticle>{

  protected override uri(): string {
    return "article";
  }
 

}
