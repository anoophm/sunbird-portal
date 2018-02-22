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
    const mockResponse = {}
    spyOn(service, 'post').and.callFake(() => Observable.of(mockResponse));
    service.getInboxData(params);
  }));

  it('should make outbox api call', inject([AnnouncementService], (service: AnnouncementService) => {
    const params = { data: { 'request': { 'limit': 25, 'offset': 10 } } };
    const mockResponse = {}
    spyOn(service, 'post').and.callFake(() => Observable.of(mockResponse));
    service.getOutboxData(params);
  }));
  
  it('should make received api call', inject([AnnouncementService], (service: AnnouncementService) => {
    const params = { data: { 'request': { 'announcementId': 'fa355310-0b09-11e8-93d1-2970a259a0ba', 'channel': 'web' } } };
    const mockResponse = {}
    spyOn(service, 'post').and.callFake(() => Observable.of(mockResponse));
    service.receivedAnnouncement(params);
  }));
  
  it('should make read api call', inject([AnnouncementService], (service: AnnouncementService) => {
    const params = { data: { 'request': { 'announcementId': 'fa355310-0b09-11e8-93d1-2970a259a0ba', 'channel': 'web' } } };
    const mockResponse = {}
    spyOn(service, 'post').and.callFake(() => Observable.of(mockResponse));
    service.readAnnouncement(params);
  }));
  
  it('should make delete api call', inject([AnnouncementService], (service: AnnouncementService) => {
    const params = { data: { 'request': { 'announcementId': 'fa355310-0b09-11e8-93d1-2970a259a0ba'} } };
    const mockResponse = {}
    spyOn(service, 'delete').and.callFake(() => Observable.of(mockResponse));
    service.deleteAnnouncement(params);
  }));
  
});
