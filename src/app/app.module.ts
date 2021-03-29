import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserViewComponent } from './user-view/user-view.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatComponentsModule } from './mat-components/mat-components.module';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { DataService } from './service/data.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    UserAddComponent,
    UserEditComponent,
    UserViewComponent,
    MatConfirmDialogComponent,
    PageNotFoundComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    FilterPipeModule,
    OrderModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatComponentsModule
    
  ],
  providers: [
    
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
