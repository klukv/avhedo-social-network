import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsSearchComponent } from './components/friends-search/friends-search.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { FriendsMyFriendsComponent } from './components/friends-my-friends/friends-my-friends.component';
import { FriendsAddComponent } from './components/friends-add/friends-add.component';
import { SharedModule } from '../shared/shared.module';
import { FriendsRoutingModule } from './friends-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FriendsRoutingModule,
    SharedModule,
  ],
  declarations: [
    FriendsPageComponent,
    FriendsSearchComponent,
    FriendsMyFriendsComponent,
    FriendsAddComponent,
  ],
  exports: [
    FriendsPageComponent,
  ],
})
export class FriendsModule {}
