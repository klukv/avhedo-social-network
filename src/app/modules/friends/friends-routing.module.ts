import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { FriendsMyFriendsComponent } from './components/friends-my-friends/friends-my-friends.component';
import { FriendsAddComponent } from './components/friends-add/friends-add.component';
import { FriendsSearchComponent } from './components/friends-search/friends-search.component';
import { MY_SUBSCRIBERS, SUBSCRIBERS_ADDED, SUBSCRIBERS_SEARCH } from 'src/app/utils/const';

//дочерние маршруты в модуле друзей (подписчиков)
const friendsRoute = [
  {
    path: MY_SUBSCRIBERS,
    component: FriendsMyFriendsComponent,
  },
  {
    path: SUBSCRIBERS_ADDED,
    component: FriendsAddComponent,
  },
  {
    path: SUBSCRIBERS_SEARCH,
    component: FriendsSearchComponent,
  },
];

const routes: Routes = [
  { path: '', component: FriendsPageComponent, children: friendsRoute},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsRoutingModule {}
