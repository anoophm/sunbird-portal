import { PagerService } from './../../../../services/pagination/pagination.service';
import { AnnouncementService } from './../../../../services/announcement/announcement.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import * as _ from 'lodash';
import { ResourceService } from './../../../../services/resource/resource.service';

/**
 * The announcement outbox component
 * 
 * Display announcement outbox list
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
	 * Contains unique announcement id
	 */
  announcementId: string;

  /**
	 * To show / hide loader
	 */
  showLoader: boolean = true;

  /**
	 * To show / hide listing block
	 */
  showDataDiv: boolean = false;

  /**
	 * To show / hide error
	 */
  showError: boolean = false;

  /**
	 * To show / hide delete confirm box
	 */
  showDeleteModal: boolean = false;

  /**
	 * Contains page limit of outbox list
	 */
  pageLimit: number = 25;

  /**
	 * Contains page number of outbox list
	 */
  pageNumber: number = 1;

  /**
	 * Contains total count of outbox list
	 */
  totalCount: number;

  /**
	 * Contains object of the pager service
	 */
  pager: any;

  /**
	 * Constructor to create injected service(s) object
	 * 
	 * Default method of AnnouncementService class
	 * 
   * @param {AnnouncementService} AnnouncementService To make API calls
   * @param {Router} Route To navigate to other pages
   * @param {ActivatedRoute} ActivatedRoute To get params from url
   * @param {ResourceService} resourceService To call resource service which helps to use language constant
   * @param {PagerService} PagerService To call pagination service
	 */
  constructor(private AnnouncementService: AnnouncementService,
    private Route: Router,
    private ActivatedRoute: ActivatedRoute,
    public resourceService: ResourceService,
    private PagerService: PagerService) {
    this.ActivatedRoute.params.subscribe(params => {
      this.pageNumber = Number(params.pageNumber)
      this.renderOutbox(this.pageLimit, this.pageNumber)
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
    this.showLoader = true
    this.showDataDiv = false
    this.pageNumber = pageNumber
    this.pageLimit = limit

    const option = {
      pageNumber: this.pageNumber,
      limit: this.pageLimit
    }

    this.AnnouncementService.getOutboxData(option).subscribe(
      apiResponse => {
        this.outboxData = apiResponse.result.announcements
        this.result = apiResponse.result
        this.showLoader = false
        this.showDataDiv = true
        this.totalCount = apiResponse.result.count
        this.pager = this.PagerService.getPager(apiResponse.result.count, this.pageNumber, this.pageLimit)
      },
      err => {
        // console.log('err', err.error.params.errmsg)
        this.showError = true
        this.showLoader = false
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
      return
    }
    this.pageNumber = page
    this.Route.navigate(['migration/announcement/outbox', this.pageNumber])
  }

  /**
   * This method calls the delete API with a particular announcement
   * id and and changes the status to cancelled of that particular 
   * announcement.
	 * 
	 */
  deleteAnnouncement() {
    const option = {announcementId: this.announcementId}
    this.AnnouncementService.deleteAnnouncement(option).subscribe(
      apiResponse => {
        console.log('deleted')
        this.renderOutbox(this.pageLimit, this.pageNumber)
      },
      err => {
         //console.log('err', err.error.params.errmsg)
        this.showError = true
      }
    );
  }
}
