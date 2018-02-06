import { Injectable } from '@angular/core';
import { DataService } from '../../services/data/data.service'
import { HttpClient } from '@angular/common/http';
import { DashboardUtilsService } from '../../dashboard/datasource/dashboard-utils.service'
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrganisationService extends DataService  {
    constructor(
        public http: HttpClient,
        public DashboardUtils: DashboardUtilsService
        ) {
        super(http)
    }

    /**
     * @function getData
     */
    getData (apiReq: object, datasetType: string){
        let URL: string = this.DashboardUtils.constructApiUrl(apiReq, datasetType)
        let headers: object = this.DashboardUtils.getDefaultHeaders()
        const option = {
            url: this.DashboardUtils.constructApiUrl(apiReq, datasetType)
        }
        return this.get(option)
            .map((data: any) => {
                console.log('Dashboard data received: in datasource', data)
                if (data && data.responseCode === 'OK') {
                    return this.parseApiResponse(data.result, datasetType)
                } else {
                    return Observable.throw(data)
                }
                
            })
            .catch((err) => {
                return Observable.throw(err)
            })
    }

    parseApiResponse(data, datasetType){
            switch (datasetType) {
            case 'ORG_CREATION':
            return this.parseCreationData(data)
            case 'ORG_CONSUMPTION':
            return this.parseConsumptionData(data)
            default:
            return this.parseCreationData(data)
            }
    }

    parseCreationData(data){
        var contentStatus = {
            'org.creation.content[@status=published].count': ' LIVE',
            'org.creation.content[@status=draft].count': ' Created',
            'org.creation.content[@status=review].count': ' IN REVIEW'
        }

        var graphSeries = []
        var blockData = []
        _.forEach(data.snapshot, function (numericData, key) {
            switch (key) {
            case 'org.creation.authors.count':
            case 'org.creation.reviewers.count':
            case 'org.creation.content.count':
            blockData.push(numericData)
            break
            default:
            graphSeries.push(numericData.value + contentStatus[key])
            }
        })

        return {
            bucketData: data.series,
            name: data.period === '5w' ? 'Content created per week' : 'Content created per day',
            numericData: blockData,
            series: graphSeries
        }
    }

    parseConsumptionData(data){
        var blockData = []
        _.forEach(data.snapshot, (numericData, key) => {
          switch (key) {
          case 'org.consumption.content.time_spent.sum':
          case 'org.consumption.content.time_spent.average':
            blockData.push(this.DashboardUtils.secondToMinConversion(numericData))
            break
          default:
            blockData.push(numericData)
          }
        })

        return {
            bucketData: data.series,
            numericData: blockData,
            series: ''
        }
    }
}
