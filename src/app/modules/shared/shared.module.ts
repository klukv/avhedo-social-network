import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveLinkDirective } from './directives/active-link.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { LodaerSpinV2Component } from 'src/app/components/loading/lodaer-spin-v2/lodaer-spin-v2.component';
import { LodaerSpinV1Component } from 'src/app/components/loading/lodaer-spin-v1/lodaer-spin-v1.component';
import { FriendsRoutingComponent } from '../friends/components/friends-routing/friends-routing.component';
import { FriendsBlockComponent } from '../friends/components/friends-block/friends-block.component';
import { FilterFriendsPipe } from 'src/app/pipes/filter-friends.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ContentLoaderModule,
  ],
  declarations: [
    ActiveLinkDirective,
    LodaerSpinV2Component,
    LodaerSpinV1Component,
    FriendsRoutingComponent,
    FriendsBlockComponent,
    FilterFriendsPipe
  ],
  exports: [
    ActiveLinkDirective,
    LodaerSpinV2Component,
    LodaerSpinV1Component,
    FriendsRoutingComponent,
    FriendsBlockComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ContentLoaderModule,
    FilterFriendsPipe
  ],
})
export class SharedModule {}
