import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CastingPageComponent } from './pages/casting-page/casting-page.component';
import { LikesBlockComponent } from './components/likes-block/likes-block.component';
import { ContactsBlockComponent } from './components/contacts-block/contacts-block.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    CastingPageComponent,
    LikesBlockComponent,
    ContactsBlockComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    CastingPageComponent,
    LikesBlockComponent,
    ContactsBlockComponent,
  ],
})
export class CastingModule {}
