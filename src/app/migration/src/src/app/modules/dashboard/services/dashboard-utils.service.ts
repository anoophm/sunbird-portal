import { Injectable } from '@angular/core';
import * as  urlConfig from '../../../config/url.config.json';
const urlsConfig = (<any>urlConfig);

/**
 * Dashboard utils service
 * 
 * It contains all dashboard related common function
 */
@Injectable()

/**
 * @class DashboardUtilsService
 */
export class DashboardUtilsService {

	/**
	 * Dataset types to hold course and organization api urls 
	 */
	datasetType: object = {}

	/**
	 * Default method of DashboardUtilsService class
	 */
	constructor() {
		this.datasetType = {
			'ORG_CREATION': urlsConfig.URLS.DASHBOARD.ORG_CREATION,
			'ORG_CONSUMPTION': urlsConfig.URLS.DASHBOARD.ORG_CONSUMPTION,
			'COURSE_PROGRESS': urlsConfig.URLS.DASHBOARD.COURSE_PROGRESS,
			'COURSE_CONSUMPTION': urlsConfig.URLS.DASHBOARD.COURSE_CONSUMPTION
		}
	}

	/**
	 * Construct download report api url
	 * 
	 * @param {object} data    content identifier and time period 
	 * @param {string} dataset dashboard type creation and consumption
	 * 
	 * @return {string} constructed download report url
	 */
	constructDownloadReportApiUrl(data, dataset: string) {
		return this.datasetType[dataset] + '/' + data.identifier + '/export?period=' +
			data.timePeriod + '&format=csv';
	}

	/**
	 * Construct dashboard api url
	 * 
	 * @param {object} data    identifier and time period
	 * @param {string} dataset dashboard type creation and consumption
	 * 
	 * @return {string} constructed dashboard api url
	 */
	constructDashboardApiUrl(data, dataset: string) {
		return this.datasetType[dataset] + '/' + data.identifier + '?period=' + data.timePeriod
	}

	/**
	 * Convert second(s) into min(s) or hr(s)
	 * 
	 * @param {any} numericData dashboard snapshot numeric data
	 */
	secondToMinConversion(numericData: any) {
		let num
		if (numericData.value < 60) {
			numericData.value += ' second(s)'
		} else if (numericData.value >= 60 && numericData.value <= 3600) {
			num = numericData.value / 60
			numericData.value = num.toFixed(2) + ' min(s)'
		} else if (numericData.value >= 3600) {
			num = numericData.value / 3600
			numericData.value = num.toFixed(2) + ' hour(s)'
		} else {
			return numericData
		}

		return numericData
	}
}
