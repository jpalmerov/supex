import {Component, Input} from '@angular/core';
import {Example,} from "../../../models/example";
import {Router} from "@angular/router";

@Component({
  selector: 'app-example-card',
  templateUrl: './example-card.component.html',
  styleUrls: ['./example-card.component.css']
})
export class ExampleCardComponent {
  @Input() example: Example | undefined = new Example('Styles!', 'It is a sample of ripples, shimmers, etc', 'Today', '/assets/images/examples/styles.jpg', 'example/styles');

  constructor(private router: Router) {
  }

  onCardClick() {
    this.router.navigate([this.example!.route]);
  }
}
