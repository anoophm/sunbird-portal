import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppLoaderComponent } from './components/app-loader/app-loader.component';
import { PermissionDirective } from './directives/permission/permission.directive';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [AppLoaderComponent, PermissionDirective, DateFormatPipe],
  exports: [AppLoaderComponent, PermissionDirective, DateFormatPipe]
})
export class AppCommonModule { }
