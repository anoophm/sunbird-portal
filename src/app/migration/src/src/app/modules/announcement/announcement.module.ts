import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementRoutingModule } from './announcement-routing.module';
import { SuiModule } from 'ng2-semantic-ui';

import { AnnouncementService, PaginationService, ResourceService, AppCommonModule} from './index';
import { OutboxComponent, DeleteComponent} from './components/index';

@NgModule({
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    AppCommonModule,
    SuiModule
  ],
  declarations: [OutboxComponent, DeleteComponent],
  providers: [AnnouncementService, PaginationService, ResourceService]
})
export class AnnouncementModule { }
