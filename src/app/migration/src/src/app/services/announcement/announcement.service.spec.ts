import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Import rxjs packages
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';

import { AnnouncementService } from './announcement.service';

describe('AnnouncementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClientModule, AnnouncementService]
    });
  });

  it('should be created', inject([AnnouncementService], (service: AnnouncementService) => {
    expect(service).toBeTruthy();
  }));

  it('should make inbox api call', inject([AnnouncementService], (service: AnnouncementService) => {
    const params = { data: { 'request': { 'limit': 25, 'offset': 10 } } };
    const mockResponse = { 'id': 'api.plugin.announcement.user.inbox', 'ver': '1.0', 'ts': '2018-02-21 07:12:21:117+0000',
    'params': { 'resmsgid': '8ee7d2d0-16d6-11e8-b881-f9ecfdfe4059', 'msgid': null, 'status': 'successful', 'err': '', 'errmsg': '' },
    'responseCode': 'OK', 'result': { 'count': 1169, 'announcements': [{ 'id': '7ffbff00-160c-11e8-b9b4-393f76d4675b',
    'from': 'asdasd', 'type': 'Circular', 'title': 'wsw', 'description': 'asda', 'links': [], 'attachments': [],
    'createdDate': '2018-02-20 07:05:57:744+0000', 'status': 'cancelled', 'target': { 'geo': { 'ids': ['01236686178285977611'] } },
    'metrics': { 'sent': 0, 'read': 0, 'received': 0 } }] } };
    spyOn(service, 'post').and.callFake(() => Observable.of(mockResponse));
    service.getInboxData(params);
  }));

  it('should make outbox api call', inject([AnnouncementService], (service: AnnouncementService) => {
    const params = { data: { 'request': { 'limit': 25, 'offset': 10 } } };
    const mockResponse = { 'id': 'api.plugin.announcement.user.outbox', 'ver': '1.0', 'ts': '2018-02-21 07:12:21:117+0000',
    'params': { 'resmsgid': '8ee7d2d0-16d6-11e8-b881-f9ecfdfe4059', 'msgid': null, 'status': 'successful', 'err': '', 'errmsg': '' },
    'responseCode': 'OK', 'result': { 'count': 1169, 'announcements': [{ 'id': '7ffbff00-160c-11e8-b9b4-393f76d4675b',
    'from': 'asdasd', 'type': 'Circular', 'title': 'wsw', 'description': 'asda', 'links': [], 'attachments': [],
    'createdDate': '2018-02-20 07:05:57:744+0000', 'status': 'cancelled', 'target': { 'geo': { 'ids': ['01236686178285977611'] } },
    'metrics': { 'sent': 0, 'read': 0, 'received': 0 } }] } };
    spyOn(service, 'post').and.callFake(() => Observable.of(mockResponse));
    service.getOutboxData(params);
  }));

  it('should make received api call', inject([AnnouncementService], (service: AnnouncementService) => {
    const params = { data: { 'request': { 'announcementId': 'fa355310-0b09-11e8-93d1-2970a259a0ba', 'channel': 'web' } } };
    const mockResponse = { 'id': 'api.plugin.announcement.user.received', 'ver': '1.0', 'ts': '2018-02-21 07:12:21:117+0000',
    'params': { 'resmsgid': '8ee7d2d0-16d6-11e8-b881-f9ecfdfe4059', 'msgid': null, 'status': 'successful', 'err': '', 'errmsg': '' },
    'responseCode': 'OK', 'result': { 'count': 1169, 'announcements': [{ 'id': '7ffbff00-160c-11e8-b9b4-393f76d4675b',
    'from': 'asdasd', 'type': 'Circular', 'title': 'wsw', 'description': 'asda', 'links': [], 'attachments': [],
    'createdDate': '2018-02-20 07:05:57:744+0000', 'status': 'cancelled', 'target': { 'geo': { 'ids': ['01236686178285977611'] } },
    'metrics': { 'sent': 0, 'read': 0, 'received': 0 } }] } };
    spyOn(service, 'post').and.callFake(() => Observable.of(mockResponse));
    service.receivedAnnouncement(params);
  }));

  it('should make read api call', inject([AnnouncementService], (service: AnnouncementService) => {
    const params = { data: { 'request': { 'announcementId': 'fa355310-0b09-11e8-93d1-2970a259a0ba', 'channel': 'web' } } };
    const mockResponse = { 'id': 'api.plugin.announcement.user.read', 'ver': '1.0', 'ts': '2018-02-21 07:12:21:117+0000',
    'params': { 'resmsgid': '8ee7d2d0-16d6-11e8-b881-f9ecfdfe4059', 'msgid': null, 'status': 'successful', 'err': '', 'errmsg': '' },
    'responseCode': 'OK', 'result': { 'count': 1169, 'announcements': [{ 'id': '7ffbff00-160c-11e8-b9b4-393f76d4675b',
    'from': 'asdasd', 'type': 'Circular', 'title': 'wsw', 'description': 'asda', 'links': [], 'attachments': [],
    'createdDate': '2018-02-20 07:05:57:744+0000', 'status': 'cancelled', 'target': { 'geo': { 'ids': ['01236686178285977611'] } },
    'metrics': { 'sent': 0, 'read': 0, 'received': 0 } }] } };
    spyOn(service, 'post').and.callFake(() => Observable.of(mockResponse));
    service.readAnnouncement(params);
  }));

  it('should make delete api call', inject([AnnouncementService], (service: AnnouncementService) => {
    const params = { data: { 'request': { 'announcementId': 'fa355310-0b09-11e8-93d1-2970a259a0ba'} } };
    const mockResponse = { 'id': 'api.plugin.announcement.cancel', 'ver': '1.0', 'ts': '2018-02-21 09:06:45:999+0000',
    'params': { 'resmsgid': '8ab1aff0-16e6-11e8-b881-f9ecfdfe4059', 'msgid': null, 'status': 'successful', 'err': '', 'errmsg': '' },
    'responseCode': 'OK', 'result': { 'status': 'cancelled' } };
    spyOn(service, 'delete').and.callFake(() => Observable.of(mockResponse));
    service.deleteAnnouncement(params);
  }));

});
