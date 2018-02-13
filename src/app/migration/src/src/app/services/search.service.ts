import * as  urlConfig from './../config/url.config.json';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data/data.service';
import { LearnerService } from './learner/learner.service';
import { ContentService } from './content/content.service';
import { UserService } from './user/user.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
const urlsConfig = (<any>urlConfig);
@Injectable()

/**
 * @class SearchService
 * @desc  get data based on request params
 */
export class SearchService {
    /**
     * @function constructor
     * @param  {HttpClient} publichttp
     */
    constructor(public http: HttpClient, 
        public UserService: UserService, 
        public ContentService: ContentService) {
    }

    /**
     * Get list of my courses / content
     */
    getMyContent(status: Array<any>, contentType: Array<any>, params: any) {
        params.userId = 'b14e7747-e66d-49f3-8152-7a6706f0b530';
        const option = {
            url: urlsConfig.URLS.COMPOSITE.SEARCH,
            data: {
                request:{
                    filters: {
                        status: status,
                        createdBy: params.userId ? params.userId : this.UserService.userid,
                        contentType: contentType
                    },
                    sort_by: {
                        lastUpdatedOn: params.lastUpdatedOn || 'desc'
                    }
                }
            }
        };

        return this.ContentService.post(option)
            .map((data: any) => {
                if (data && data.responseCode === 'OK') {
                    return data
                } else {
                    return Observable.throw(data)
                }
            })
            .catch((err) => {
                return Observable.throw(err)
            })
    }

    /**
     * @function orgSearch
     * @desc get content by user id
     * @param {} status orgSearch
     * @param {} apiRequest
     * @return object
     */
    orgSearch(apiRequest) {
        const option = {
            url: 'private/service/v1/learner/org/v1/search',
            data: apiRequest
        };

        return this.ContentService.post(option)
            .map((data: any) => {
                if (data && data.responseCode === 'OK') {
                    return data
                } else {
                    return Observable.throw(data)
                }
            })
            .catch((err) => {
                return Observable.throw(err)
            })
    }

}
