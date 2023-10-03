import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { ContentLoaderModule } from '@ngneat/content-loader';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MyPageComponent } from './components/my-page/my-page.component';
import { FriendsBlockComponent } from './components/friends-block/friends-block.component';
import { PostBlockComponent } from './components/post-block/post-block.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { CastingPageComponent } from './pages/casting-page/casting-page.component';
import { FormBlockComponent } from './components/form-block/form-block.component';
import { LikesBlockComponent } from './components/casting/likes-block/likes-block.component';
import { ContactsBlockComponent } from './components/casting/contacts-block/contacts-block.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { PersonPageComponent } from './pages/person-page/person-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { StopPropaginationDirective } from './directives/stop-propagination.directive';
import { FriendsService } from './services/friends.service';
import { PostsService } from './services/posts.service';
import { FilterFriendsPipe } from './pipes/filter-friends.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { ClickListenerDirective } from './directives/click-listener.directive';
import { FilterHobbyPipe } from './pipes/filter-hobby.pipe';
import { FriendsAddComponent } from './components/friends/friends-add/friends-add.component';
import { FriendsSearchComponent } from './components/friends/friends-search/friends-search.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ActiveLinkDirective } from './directives/active-link.directive';
import { httpInterceptorProviders } from './_helpers/auth.interceptor';
import { ErrorComponent } from './components/error/error.component';
import { FriendsRoutingComponent } from './components/friends-routing/friends-routing.component';
import { FriendsMyFriendsComponent } from './components/friends/friends-my-friends/friends-my-friends.component';
import { LodaerSpinV1Component } from './components/loading/lodaer-spin-v1/lodaer-spin-v1.component';
import { LodaerSpinV2Component } from './components/loading/lodaer-spin-v2/lodaer-spin-v2.component';
import { LoaderHomeComponent } from './components/loading/loader-home/loader-home.component';
import { SignupSecondStepPageComponent } from './pages/signup-second-step-page/signup-second-step-page.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    SearchComponent,
    MainPageComponent,
    MyPageComponent,
    FriendsBlockComponent,
    PostBlockComponent,
    MessagesPageComponent,
    ChatPageComponent,
    CastingPageComponent,
    FormBlockComponent,
    LikesBlockComponent,
    ContactsBlockComponent,
    FriendsPageComponent,
    PersonPageComponent,
    ModalComponent,
    CreateProductComponent,
    StopPropaginationDirective,
    FilterFriendsPipe,
    MultiSelectComponent,
    ClickListenerDirective,
    FilterHobbyPipe,
    FriendsAddComponent,
    FriendsSearchComponent,
    LoginPageComponent,
    SignupPageComponent,
    ActiveLinkDirective,
    ErrorComponent,
    FriendsRoutingComponent,
    FriendsMyFriendsComponent,
    LodaerSpinV1Component,
    LodaerSpinV2Component,
    LoaderHomeComponent,
    SignupSecondStepPageComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TextFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ContentLoaderModule,
  ],

  providers: [FriendsService, PostsService, httpInterceptorProviders],

  bootstrap: [AppComponent],
})
export class AppModule {}
