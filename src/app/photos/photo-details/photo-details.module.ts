import { ShowIfLoggedModule } from './../../shared/directives/show-if-logged/show-if-logged.module';
import { VMessageModule } from './../../shared/components/vmessage/vmessage.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { PhotoModule } from './../photo/photo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoOwnerDirective } from './photo-owner/photo-owner.directive';

@NgModule({
  declarations: [
    PhotoDetailsComponent,
    PhotoCommentsComponent,
    PhotoOwnerDirective
  ],
  exports: [
    PhotoDetailsComponent,
    PhotoCommentsComponent
  ],
  imports: [
    CommonModule,
    PhotoModule,
    RouterModule,
    ReactiveFormsModule,
    VMessageModule,
    ShowIfLoggedModule
  ],
})
export class PhotoDetailsModule { }
