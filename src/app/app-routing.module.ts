import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { CastingPageComponent } from './pages/casting-page/casting-page.component';
import { ContactsBlockComponent } from './components/casting/contacts-block/contacts-block.component';
import { LikesBlockComponent } from './components/casting/likes-block/likes-block.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { PersonPageComponent } from './pages/person-page/person-page.component';
import { CASTING_PAGE, CASTING_PAGE_CONTACTS, CASTING_PAGE_LIKES, CHAT_PAGE, FRIENDS_PAGE, MAIN_PAGE, MESSAGES_PAGE, PERSON_PAGE } from './utils/const';


const castingRoutes: Routes = [
  { path: CASTING_PAGE_CONTACTS, component: ContactsBlockComponent },
  { path: CASTING_PAGE_LIKES, component: LikesBlockComponent },
];

const routes: Routes = [
  { path: MAIN_PAGE, component: MainPageComponent },
  { path: FRIENDS_PAGE, component: FriendsPageComponent},
  { path: MESSAGES_PAGE, component: MessagesPageComponent },
  { path: CHAT_PAGE, component: ChatPageComponent },
  { path: CASTING_PAGE, component: CastingPageComponent, children: castingRoutes },
  { path: PERSON_PAGE, component: PersonPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
