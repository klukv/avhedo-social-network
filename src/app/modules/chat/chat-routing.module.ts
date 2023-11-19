import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { ContactsBlockComponent } from '../casting/components/contacts-block/contacts-block.component';
import { LikesBlockComponent } from '../casting/components/likes-block/likes-block.component';
import { CASTING_PAGE_CONTACTS, CASTING_PAGE_LIKES } from 'src/app/utils/const';

//дочерние маршруты для модуля знакомств
const castingRoutes: Routes = [
  {
    path: CASTING_PAGE_CONTACTS,
    component: ContactsBlockComponent,
  },
  {
    path: CASTING_PAGE_LIKES,
    component: LikesBlockComponent,
  },
];

const routes: Routes = [{ path: '', component: ChatPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
