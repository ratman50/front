import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ilink } from 'src/app/interface/response';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() links:Ilink[]|undefined=[];
  @Output() newPageEvent = new EventEmitter<string>();

  newPage(url:string){
    this.newPageEvent.emit(url);
  }
  ngOnInit(){
    
  }

}
