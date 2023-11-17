import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterFriendsPipe } from 'src/app/pipes/filter-friends.pipe';
import { FriendsSearchComponent } from './components/friends-search/friends-search.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { FriendsRoutingComponent } from './components/friends-routing/friends-routing.component';
import { FormsModule } from '@angular/forms';
import { ActiveLinkDirective } from 'src/app/modules/shared/directives/active-link.directive';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { FriendsMyFriendsComponent } from './components/friends-my-friends/friends-my-friends.component';
import { FriendsAddComponent } from './components/friends-add/friends-add.component';
import { FriendsBlockComponent } from './components/friends-block/friends-block.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, ContentLoaderModule, SharedModule],
  declarations: [
    FriendsPageComponent,
    FriendsRoutingComponent,
    FriendsSearchComponent,
    FriendsMyFriendsComponent,
    FriendsAddComponent,
    FriendsBlockComponent,
    FilterFriendsPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    FriendsPageComponent,
    FriendsRoutingComponent,
    FriendsSearchComponent,
    FriendsMyFriendsComponent,
    FriendsAddComponent,
    FriendsBlockComponent,
    FilterFriendsPipe,
  ],
})
export class FriendsModule {}
