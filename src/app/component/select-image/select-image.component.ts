import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
interface IURL{
  url:string
}

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.css']
})
export class SelectImageComponent {
  constructor( private dialogRef:MatDialogRef<SelectImageComponent>){
    
  }
  sendUrl(url:HTMLInputElement){
    console.log(url.value);
    this.dialogRef.close(url.value);
    
  }

}
