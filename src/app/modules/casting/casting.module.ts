import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CastingPageComponent } from './pages/casting-page/casting-page.component';
import { LikesBlockComponent } from './components/likes-block/likes-block.component';
import { ContactsBlockComponent } from './components/contacts-block/contacts-block.component';
import { SharedModule } from '../shared/shared.module';
import { FormBlockComponent } from 'src/app/components/form-block/form-block.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    CastingPageComponent,
    LikesBlockComponent,
    ContactsBlockComponent,
    FormBlockComponent,
  ],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [CastingPageComponent],
})
export class CastingModule {}
