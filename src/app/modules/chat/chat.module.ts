import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { SharedModule } from '../shared/shared.module';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  declarations: [ChatPageComponent],
  imports: [CommonModule, SharedModule, ChatRoutingModule],
  exports: [ChatPageComponent],
})
export class ChatModule {}
