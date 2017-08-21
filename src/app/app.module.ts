import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ApiService } from './core/api.service';
import { LoadingComponent } from './core/loading.component';
import { DatePipe } from '@angular/common';
import { UtilsService } from './core/utils.service';
import { FilterSortService } from './core/filter-sort.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [Title, 
    ApiService,
    DatePipe,
    UtilsService,
    FilterSortService],
  bootstrap: [AppComponent]
})
export class AppModule { }
