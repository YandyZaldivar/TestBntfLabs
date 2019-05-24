import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { UsersComponent } from './users/users.component';
import { ModalComponent } from './modal/modal.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ModalComponent,
    DetailsComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    FormsModule
  ],
  providers: [
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
