import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatPageComponent],
  imports: [FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ChatPageComponent],
})
export class ChatModule {}
