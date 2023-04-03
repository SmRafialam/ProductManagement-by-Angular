import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CollectionsModule } from './collections/collections.module';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomInterceptor } from './custom.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteModalComponent } from './collections/categories/delete-modal/delete-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    CollectionsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,


    ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
