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
  let friendsService: FriendsService;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const storageServiceMock = jasmine.createSpyObj('StorageService', [
      'getUser',
    ]);
    const friendsServiceMock = jasmine.createSpyObj('FriendsService', [
      'setSearchUsername',
    ]);

    //мок данные для метода по возвращению информации о пользователе
    const mockUserInfo = {
      id: 1,
      username: 'Петя',
      age: '25',
      gender: 'man',
      hobby: 'Программирование',
      about: 'Люблю сырники',
      urlImage: '',
    };

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
        { provide: FriendsService, useValue: friendsServiceMock },
        HttpClient,
        { provide: Router, useValue: routerSpyObj },
      ],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    headerCom = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    storageService = TestBed.inject(StorageService);
    friendsService = TestBed.inject(FriendsService);
    
    //возвращение мок данных методом getUser()
    (<jasmine.Spy<any>>storageService.getUser).and.returnValue(mockUserInfo);
  });

  it('должен создавать компонент', () => {
    expect(headerCom).toBeTruthy();
  });

  it('должен возвращать информацию о пользователе', () => {
    headerCom.ngOnInit();

    const userInfo = headerCom.getUserInfo();
    expect(userInfo).toEqual({
      id: 1,
      username: 'Петя',
      age: '25',
      gender: 'man',
      hobby: 'Программирование',
      about: 'Люблю сырники',
      urlImage: '',
    });

    expect(storageService.getUser).toHaveBeenCalled();
  });

  it('должен перенаправлять по указанному адресу', () => {
    headerCom.goToLink('/person');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/person']);
  });

  it('должен передавать введенное имя пользователя (searchUsername) в subject', () => {
    const mockEventUsername = {
      target: {
        value: 'Иван',
      },
    };
    //создание мока для метода next
    const setValueSubject = spyOn(headerCom.getSubSearchUsername(), 'next');
    headerCom.setResponsiveSearchUsername(mockEventUsername);
    headerCom.subSearchUsername$.subscribe((resultSearch) => {});

    expect(setValueSubject).toHaveBeenCalledWith('Иван');
  });

  it('должен передавать введенное введенное имя пользователя в сервис друзей (friendsService)', () => {
    headerCom.ngOnInit();
   // headerCom.setResponsiveSearchUsername('Юлия');
  });
});
