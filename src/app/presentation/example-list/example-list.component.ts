import {Component} from '@angular/core';
import {ExampleService} from "../../services/example.service";

@Component({
  selector: 'app-example-list',
  templateUrl: './example-list.component.html',
  styleUrls: ['./example-list.component.css']
})
export class ExampleListComponent {
  constructor(public exampleService: ExampleService) {
  }
}
