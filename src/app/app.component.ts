import { Component } from '@angular/core';
import { trigger, style, transition, animate, group }
    from '@angular/animations';
import { Subject } from 'rxjs/Subject';
import { DataService } from "./services/data.service";
import * as _ from "lodash";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService],
  animations: [
  trigger('itemAnim', [
    transition(':enter', [
      style({transform: 'translateX(-100%)'}),
      animate(350)
    ]),
    transition(':leave', [
      group([
        animate('0.2s ease', style({
          transform: 'translate(150px,25px)'
        })),
        animate('0.5s 0.2s ease', style({
          opacity: 0
        }))
      ])
    ])
  ])
]
})

export class AppComponent {
  title = 'app';
  active = true;
  color = true;
  items:any = [];
  results: Object;
  searchTerm$ = new Subject<string>();


  constructor(private dataService: DataService){
    this.dataService.search(this.searchTerm$)
      .subscribe(results => {
        this.results = results.results;
      });
  }


  fruits = ['bananas', 'oranges', 'strawberries', 'kiwis'];

ngOnInit () {
  console.log(_.chunk(this.fruits, 2));
}

  myStyles = {
'background-color': 'lime',
'font-size': '20px',
'font-weight': 'bold'
}

myClasses={
  active:this.active,
  color:this.color
}

val=20;

addItem(value){
  this.items.push(value);
}

removeItem(value){
  this.items.splice(value,1);
}
}
