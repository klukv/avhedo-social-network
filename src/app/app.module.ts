import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AppRoutingModule } from './app-routing.module';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ModalComponent } from './components/modal/modal.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { StopPropaginationDirective } from './directives/stop-propagination.directive';
import { FriendsService } from './services/friends.service';

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
    StopPropaginationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TextFieldModule
  ],
  providers: [FriendsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
