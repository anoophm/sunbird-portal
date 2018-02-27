import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import * as _ from 'lodash';
import { AnnouncementService, PaginationService, ResourceService } from '../../index';
import * as appConfig from './../../../../config/app.config.json';
const pageConfig = (<any>appConfig);

/**
 * The announcement outbox component displays all
 * the announcement which is created by the logged in user
 * have announcement creator access
 */
@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css']
})
export class OutboxComponent {

  /**
	 * Contains object of outbox list data
	 */
  outboxData: any;

  /**
	 * Contains whole object of result
	 */
  result: any;

  /**
	 * To show / hide loader
	 */
  showLoader = true;

  /**
	 * To show / hide error
	 */
  showError = false;

  /**
	 * Contains page limit of outbox list
	 */
  pageLimit = pageConfig.OUTBOX.PAGE_LIMIT;

  /**
	 * Contains page number of outbox list
	 */
  pageNumber = 1;

  /**
	 * Contains total count of outbox list
	 */
  totalCount: number;

  /**
	 * Contains object of the pager service
	 */
  pager: any;

  /**
   * To make outbox API calls
   */
  private announcementService: AnnouncementService;

  /**
   * To navigate to other pages
   */
  route: Router;

  /**
   * To get params from url
   */
  private activatedRoute: ActivatedRoute;

  /**
   * To call resource service which helps to use language constant
   */
  private resourceService: ResourceService;

  /**
   * To call pagination service
   */
  private paginationService: PaginationService;

  /**
	 * Constructor to create injected service(s) object
	 *
	 * Default method of AnnouncementService class
	 *
   * @param {AnnouncementService} announcementService To make outbox API calls
   * @param {Router} route To navigate to other pages
   * @param {ActivatedRoute} activatedRoute To get params from url
   * @param {ResourceService} resourceService To call resource service which helps to use language constant
   * @param {PaginationService} paginationService To call pagination service
	 */
  constructor(announcementService: AnnouncementService,
    route: Router,
    activatedRoute: ActivatedRoute,
    resourceService: ResourceService,
    paginationService: PaginationService) {
    this.announcementService = announcementService;
    this.route = route;
    this.activatedRoute = activatedRoute;
    this.resourceService = resourceService;
    this.paginationService = paginationService;
    this.activatedRoute.params.subscribe(params => {
      this.pageNumber = Number(params.pageNumber);
      this.renderOutbox(this.pageLimit, this.pageNumber);
    });
  }

  /**
	 * Function to render outbox list. In this method 2 parameters is passed.
   * First one is limit which helps to decide how many announcement should be displayed
   * Second one is page number which helps to show which page is getting displayed.
	 *
	 * @param {number} limit Variable to show how many announcement should be displayed
	 * @param {number} pageNumber  Variable to decide which page should be displayed
	 *
	 * @example renderOutbox(10, 1)
	 */
  renderOutbox(limit: number, pageNumber: number) {
    this.showLoader = true;
    this.pageNumber = pageNumber;
    this.pageLimit = limit;

    const option = {
      pageNumber: this.pageNumber,
      limit: this.pageLimit
    };

    this.announcementService.getOutboxData(option).subscribe(
      apiResponse => {
        this.outboxData = apiResponse.result.announcements;
        this.result = apiResponse.result;
        this.showLoader = false;
        this.totalCount = apiResponse.result.count;
        this.pager = this.paginationService.getPager(apiResponse.result.count, this.pageNumber, this.pageLimit);
      },
      err => {
        // console.log('err', err.error.params.errmsg)
        this.showError = true;
        this.showLoader = false;
      }
    );
  }

  /**
   * This method helps to navigate to different pages.
   * If page number is less than 1 or total number
   * of pages is less which is not possible, then it returns.
	 *
	 * @param {number} page Variable to know which page has been clicked
	 *
	 * @example setPage(1)
	 */
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return false;
    }
    this.pageNumber = page;
    this.route.navigate(['migration/announcement/outbox', this.pageNumber]);
  }
}
