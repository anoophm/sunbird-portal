import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import * as testData from './delete.component.spec.data';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

// Modules
import { SuiModule } from 'ng2-semantic-ui';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { OutboxComponent } from '../index';
import { AnnouncementService, ResourceService } from '../../index';
import { AppCommonModule } from '../../index';
import { DeleteComponent } from './delete.component';

describe('DeleteComponent', () => {
  let component: DeleteComponent;
  let fixture: ComponentFixture<DeleteComponent>;
  const fakeActivatedRoute = { 'params': Observable.from([{ 'pageNumber': 10 }]) };
  class RouterStub {
    navigate = jasmine.createSpy('navigate');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteComponent],
      imports: [HttpClientTestingModule,
        SuiModule, AppCommonModule],
      providers: [HttpClientModule, AnnouncementService,
        ResourceService,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete api and get success response', inject([AnnouncementService], (announcementService) => {
    spyOn(announcementService, 'deleteAnnouncement').and.callFake(() => Observable.of(testData.mockRes.deleteSuccess));
    component.deleteAnnouncement();
    const params = { data: { 'request': { 'announcementId': 'fa355310-0b09-11e8-93d1-2970a259a0ba' } } };
    announcementService.deleteAnnouncement(params).subscribe(
      apiResponse => {
        expect(apiResponse.responseCode).toBe('OK');
        expect(apiResponse.result.status).toBe('cancelled');
        expect(apiResponse.params.status).toBe('successful');
      }
    );
    fixture.detectChanges();
    expect(component.showError).toBe(false);
  }));

  it('should call delete api and get error response', inject([AnnouncementService], (announcementService) => {
    spyOn(announcementService, 'deleteAnnouncement').and.callFake(() => Observable.throw(testData.mockRes.deleteError));
    component.deleteAnnouncement();
    const params = { data: { 'request': { 'announcementId': '' } } };
    announcementService.deleteAnnouncement(params).subscribe(
      apiResponse => {
      },
      err => {
        expect(err.params.errmsg).toBe('Unauthorized User!22');
        expect(err.params.status).toBe('failed');
        expect(err.responseCode).toBe('CLIENT_ERROR');
      }
    );
    expect(component.showError).toBe(true);
  }));

  it('should call redirect', () => {
    component.redirect();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.pageNumber).toEqual(10);
  });
});
