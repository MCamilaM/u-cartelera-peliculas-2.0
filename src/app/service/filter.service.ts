import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  @Output() triggerFilter: EventEmitter<any> = new EventEmitter();

  @Output() triggerSearchMovie: EventEmitter<any> = new EventEmitter();

  

  constructor() { }
}
