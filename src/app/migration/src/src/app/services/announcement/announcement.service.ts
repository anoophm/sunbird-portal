import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as  urlConf from './../../config/url.config.json';
import * as  appConfig from './../../config/app.config.json';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
const urlConfig = (<any>urlConf);
const pageConfig = (<any>appConfig);

/**
 * Interface to hold api request pageNumber, limit, announcementId and data
 */
interface RequestParam {
  pageNumber?: number;
  limit?: number;
  announcementId?: string;
  data?: object;
}

/**
 * Service for all announcement API calls
 *
 * It responsible to make http call
 */
@Injectable()

/**
 * AnnouncementService extends dataservice where
 * get, post, delete etc methods are written
 */
export class AnnouncementService extends DataService {

  /**
   * Constructor - default method of AnnouncementService class
   *
   * @param {HttpClient} http To make API calls
   */
  constructor(public http: HttpClient) {
    super(http, urlConfig.URLS.ANNOUNCEMENT_PREFIX);
  }

  /**
  * Method to make api call to get inbox data
  *
  * @param {RequestParam} requestParam Request object needed for inbox API call
  */
  getInboxData(requestParam: RequestParam) {
    const option = {
      url: urlConfig.URLS.ANNOUNCEMENT.INBOX_LIST,
      data: {
        'request': {
          'limit': requestParam.limit,
          'offset': (requestParam.pageNumber - 1) * requestParam.limit
        }
      }
    };
    return this.post(option);
  }

  /**
  * Method to make api call to get outbox data
  *
  * @param {RequestParam} requestParam Request object needed for outbox API call
  */
  getOutboxData(requestParam: RequestParam) {
    const option = {
      url: urlConfig.URLS.ANNOUNCEMENT.OUTBOX_LIST,
      data: {
        'request': {
          'limit': requestParam.limit,
          'offset': (requestParam.pageNumber - 1) * requestParam.limit
        }
      }
    };
    return this.post(option);
  }

  /**
  * Method to make received api call
  *
  * @param {RequestParam} requestParam Request object needed for received API call
  */
  receivedAnnouncement(requestParam: RequestParam) {
    const option = {
      url: urlConfig.URLS.ANNOUNCEMENT.RECEIVED,
      data: {
        'request': {
          'announcementId': requestParam.announcementId,
          'channel': pageConfig.API.ANNOUNCEMENT.CHANNEL
        }
      }
    };
    return this.post(option);
  }

  /**
  * Method to make read api call
  *
  * @param {RequestParam} requestParam Request object needed for read API call
  */
  readAnnouncement(requestParam: RequestParam) {
    const option = {
      url: urlConfig.URLS.ANNOUNCEMENT.READ,
      data: {
        'request': {
          'announcementId': requestParam.announcementId,
          'channel': pageConfig.API.ANNOUNCEMENT.CHANNEL
        }
      }
    };
    return this.post(option);
  }

  /**
  * Method to make delete api call
  *
  * @param {RequestParam} requestParam Request object needed for delete API call
  */
  deleteAnnouncement(requestParam: RequestParam) {
    const option = {
      url: urlConfig.URLS.ANNOUNCEMENT.CANCEL,
      data: {
        'request': {
          'announcementId': requestParam.announcementId
        }
      }
    };
    return this.delete(option);
  }
}
