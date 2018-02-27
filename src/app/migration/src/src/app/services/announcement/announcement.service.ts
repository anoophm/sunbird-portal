import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as  urlConf from './../../config/url.config.json';
import * as  appConfig from './../../config/app.config.json';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { AnnouncementSericeParam } from './../../interfaces';
const urlConfig = (<any>urlConf);
const pageConfig = (<any>appConfig);

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
  * Method to make api call to get inbox data.
  * It calls the post method from data service class
  *
  * @param {AnnouncementSericeParam} requestParam Request object needed for inbox API call
  */
  getInboxData(requestParam: AnnouncementSericeParam) {
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
  * It calls the post method from data service class
  *
  * @param {RequestParam} requestParam Request object needed for outbox API call
  */
  getOutboxData(requestParam: AnnouncementSericeParam) {
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
  * It calls the post method from data service class
  *
  * @param {RequestParam} requestParam Request object needed for received API call
  */
  receivedAnnouncement(requestParam: AnnouncementSericeParam) {
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
  * It calls the post method from data service class
  *
  * @param {RequestParam} requestParam Request object needed for read API call
  */
  readAnnouncement(requestParam: AnnouncementSericeParam) {
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
  * It calls the delete method from data service class
  *
  * @param {RequestParam} requestParam Request object needed for delete API call
  */
  deleteAnnouncement(requestParam: AnnouncementSericeParam) {
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
