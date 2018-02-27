// Import NG core testing module(s)
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Import modules
import { SuiModule } from 'ng2-semantic-ui';
import { SlickModule } from 'ngx-slick';
import 'rxjs/add/operator/mergeMap';
// Import services
import { AnnouncementService, UserService, ResourceService, CoursesService, LearnerService, CourseStub, UserStub } from '../../index';
import { MainHomeComponent } from './main-home.component';
import { AppCommonModule } from '../../../common/common.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MainHomeComponent', () => {
  let component: MainHomeComponent;
  let fixture: ComponentFixture<MainHomeComponent>;
  let userStub: UserStub;
  let courseStub: CourseStub;

  beforeEach(async(() => {
    userStub = new UserStub();
    courseStub = new CourseStub();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SuiModule, SlickModule, HttpClientModule, AppCommonModule],
      declarations: [MainHomeComponent],
      providers: [UserService, CoursesService, ResourceService, LearnerService, AnnouncementService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(MainHomeComponent, {
        set: {
          providers: [
            { provide: UserService, useClass: UserStub },
            { provide: CoursesService, useClass: CourseStub }
          ]
        }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MainHomeComponent);
        component = fixture.componentInstance;
      });
  }));



  it('should resolve User test data', () => {
    component.getDetails();
    fixture.detectChanges();
    expect(component.showLoader).toBeFalsy();
    expect(component.showError).toBeFalsy();
    expect(component.profileList).toBeDefined();
    expect(component.toDoList).toBeDefined();
  });


  it('should resolve course test data', () => {
    component.getCourses();
    fixture.detectChanges();
    expect(component.enrolledCourses).toBeDefined();
    expect(component.showLoader).toBeFalsy();
    expect(component.showError).toBeFalsy();
    expect(component.toDoList).toBeDefined();
  });


});
