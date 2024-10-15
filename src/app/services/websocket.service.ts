import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private webSocket: WebSocketSubject<any>;
  private _notifier = new Subject();

  constructor() {
    this.webSocket = new WebSocketSubject<any>('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self');
    this.webSocket.subscribe(value => {
      this.notifier.next(value);
    })
  }

  public get notifier(): Subject<any> {
    return this._notifier;
  }

  public closeSocket(){
    this.webSocket.complete();
  }



}
