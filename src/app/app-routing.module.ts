import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExampleListComponent} from "./presentation/example-list/example-list.component";
import {StylesComponent} from "./presentation/example-list/styles/styles.component";
import {SignalsComponent} from "./presentation/example-list/signals/signals.component";
import {SortableListComponent} from "./presentation/example-list/sortable-list/sortable-list.component";
import {ObservablesComponent} from "./presentation/example-list/observables/observables.component";
import {FormsComponent} from "./presentation/example-list/forms/forms.component";
import {WebsocketComponent} from "./presentation/example-list/websocket/websocket.component";
import {FileLoggerComponent} from "./presentation/example-list/file-logger/file-logger.component";

const routes: Routes = [
  {path: 'example-list', component: ExampleListComponent},
  {
    path: 'example', children: [
      {path: 'styles', component: StylesComponent},
      {path: 'signals', component: SignalsComponent},
      {path: 'observables', component: ObservablesComponent},
      {path: 'forms', component: FormsComponent},
      {path: 'sortable-list', component: SortableListComponent},
      {path: 'websocket', component: WebsocketComponent},
      {path: 'file-logger', component: FileLoggerComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
