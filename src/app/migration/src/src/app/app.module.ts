import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './header/main-header/main-header.component';
import { MainMenuComponent } from './header/main-menu/main-menu.component';
import { SearchComponent } from './header/search/search.component';
import { CommunityListComponent } from './main-view/community-list/community-list.component';
import { AppRoutingModule } from './app.routing';
import { ProfileComponent } from './main-view/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileService } from './services/profile.service';
import { PermissionService } from './services/permission.service';
import { AuthGuard } from './services/auth-guard.service';
import { RouteResolveService } from './services/route-resolve.service';
import { AuthGuardComponent } from './random/auth-guard/auth-guard.component';
import { SuiModule } from 'ng2-semantic-ui';
// Dashboards
import { CourseConsumptionDashboardComponent } from './dashboard/course-consumption/course-consumption.component';
import { CourseConsumptionService } from './dashboard/datasource/course-consumption.service';
import { OrganisationService } from './dashboard/datasource/organisation.service';
import { DashboardUtilsService } from './dashboard/datasource/dashboard-utils.service'
import { SearchService } from './services/search.service'
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { OrganisationComponent } from './dashboard/organisation/organisation.component';
import { RendererService } from './dashboard/renderer/renderer.service';
import { PermissionDirective } from './directive/permission.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainMenuComponent,
    SearchComponent,
    CommunityListComponent,
    CourseConsumptionDashboardComponent,
    ProfileComponent,
    AuthGuardComponent,
    OrganisationComponent,
    PermissionDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SuiModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    RouteResolveService,
    ProfileService,
    PermissionService,
    AuthGuard,
    CourseConsumptionService,
    OrganisationService,
    DashboardUtilsService,
    RendererService,
    SearchService
  ],
    entryComponents: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
