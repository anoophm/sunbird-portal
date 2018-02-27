import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';
import { LearnerService } from './../../../../services/learner/learner.service';
import { DashboardUtilsService } from './../dashboard-utils.service';
import { Dashboard } from './../../index';

/**
 * Service to get course consumption dashboard
 *
 * It responsible to make http call
 */
@Injectable()

/**
 * @class CourseConsumptionService
 */
export class CourseConsumptionService {

  /**
   * Contains parsed snapshot data like authors and reviewers count
   */
  blockData: any;

  /**
   * Constructor - default method of CourseConsumptionService class
   *
   * @param learnerService
   * @param dashboardUtil
   */
  constructor(private learnerService: LearnerService, private dashboardUtil: DashboardUtilsService) {
  }

  /**
   * To get course consumption data by making api call
   *
   * @param {requestParam} requestParam identifier and time period
   *
   * @return {object} api response
   */
  getDashboardData(requestParam: Dashboard) {
    const paramOptions = {
      url: this.dashboardUtil.constructDashboardApiUrl(requestParam.data, 'COURSE_CONSUMPTION')
    };

    return this.learnerService.get(paramOptions)
      .map((data: any) => {
        return this.parseApiResponse(data);
      })
      .catch((err) => {
        return Observable.throw(err);
      });
  }

  /**
   * Converts course consumption time spent count and completion count from second to min(s) or hr(s)
   *
   * @param {any} data api response
   *
   * @return {object} parsed api response
   */
  parseApiResponse(data: any) {
    this.blockData = [];
    _.forEach(data.result.snapshot, (numericData, key) => {
      switch (key) {
        case 'course.consumption.time_spent.count':
        case 'course.consumption.time_spent_completion_count':
          this.blockData.push(this.dashboardUtil.secondToMinConversion(numericData));
          break;
        default:
          this.blockData.push(numericData);
      }
    });

    return {
      bucketData: data.result.series,
      numericData: this.blockData,
      series: ''
    };
  }
}
