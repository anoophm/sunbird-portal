
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ResourceService, Announcement } from '../../index';
import * as _ from 'lodash';
import * as moment from 'moment';
/**
 * AnnouncementInboxCard is a shared component contains announcement inbox card
 */
@Component({
  selector: 'app-announcement-inbox-card',
  templateUrl: './announcement-inbox-card.component.html',
  styleUrls: ['./announcement-inbox-card.component.css']
})

export class AnnouncementInboxCardComponent implements OnInit {
  /**
   * Property of ResourceService used to render resourcebundels
   */
    resourceService: ResourceService;
  /**
   * announcement is used to render the Announcement values in the view
   */
  @Input() announcement: Announcement;
  /**
   * The "constructor"
   *
   * @param {ResourceService} resourceService  Resource Service is used to render resourcebundels
   */

  constructor( resourceService: ResourceService) {
    this.resourceService = resourceService;
   }

  ngOnInit() {
  }

}
