import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SelectcarComponent } from './selectcar/selectcar.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { StatiService } from './stati.service';
import { WorkerComponent } from './worker/worker.component';
import { DirectorComponent } from './director/director.component';
import { ModalModule } from 'ngx-bootstrap';
import { HomeComponent } from './home/home.component';
import { RentListComponent } from './rent-list/rent-list.component';
import { BintouchComponent } from './bintouch/bintouch.component';


var routes: Routes = [
  { path: '', redirectTo: 'HomePage', pathMatch: 'full' },
  { path: "HomePage", component: HomeComponent },
  { path: "Home", component: AppComponent },
  { path: "search", component: SearchComponent },
  { path: "worker", component: WorkerComponent },
  { path: "director", component: DirectorComponent },
  { path: "commend", component: SelectcarComponent },
 { path: "beintouch", component: BintouchComponent },
 { path: "rentlist", component: RentListComponent },
 //RentListComponent


];

@NgModule({
  declarations: [
    RentListComponent,
    BintouchComponent,
    AppComponent,
    SelectcarComponent,
    SearchComponent,
    WorkerComponent,
    DirectorComponent,
    HomeComponent,
    RentListComponent,
    BintouchComponent,
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, ModalModule.forRoot(), RouterModule.forRoot(routes)
  ],
  providers: [StatiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
