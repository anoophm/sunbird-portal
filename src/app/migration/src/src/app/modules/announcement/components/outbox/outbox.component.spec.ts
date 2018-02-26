import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import * as testData from './outbox.component.spec.data';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

// Modules
import { SuiModule } from 'ng2-semantic-ui';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { OutboxComponent } from '../index';
import { AnnouncementService, PaginationService, ResourceService } from '../../index';
import { AppCommonModule } from '../../index';

import * as appConfig from './../../../../config/app.config.json';
const pageConfig = (<any>appConfig);

describe('OutboxComponent', () => {
    let component: OutboxComponent;
    let fixture: ComponentFixture<OutboxComponent>;
    const fakeActivatedRoute = { 'params': Observable.from([{ 'pageNumber': 1 }]) };
    class RouterStub {
        navigate = jasmine.createSpy('navigate');
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OutboxComponent],
            imports: [HttpClientTestingModule,
                SuiModule,
                AppCommonModule],
            providers: [HttpClientModule, AnnouncementService,
                PaginationService,

                ResourceService,
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useValue: fakeActivatedRoute }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OutboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call outbox api and get success response', inject([AnnouncementService], (announcementService) => {
        spyOn(announcementService, 'getOutboxData').and.callFake(() => Observable.of(testData.mockRes.outBoxSuccess));
        component.renderOutbox(5, 1);
        const params = { pageNumber: 2, limit: 1 };
        announcementService.getOutboxData(params).subscribe(
            apiResponse => {
                expect(apiResponse.responseCode).toBe('OK');
                expect(apiResponse.result.count).toBe(1169);
                expect(apiResponse.params.status).toBe('successful');
            }
        );
        fixture.detectChanges();
        expect(component.showLoader).toBe(false);
        expect(component.pageNumber).toBe(1);
        expect(component.pageLimit).toBe(5);
    }));

    it('should call outbox api and get error response', inject([AnnouncementService], (announcementService) => {
        spyOn(announcementService, 'getOutboxData').and.callFake(() => Observable.throw(testData.mockRes.outboxError));
        component.renderOutbox(10, 3);
        const params = {};
        announcementService.getOutboxData({}).subscribe(
            apiResponse => {},
            err => {
                expect(err.params.errmsg).toBe('Cannot set property of undefined');
                expect(err.params.status).toBe('failed');
                expect(err.responseCode).toBe('CLIENT_ERROR');
            }
        );
        fixture.detectChanges();
        expect(component.showLoader).toBe(false);
        expect(component.showError).toBe(true);
        expect(component.pageNumber).toBe(3);
        expect(component.pageLimit).toBe(10);
    }));

    it('should call setpage method and set proper page number', () => {
        component.pager = {};
        component.pager.totalPages = 10;
        component.setPage(3);
        fixture.detectChanges();
        expect(component.pageNumber).toEqual(3);
        expect(component.pageLimit).toEqual(pageConfig.OUTBOX.PAGE_LIMIT);
    });

    it('should call setpage method and page number should be default, i,e 1', () => {
        component.pager = {};
        component.pager.totalPages = 0;
        component.setPage(3);
        fixture.detectChanges();
        expect(component.pageNumber).toEqual(1);
        expect(component.pageLimit).toEqual(pageConfig.OUTBOX.PAGE_LIMIT);
    });

    it('should call deleteAnnouncement', () => {
        component.deleteAnnouncement('7ffbff00-160c-11e8-b9b4-393f76d4675b');
        fixture.detectChanges();
        expect(component).toBeTruthy();
        expect(component.pageLimit).toEqual(pageConfig.OUTBOX.PAGE_LIMIT);
        expect(component.pageNumber).toEqual(1);
    });
});
