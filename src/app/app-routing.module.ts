import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PersonPageComponent } from './pages/person-page/person-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AuthGuard, AuthGuardChild } from './services/guard.service';
import { SignupSecondStepPageComponent } from './pages/signup-second-step-page/signup-second-step-page.component';
import {
  CASTING_PAGE,
  CHAT_PAGE,
  LOGIN_PAGE,
  MAIN_PAGE,
  MESSAGES_PAGE,
  PERSON_PAGE,
  REGISTRATION_PAGE,
  REGISTRATION_SECOND,
  SUBSCRIBERS_PAGE,
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
