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
import { FriendsAddComponent } from './components/friends/friends-add/friends-add.component';
import { FriendsSearchComponent } from './components/friends/friends-search/friends-search.component';
import {
  CASTING_PAGE,
  CASTING_PAGE_CONTACTS,
  CASTING_PAGE_LIKES,
  CHAT_PAGE,
  FRIENDS_ADDED,
  FRIENDS_PAGE,
  FRIENDS_SEARCH,
  LOGIN_PAGE,
  MAIN_PAGE,
  MESSAGES_PAGE,
  PERSON_PAGE,
  REGISTRATION_PAGE,
} from './utils/const';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AuthGuard, AuthGuardChild } from './services/guard.service';

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

const friendsRoute = [
  {
    path: FRIENDS_ADDED,
    component: FriendsAddComponent,
  },
  {
    path: FRIENDS_SEARCH,
    component: FriendsSearchComponent,
  },
];

const routes: Routes = [
  { path: REGISTRATION_PAGE, component: SignupPageComponent },
  { path: LOGIN_PAGE, component: LoginPageComponent },
  { path: MAIN_PAGE, component: MainPageComponent, canActivate: [AuthGuard] },
  {
    path: FRIENDS_PAGE,
    component: FriendsPageComponent,
    children: friendsRoute,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuardChild],
  },
  {
    path: MESSAGES_PAGE,
    component: MessagesPageComponent,
    canActivate: [AuthGuard],
  },
  { path: CHAT_PAGE, component: ChatPageComponent, canActivate: [AuthGuard] },
  {
    path: CASTING_PAGE,
    component: CastingPageComponent,
    children: castingRoutes,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuardChild],
  },
  {
    path: PERSON_PAGE,
    component: PersonPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
