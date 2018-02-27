import { ProfileCardComponent } from './profile-card.component';
// Import  NG core testing module(s)
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
// Import modules
import { SuiModule } from 'ng2-semantic-ui';
import 'rxjs/add/operator/mergeMap';
import { NO_ERRORS_SCHEMA } from '@angular/core';
// Import services
import { UserService, ResourceService, CoursesService, LearnerService } from '../../index';
// Test data
import * as mockData from './profile-card.component.spec.data';
const testData = mockData.mockRes;
describe('ProfileCardComponent', () => {
  let component: ProfileCardComponent;
  let fixture: ComponentFixture<ProfileCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, SuiModule],
      declarations: [ProfileCardComponent],
      providers: [ResourceService, UserService, LearnerService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCardComponent);
    component = fixture.componentInstance;
  });

  it('for success test data', () => {
    component.item = testData.successData;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div span .completness').innerText).toEqual('69');
    expect(fixture.nativeElement.querySelector('div.padding-top-5').innerText).toEqual('Add dob');
  });

  it('for no test data', () => {
    component.item = testData.parsedData;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div span .completness').innerText).toEqual('');
    expect(fixture.nativeElement.querySelector('div.padding-top-5')).toEqual(null);
  });


});
