import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

// Modules
import { SuiModule } from 'ng2-semantic-ui';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { OutboxComponent} from '../index';
import { AnnouncementService, PagerService, ResourceService} from '../../index';
import {  AppCommonModule} from '../../index';

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
                PagerService,

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
        const mockRes = { 'id': 'api.plugin.announcement.user.outbox', 'ver': '1.0', 'ts': '2018-02-21 07:12:21:117+0000',
        'params': { 'resmsgid': '8ee7d2d0-16d6-11e8-b881-f9ecfdfe4059', 'msgid': null, 'status': 'successful', 'err': '', 'errmsg': '' },
        'responseCode': 'OK', 'result': { 'count': 1169, 'announcements': [{ 'id': '7ffbff00-160c-11e8-b9b4-393f76d4675b',
        'from': 'asdasd', 'type': 'Circular', 'title': 'wsw', 'description': 'asda', 'links': [],
        'attachments': [], 'createdDate': '2018-02-20 07:05:57:744+0000', 'status': 'cancelled',
        'target': { 'geo': { 'ids': ['01236686178285977611'] } }, 'metrics': { 'sent': 0, 'read': 0, 'received': 0 } }] } };
        spyOn(announcementService, 'getOutboxData').and.callFake(() => Observable.of(mockRes));
        component.renderOutbox(10, 1);
        expect(component.showLoader).toBe(false);
        expect(component.showDataDiv).toBe(true);
    }));

    it('should call outbox api and get error response', inject([AnnouncementService], (announcementService) => {
        const mockRes = { 'id': 'api.plugin.announcement.user.outbox', 'ver': '1.0', 'ts': '2018-02-21 07:12:21:117+0000',
        'params': { 'resmsgid': '8ee7d2d0-16d6-11e8-b881-f9ecfdfe4059', 'msgid': null, 'status': 'successful', 'err': '', 'errmsg': '' },
        'responseCode': 'OK', 'result': { 'count': 1169, 'announcements': [{ 'id': '7ffbff00-160c-11e8-b9b4-393f76d4675b', 'from': 'asdasd',
        'type': 'Circular', 'title': 'wsw', 'description': 'asda', 'links': [], 'attachments': [],
        'createdDate': '2018-02-20 07:05:57:744+0000', 'status': 'cancelled', 'target': { 'geo': { 'ids': ['01236686178285977611'] } },
        'metrics': { 'sent': 0, 'read': 0, 'received': 0 } }] } };
        spyOn(announcementService, 'getOutboxData').and.callFake(() => Observable.throw({}));
        component.renderOutbox(10, 1);
        expect(component.showLoader).toBe(false);
        expect(component.showError).toBe(true);
    }));

    it('should call setpage method', () => {
        component.pager = {};
        component.pager.totalPages = 0;
        component.setPage(1);
    });

    it('should call delete api and get success response', inject([AnnouncementService], (announcementService) => {
        const mockRes = { 'id': 'api.plugin.announcement.cancel', 'ver': '1.0', 'ts': '2018-02-21 09:06:45:999+0000',
        'params': { 'resmsgid': '8ab1aff0-16e6-11e8-b881-f9ecfdfe4059', 'msgid': null,
        'status': 'successful', 'err': '', 'errmsg': '' }, 'responseCode': 'OK', 'result': { 'status': 'cancelled' } };
        spyOn(announcementService, 'deleteAnnouncement').and.callFake(() => Observable.of(mockRes));
        component.deleteAnnouncement();
    }));

    it('should call delete api and get error response', inject([AnnouncementService], (announcementService) => {
        spyOn(announcementService, 'deleteAnnouncement').and.callFake(() => Observable.throw({}));
        component.deleteAnnouncement();
        expect(component.showError).toBe(true);
    }));
});
