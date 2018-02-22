import { ResourceService } from './../../services/resource/resource.service';
import { PagerService } from './../../services/pagination/pagination.service';
import { AppCommonModule } from './../common/common.module';
import { AnnouncementService } from './../../services/announcement/announcement.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementRoutingModule } from './announcement-routing.module';
import { OutboxComponent } from './components/outbox/outbox.component';
import { SuiModule } from 'ng2-semantic-ui';

@NgModule({
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    AppCommonModule,
    SuiModule
  ],
  declarations: [OutboxComponent],
  providers: [AnnouncementService, PagerService, ResourceService]
})
export class AnnouncementModule { }
