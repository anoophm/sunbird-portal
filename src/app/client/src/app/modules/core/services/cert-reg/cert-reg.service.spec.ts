import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ConfigService } from '@sunbird/shared';
import { configureTestSuite } from '@sunbird/test-util';
import { CertRegService } from './cert-reg.service';
import {of as observableOf,  Observable } from 'rxjs';
import { mockResponseData } from './cert-reg.service.spec.data';

describe('CertRegService', () => {
  configureTestSuite();
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
      providers: [CertRegService, ConfigService, HttpClient]
  }));

  it('should be created', () => {
    const service: CertRegService = TestBed.get(CertRegService);
    expect(service).toBeTruthy();
  });

  it('should fetch all certificates', () => {
    const certRegService: CertRegService = TestBed.get(CertRegService);
    spyOn(certRegService, 'post').and.returnValue(observableOf({}));
    const params = {
      'request': {
        '_source': ['data.badge.issuer.name', 'pdfUrl', 'data.issuedOn', 'data.badge.name'],
        'query': {
          'bool': {
            'must': [{ 'match_phrase': { 'recipient.id': '123456' } },
            { 'match_phrase': { 'related.type': 'quiz' } }]
          }
        }
      }
    };
    certRegService.fetchCertificates('123456', 'quiz');
    const options = { url: 'v1/certs/search', data: params };
    expect(certRegService.post).toHaveBeenCalledWith(options);
  });


  it('should fetch all user certificates', () => {
    const certRegService: CertRegService = TestBed.get(CertRegService);
    spyOn(certRegService, 'post').and.returnValue(observableOf({}));
    const params = {
      request: {
        filters: {
          userName: 'testUser',
          courseId: '123',
          createdBy: 'user1'
        }
      }
    };
    certRegService.getUserCertList('testUser', '123', 'user1');
    const options = { url: 'v1/user/search', data: params };
    expect(certRegService.post).toHaveBeenCalledWith(options);
  });

  it('should re issue user certificate', () => {
    const certRegService: CertRegService = TestBed.get(CertRegService);
    spyOn(certRegService, 'post').and.returnValue(observableOf({}));
    const params = {
      request: {
          courseId: '123',
          batchId: '1',
          userId: ['tes-user']
      }
    };
    certRegService.reIssueCertificate(params);
    const options = { url: 'v1/cert/reissue', data: params };
    expect(certRegService.post).toHaveBeenCalledWith(options);
  });

  it('should attach certificate to a batch', () => {
    const certRegService: CertRegService = TestBed.get(CertRegService);
    spyOn(certRegService, 'patch').and.returnValue(observableOf(mockResponseData.addCertificateMockResponse));
    const params = {
      request: {
        courseId: 'do_123456',
        batchId: '124679456',
        key: 'igotCourseTemplate',
        orgId: 'sunbird',
        criteria: {
          'user': {
            'rootOrgId': 'ORG_001'
          },
          'enrollment': {
            'status': 2
          }
        }
      }
    };
    certRegService.addCertificateTemplate(params);
    const options = { url: 'v1/add/template', data: params };
    expect(certRegService.patch).toHaveBeenCalledWith(options);
  });
});
