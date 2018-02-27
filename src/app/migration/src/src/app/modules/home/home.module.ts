// Import modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SuiModule } from 'ng2-semantic-ui/dist';
import { SlickModule } from 'ngx-slick';
// Import services
import { CoursesService, UserService, AnnouncementService, AppCommonModule } from './index';

// Import component
import {
  ActionCardComponent, HomeCalendarCardComponent, HomeFeedCardComponent, MainHomeComponent,
  ProfileCardComponent, HomeAnnouncementComponent, NotificationComponent
} from './component/index';


@NgModule({
  imports: [
    SuiModule,
    CommonModule,
    HomeRoutingModule,
    SlickModule,
    AppCommonModule,
  ],
  declarations: [
    ProfileCardComponent,
    ActionCardComponent,
    MainHomeComponent,
    HomeFeedCardComponent,
    HomeCalendarCardComponent,
    HomeAnnouncementComponent,
    NotificationComponent,
  ],
  providers: [
    CoursesService,
    UserService,
    AnnouncementService
  ]
})
export class HomeModule { }
