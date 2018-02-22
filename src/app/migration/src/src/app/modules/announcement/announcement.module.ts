import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementRoutingModule } from './announcement-routing.module';
import { SuiModule } from 'ng2-semantic-ui';
import { OutboxComponent } from './components/outbox/outbox.component';

import { AnnouncementService, PagerService, ResourceService, AppCommonModule} from './index';

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
