
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PermissionDirective } from './directives/permission/permission.directive';
import { SuiModule } from 'ng2-semantic-ui/dist';
import { AnnouncementInboxCardComponent, AppLoaderComponent } from './components/index';
import { DateFormatPipe } from './pipes/date-format.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AppLoaderComponent, PermissionDirective, AnnouncementInboxCardComponent, DateFormatPipe],
  exports: [AppLoaderComponent, PermissionDirective, AnnouncementInboxCardComponent, DateFormatPipe]
})
export class AppCommonModule { }
