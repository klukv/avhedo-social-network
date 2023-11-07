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

describe('HeaderComponent', () => {
  let headerCom: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let storageService: StorageService;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const storageServiceMock = jasmine.createSpyObj('StorageService', [
      'getUser',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [
        HeaderComponent,
        SearchComponent,
        NotificationsComponent,
        NavigationComponent,
        FilterFriendsPipe,
      ],
      providers: [
        ModalService,
        { provide: StorageService, useValue: storageServiceMock },
        NotificationService,
        FriendsService,
        HttpClient,
        { provide: Router, useValue: routerSpyObj },
      ],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    headerCom = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    storageService = TestBed.inject(StorageService);
  });

  it('должен создавать компонент', () => {
    expect(headerCom).toBeTruthy();
  });

  it('должен возвращать информацию о пользователе', () => {
    const mockUserInfo = {
      id: 1,
      username: 'Петя',
      age: '25',
      gender: 'man',
      hobby: 'Программирование',
      about: 'Люблю сырники',
      urlImage: '',
    };

    (<jasmine.Spy<any>>storageService.getUser).and.returnValue(mockUserInfo);

    headerCom.ngOnInit();

    const userInfo = headerCom.getUserInfo();
    console.log(headerCom.getUserInfo());
    expect(userInfo).toEqual(mockUserInfo);

    expect(storageService.getUser).toHaveBeenCalled();
  });

  it('должен перенаправлять по указанному адресу', () => {
    headerCom.goToLink('/person'),
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/person']);
  });

  it('должен передавать введенное имя пользователя (searchUsername) в subject', () => {
    const setValueSubject = spyOn(headerCom.getSubSearchUsername(), 'next');
    headerCom.setResponsiveSearchUsername('Иван');
    headerCom.subSearchUsername$.subscribe(resultSearch => expect(resultSearch).toBe('Иван'));

    expect(setValueSubject).toHaveBeenCalledOnceWith('Иван');
  })
});
