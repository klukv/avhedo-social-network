import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';




@NgModule({
  declarations: [MessagesPageComponent],
  imports: [
    CommonModule, 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [MessagesPageComponent]
})
export class MessagesModule { }
