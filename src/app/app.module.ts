import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {ExampleListComponent} from './presentation/example-list/example-list.component';
import {StylesComponent} from './presentation/example-list/styles/styles.component';
import {ExampleCardComponent} from './presentation/components/example-card/example-card.component';
import {SignalsComponent} from './presentation/example-list/signals/signals.component';
import {ObservablesComponent} from './presentation/example-list/observables/observables.component';
import {FormsComponent} from './presentation/example-list/forms/forms.component';
import {SortableListComponent} from './presentation/example-list/sortable-list/sortable-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormlyModule} from '@ngx-formly/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormlyMaterialModule} from "@ngx-formly/material";
import { WebsocketComponent } from './presentation/example-list/websocket/websocket.component';
import { FileLoggerComponent } from './presentation/example-list/file-logger/file-logger.component';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    AppComponent,
    ExampleListComponent,
    StylesComponent,
    ExampleCardComponent,
    SignalsComponent,
    ObservablesComponent,
    FormsComponent,
    SortableListComponent,
    WebsocketComponent,
    FileLoggerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormlyMaterialModule,
    FormlyModule.forRoot(),
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    MatMenuModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
