import { ShowIfLoggedModule } from './../shared/directives/show-if-logged/show-if-logged.module';
import { MenuModule } from './../shared/components/menu/menu.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoadingModule } from './../shared/components/loading/loading.module';
import { AlertModule } from './../shared/components/alert/alert.module';
import { RequestInterceptor } from './auth/request.interceptor';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations:[
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AlertModule,
    LoadingModule,
    MenuModule,
    ShowIfLoggedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true
  }]
})

export class CoreModule{}
