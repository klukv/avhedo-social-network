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

const castingRoutes: Routes = [
  { path: 'contacts', component: ContactsBlockComponent },
  { path: 'likes', component: LikesBlockComponent },
];

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'friends', component: FriendsPageComponent},
  { path: 'messages', component: MessagesPageComponent },
  { path: 'messages/chat', component: ChatPageComponent },
  { path: 'casting', component: CastingPageComponent, children: castingRoutes },
  { path: 'person', component: PersonPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
