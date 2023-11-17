import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ContentLoaderModule } from '@ngneat/content-loader';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MyPageComponent } from './components/my-page/my-page.component';
import { PostBlockComponent } from './components/post-block/post-block.component';
import { FormBlockComponent } from './components/form-block/form-block.component';
import { PersonPageComponent } from './pages/person-page/person-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { StopPropaginationDirective } from './directives/stop-propagination.directive';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { ClickListenerDirective } from './directives/click-listener.directive';
import { FilterHobbyPipe } from './pipes/filter-hobby.pipe';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { httpInterceptorProviders } from './_helpers/auth.interceptor';
import { ErrorComponent } from './components/error/error.component';
import { LodaerSpinV1Component } from './components/loading/lodaer-spin-v1/lodaer-spin-v1.component';
import { LodaerSpinV2Component } from './components/loading/lodaer-spin-v2/lodaer-spin-v2.component';
import { LoaderHomeComponent } from './components/loading/loader-home/loader-home.component';
import { SignupSecondStepPageComponent } from './pages/signup-second-step-page/signup-second-step-page.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { FriendsModule } from './modules/friends/friends.module';
import { MessagesModule } from './modules/messages/messages.module';
import { CastingModule } from './modules/casting/casting.module';
import { ChatModule } from './modules/chat/chat.module';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TextFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ContentLoaderModule,
    ChatModule,
    FriendsModule,
    MessagesModule,
    CastingModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    SearchComponent,
    MainPageComponent,
    MyPageComponent,
    PostBlockComponent,
    FormBlockComponent,
    PersonPageComponent,
    ModalComponent,
    CreateProductComponent,
    StopPropaginationDirective,
    MultiSelectComponent,
    ClickListenerDirective,
    FilterHobbyPipe,
    LoginPageComponent,
    SignupPageComponent,
    ErrorComponent,
    LodaerSpinV1Component,
    LodaerSpinV2Component,
    LoaderHomeComponent,
    SignupSecondStepPageComponent,
    NotificationsComponent,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
