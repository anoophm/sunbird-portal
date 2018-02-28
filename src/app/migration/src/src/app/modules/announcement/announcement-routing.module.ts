import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutboxComponent, DeleteComponent} from './components/index';

const routes: Routes = [
  {
    path: 'migration/announcement/outbox/:pageNumber', component: OutboxComponent
  },
  {
    path: 'migration/announcement/outbox/:pageNumber/delete/:announcementId', component: DeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule { }
