import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

interface IImage{
  name:string,
  codage:ArrayBuffer|string|null
}
@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor() { }
  
  readFile = (file:File): Observable<IImage> =>
  {
  
  
    return new Observable(obs => {
      const reader = new FileReader();
  
      reader.onerror = err => obs.error(err);
      reader.onabort = err => obs.error(err);
      reader.onload = () =>obs.next({name:file.name,codage:reader.result});
      
      reader.onloadend = () => obs.complete();
  
      return reader.readAsDataURL(file);
    });
  }
  
}
