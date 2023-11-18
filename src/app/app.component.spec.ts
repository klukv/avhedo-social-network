import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ModalService } from './services/modal.service';
import { PersonPageService } from './services/person-page.service';
import { WebsocketService } from './services/websocket.service';
import { ErrorService } from './services/error.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { MyPageComponent } from './components/my-page/my-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ErrorComponent } from './components/error/error.component';
import { FilterFriendsPipe } from './pipes/filter-friends.pipe';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FriendsRoutingComponent } from './modules/friends/components/friends-routing/friends-routing.component';
import { FriendsBlockComponent } from './modules/friends/components/friends-block/friends-block.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [
        AppComponent,
        HeaderComponent,
        SearchComponent,
        FriendsRoutingComponent,
        MyPageComponent,
        FriendsBlockComponent,
        ModalComponent,
        CreateProductComponent,
        ErrorComponent,
        FilterFriendsPipe,
        NotificationsComponent,
        NavigationComponent
      ],
      providers: [
        ModalService,
        PersonPageService,
        WebsocketService,
        ErrorService,
        HttpClient,
        { provide: Router, useValue: routerSpyObj },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
