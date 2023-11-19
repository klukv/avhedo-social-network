import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ContactsBlockComponent } from './modules/casting/components/contacts-block/contacts-block.component';
import { LikesBlockComponent } from './modules/casting/components/likes-block/likes-block.component';
import { FriendsPageComponent } from './modules/friends/pages/friends-page/friends-page.component';
import { PersonPageComponent } from './pages/person-page/person-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AuthGuard, AuthGuardChild } from './services/guard.service';
import { SignupSecondStepPageComponent } from './pages/signup-second-step-page/signup-second-step-page.component';
import { MessagesPageComponent } from './modules/messages/pages/messages-page/messages-page.component';
import { CastingPageComponent } from './modules/casting/pages/casting-page/casting-page.component';
import { FriendsMyFriendsComponent } from './modules/friends/components/friends-my-friends/friends-my-friends.component';
import { FriendsAddComponent } from './modules/friends/components/friends-add/friends-add.component';
import { FriendsSearchComponent } from './modules/friends/components/friends-search/friends-search.component';
import {
  CASTING_PAGE,
  CASTING_PAGE_CONTACTS,
  CASTING_PAGE_LIKES,
  CHAT_PAGE,
  LOGIN_PAGE,
  MAIN_PAGE,
  MESSAGES_PAGE,
  MY_SUBSCRIBERS,
  PERSON_PAGE,
  REGISTRATION_PAGE,
  REGISTRATION_SECOND,
  SUBSCRIBERS_ADDED,
  SUBSCRIBERS_PAGE,
  SUBSCRIBERS_SEARCH,
} from './utils/const';

const routes: Routes = [
  { path: REGISTRATION_PAGE, component: SignupPageComponent },
  { path: REGISTRATION_SECOND, component: SignupSecondStepPageComponent },
  { path: LOGIN_PAGE, component: LoginPageComponent },
  { path: MAIN_PAGE, component: MainPageComponent, canActivate: [AuthGuard] },
  {
    path: SUBSCRIBERS_PAGE,
    loadChildren: () =>
      import('./modules/friends/friends.module').then((m) => m.FriendsModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuardChild],
  },
  {
    path: MESSAGES_PAGE,
    loadChildren: () =>
      import('./modules/messages/messages.module').then(
        (m) => m.MessagesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: CHAT_PAGE,
    loadChildren: () =>
      import('./modules/chat/chat.module').then((m) => m.ChatModule),
    canActivate: [AuthGuard],
  },
  {
    path: CASTING_PAGE,
    loadChildren: () =>
      import('./modules/casting/casting.module').then((m) => m.CastingModule),
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
