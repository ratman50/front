import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './component/categorie/categorie.component';
import { ArticleComponent } from './component/article/article.component';
import { VenteComponent } from './component/vente/vente.component';

const routes: Routes = [
  {path:"categorie",component:CategorieComponent},
  {path:"confection",component:ArticleComponent},
  {path:"vente",component:VenteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
