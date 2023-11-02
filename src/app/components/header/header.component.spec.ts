import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from '../search/search.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { HeaderComponent } from './header.component';
import { ModalService } from 'src/app/services/modal.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FriendsService } from 'src/app/services/friends.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilterFriendsPipe } from 'src/app/pipes/filter-friends.pipe';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let headerCom: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [
        HeaderComponent,
        SearchComponent,
        NotificationsComponent,
        NavigationComponent,
        FilterFriendsPipe
      ],
      providers: [
        ModalService,
        StorageService,
        NotificationService,
        FriendsService,
        HttpClient,
        { provide: Router, useValue: routerSpyObj },
      ],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    headerCom = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(headerCom).toBeTruthy();
  });

  xit('should display logo containing text "AVHEDO"', () => {
    const logoText =fixture.debugElement.query(By.css('.header__logo-image')).nativeElement;
    expect(logoText.textContent).toBe('AVHEDO');
 });
});
