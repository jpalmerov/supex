import { Injectable } from '@angular/core';
import {Example} from "../models/example";

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  public examples: Example[] = [
    new Example('Styles', 'It is a sample of ripples, shimmers, etc', 'Today', '/assets/images/examples/styles.jpg', 'example/styles'),
    new Example('Signals', 'It is a sample of using signals in Angular', 'Today', '/assets/images/examples/signals.jpg', 'example/signals'),
    new Example('Observables', 'It is a sample of using observables in Angular', 'Today', '/assets/images/examples/observables.jpg', 'example/observables'),
    new Example('Forms by Material and Formly', 'It is a sample of creating forms in Angular by using Material and Formly', 'Today', '/assets/images/examples/forms.jpg', 'example/forms'),
    new Example('Sortable list', 'It is a sample of creating sortable list', 'Today', '/assets/images/examples/sort.jpg', 'example/sortable-list'),
    new Example('Web socket', 'It is a sample of creating a websocket in Angular', 'Today', '/assets/images/examples/websocket.avif', 'example/websocket'),
    new Example('File logger', 'It is a sample of creating a file logger in Angular', 'Today', '/assets/images/examples/file_logger.jpeg', 'example/file-logger'),
  ];
  constructor() {}
}
