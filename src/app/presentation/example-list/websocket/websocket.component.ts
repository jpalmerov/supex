import {Component} from '@angular/core';
import {WebsocketService} from "../../../services/websocket.service";

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent {
  constructor(private webSocketService: WebsocketService) {
    this.webSocketService.notifier.subscribe(value => {
      console.log(value);
    })
  }
}
