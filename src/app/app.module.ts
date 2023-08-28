import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorieComponent } from './component/categorie/categorie.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatButtonToggleModule } 
    from "@angular/material/button-toggle";
import {MatTabsModule} from '@angular/material/tabs'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleComponent } from './component/article/article.component';
import { FormArticleComponent } from './component/article/form-article/form-article.component';
import { ListArticleComponent } from './component/article/list-article/list-article.component';
import { ItemArticleComponent } from './component/article/item-article/item-article.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { SelectImageComponent } from './component/select-image/select-image.component';
import { VenteComponent } from './component/vente/vente.component';
import { ConfectionComponent } from './component/vente/confection/confection.component';
import { ListVenteComponent } from './component/vente/list-vente/list-vente.component';
import { FormVenteComponent } from './component/vente/form-vente/form-vente.component';
import { ItemVenteComponent } from './component/vente/item-vente/item-vente.component';
@NgModule({
  declarations: [
    AppComponent,
    CategorieComponent,
    ArticleComponent,
    FormArticleComponent,
    ListArticleComponent,
    ItemArticleComponent,
    PaginationComponent,
    SelectImageComponent,
    VenteComponent,
    ConfectionComponent,
    ListVenteComponent,
    FormVenteComponent,
    ItemVenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
