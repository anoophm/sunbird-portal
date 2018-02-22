import { OutboxComponent } from './components/outbox/outbox.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'migration/announcement/outbox/:pageNumber', component: OutboxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule { }
