import { NgModule } from '@angular/core';
import { ErrorPageComponent, AuthGuard } from '@sunbird/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'learn', loadChildren: () => import('app/modules/learn/learn.module').then(m => m.LearnModule)
  },
  {
    path: 'resources', loadChildren: () => import('app/modules/resource/resource.module').then(m => m.ResourceModule)
  },
  {
    path: 'search', loadChildren: () => import('app/modules/search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'workspace', loadChildren: () => import('app/modules/workspace/workspace.module').then(m => m.WorkspaceModule)
  },
  {
    path: 'contribute', loadChildren: () => import('app/modules/program/program.module').then(m => m.ProgramModule)
  },
  {
    path: 'org', loadChildren: () => import('app/modules/org-management/org-management.module').then(m => m.OrgManagementModule)
  },
  {
    path: 'dashBoard', loadChildren: () => import('app/modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'profile', loadChildren: () => import('app/plugins/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'certs', loadChildren: () => import('app/modules/certificate/certificate.module').then(m => m.CertificateModule)
  },
  {
    path: 'recover', loadChildren: () => import('app/modules/recover-account/recover-account.module').then(m => m.RecoverAccountModule)
  },
  {
    path: 'accountMerge', loadChildren: () => import('app/modules/merge-account/merge-account.module').then(m => m.MergeAccountModule)
  },
  {
    path: 'get', loadChildren: () => import('app/modules/dial-code-search/dial-code-search.module').then(m => m.DialCodeSearchModule)
  },
  {
    path: '', loadChildren: () => import('app/modules/manage/manage.module').then(m => m.ManageModule)
  },
  {
    path: '', loadChildren: () => import('app/modules/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'error', component: ErrorPageComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
