import {
    PaginationService, ResourceService, ConfigService, ToasterService, INoResultMessage,
    ICard, ILoaderMessage, UtilService, NavigationHelperService, IPagination, LayoutService, COLUMN_TYPE
} from '@sunbird/shared';
import { SearchService, PlayerService, UserService, FrameworkService } from '@sunbird/core';
import { combineLatest, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy, EventEmitter, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash-es';
import { IInteractEventEdata, IImpressionEventInput } from '@sunbird/telemetry';
import { takeUntil, map, first, debounceTime, tap, delay } from 'rxjs/operators';
import { CacheService } from 'ng2-cache-service';

const DEFAULT_FRAMEWORK = 'CBSE';
@Component({
    templateUrl: './library-search.component.html',
    styleUrls: ['./library-search.component.scss']
})
export class LibrarySearchComponent implements OnInit, OnDestroy, AfterViewInit {

    public showLoader = true;
    public noResultMessage;
    public filterType: string;
    public queryParams: any;
    public hashTagId: string;
    public unsubscribe$ = new Subject<void>();
    public telemetryImpression: IImpressionEventInput;
    public inViewLogs = [];
    public sortIntractEdata: IInteractEventEdata;
    public dataDrivenFilters: any = {};
    public dataDrivenFilterEvent = new EventEmitter();
    public initFilters = false;
    public facets: Array<string>;
    public facetsList: any;
    public paginationDetails: IPagination;
    public contentList: Array<ICard> = [];
    public cardIntractEdata: IInteractEventEdata;
    public loaderMessage: ILoaderMessage;
    public sortingOptions;
    public redirectUrl;
    public frameworkData: object;
    public frameworkId;
    public closeIntractEdata;
    public numberOfSections = new Array(this.configService.appConfig.SEARCH.PAGE_LIMIT);
    public globalSearchFacets: Array<string>;
    public allTabData;
    public selectedFilters;
    layoutConfiguration;
    FIRST_PANEL_LAYOUT;
    SECOND_PANEL_LAYOUT;
    public totalCount;
    public searchAll;
    constructor(public searchService: SearchService, public router: Router, private playerService: PlayerService,
        public activatedRoute: ActivatedRoute, public paginationService: PaginationService,
        public resourceService: ResourceService, public toasterService: ToasterService,
        public configService: ConfigService, public utilService: UtilService,
        public navigationHelperService: NavigationHelperService, public userService: UserService,
        public cacheService: CacheService, public frameworkService: FrameworkService,
        public navigationhelperService: NavigationHelperService, public layoutService: LayoutService) {
        this.paginationDetails = this.paginationService.getPager(0, 1, this.configService.appConfig.SEARCH.PAGE_LIMIT);
        this.filterType = this.configService.appConfig.library.filterType;
        this.redirectUrl = this.configService.appConfig.library.searchPageredirectUrl;
        this.sortingOptions = this.configService.dropDownConfig.FILTER.RESOURCES.sortingOptions;
    }
    ngOnInit() {
        this.activatedRoute.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe(queryParams => {
            this.queryParams = { ...queryParams };
        });
        this.searchService.getContentTypes().pipe(takeUntil(this.unsubscribe$)).subscribe(formData => {
            this.allTabData = _.find(formData, (o) => o.title === 'frmelmnts.tab.all');
            this.globalSearchFacets = _.get(this.allTabData, 'search.facets');
            this.setNoResultMessage();
            this.initFilters = true;
        }, error => {
            this.toasterService.error(this.resourceService.frmelmnts.lbl.fetchingContentFailed);
            this.navigationhelperService.goBack();
        });

        this.initLayout();
        this.frameworkService.channelData$.pipe(takeUntil(this.unsubscribe$)).subscribe((channelData) => {
            if (!channelData.err) {
              this.frameworkId = _.get(channelData, 'channelData.defaultFramework');
            }
        });
        this.userService.userData$.subscribe(userData => {
            if (userData && !userData.err) {
                this.frameworkData = _.get(userData.userProfile, 'framework');
            }
        });
        this.dataDrivenFilterEvent.pipe(first()).
            subscribe((filters: any) => {
                this.dataDrivenFilters = filters;
                this.fetchContentOnParamChange();
                this.setNoResultMessage();
            });
            this.searchAll = this.resourceService.frmelmnts.lbl.allContent;
    }
    initLayout() {
        this.layoutConfiguration = this.layoutService.initlayoutConfig();
        this.redoLayout();
        this.layoutService.switchableLayout().
            pipe(takeUntil(this.unsubscribe$)).subscribe(layoutConfig => {
                if (layoutConfig != null) {
                    this.layoutConfiguration = layoutConfig.layout;
                }
                this.redoLayout();
            });
    }
    redoLayout() {
        if (this.layoutConfiguration != null) {
            this.FIRST_PANEL_LAYOUT = this.layoutService.redoLayoutCSS(0, this.layoutConfiguration, COLUMN_TYPE.threeToNine, true);
            this.SECOND_PANEL_LAYOUT = this.layoutService.redoLayoutCSS(1, this.layoutConfiguration, COLUMN_TYPE.threeToNine, true);
        } else {
            this.FIRST_PANEL_LAYOUT = this.layoutService.redoLayoutCSS(0, null, COLUMN_TYPE.fullLayout);
            this.SECOND_PANEL_LAYOUT = this.layoutService.redoLayoutCSS(1, null, COLUMN_TYPE.fullLayout);
        }
    }
    public getFilters(filters) {
        this.selectedFilters = filters.filters;
        const defaultFilters = _.reduce(filters, (collector: any, element) => {
            if (element.code === 'board') {
                collector.board = _.get(_.orderBy(element.range, ['index'], ['asc']), '[0].name') || '';
            }
            return collector;
        }, {});
        this.dataDrivenFilterEvent.emit(defaultFilters);
    }
    private fetchContentOnParamChange() {
        combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams)
            .pipe(debounceTime(5), // wait for both params and queryParams event to change
                tap(data => this.inView({ inview: [] })), // trigger pageexit if last filter resulted 0 contents
                delay(10), // to trigger pageexit telemetry event
                tap(data => {
                this.setTelemetryData();
                }),
                map(result => ({ params: { pageNumber: Number(result[0].pageNumber) }, queryParams: result[1] })),
                takeUntil(this.unsubscribe$)
            ).subscribe(({ params, queryParams }) => {
                this.showLoader = true;
                this.paginationDetails.currentPage = params.pageNumber;
                this.queryParams = { ...queryParams };
                this.contentList = [];
                this.fetchContents();
            });
    }
    private fetchContents() {
      let filters: any = _.omit(this.queryParams, ['key', 'sort_by', 'sortType', 'appliedFilters', 'softConstraints', 'selectedTab']);
        if (_.isEmpty(filters)) {
            filters = _.omit(this.frameworkData, ['id']);
        }
        if (!filters.channel) {
            filters.channel = this.hashTagId;
        }
        if (Object.keys(this.queryParams).length > 0) {
            filters = _.omit(filters, _.difference(this.globalSearchFacets, _.keysIn(this.queryParams)));
        }
        filters.contentType = filters.contentType || _.get(this.allTabData, 'search.filters.contentType');
        const softConstraints = _.get(this.activatedRoute.snapshot, 'data.softConstraints') || {};
        const option: any = {
            filters: filters,
            fields: _.get(this.allTabData, 'search.fields'),
            limit: _.get(this.allTabData, 'search.limit'),
            pageNumber: this.paginationDetails.currentPage,
            query: this.queryParams.key,
            mode: 'soft',
            softConstraints: softConstraints,
            facets: this.globalSearchFacets,
            params: this.configService.appConfig.ExplorePage.contentApiQueryParams || {}
        };
        if (this.frameworkId) {
            option.params.framework = this.frameworkId;
        }
        this.searchService.contentSearch(option)
            .subscribe(data => {
                this.showLoader = false;
                this.facets = this.searchService.updateFacetsData(_.get(data, 'result.facets'));
                this.facetsList = this.searchService.processFilterData(this.facets);
                this.paginationDetails = this.paginationService.getPager(data.result.count, this.paginationDetails.currentPage,
                    this.configService.appConfig.SEARCH.PAGE_LIMIT);
                this.contentList = _.get(data, 'result.content') ? this.getOrderedData(_.get(data, 'result.content')) : [];
                this.totalCount = data.result.count;
            }, err => {
                this.showLoader = false;
                this.contentList = [];
                this.facetsList = [];
                this.totalCount = 0;
                this.paginationDetails = this.paginationService.getPager(0, this.paginationDetails.currentPage,
                    this.configService.appConfig.SEARCH.PAGE_LIMIT);
                this.toasterService.error(this.resourceService.messages.fmsg.m0051);
            });
    }

    getOrderedData(contents) {
        let orderedData: [] = _.map(contents, content => {
            if (_.includes(_.get(content, 'board'), _.get(this.frameworkData, 'board[0]'))) {
                contents = _.reject(contents, { identifier: content.identifier });
                return content;
            }
        });
        orderedData = _.compact(orderedData).concat(contents);
        return orderedData || [];
    }

    public navigateToPage(page: number): void {
        if (page < 1 || page > this.paginationDetails.totalPages) {
            return;
        }
        const url = this.router.url.split('?')[0].replace(/[^\/]+$/, page.toString());
        this.router.navigate([url], { queryParams: this.queryParams });
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    private setTelemetryData() {
        this.inViewLogs = [];
        this.cardIntractEdata = {
            id: 'content-card',
            type: 'click',
            pageid: this.activatedRoute.snapshot.data.telemetry.pageid
        };
        this.closeIntractEdata = {
            id: 'search-close',
            type: 'click',
            pageid: 'library-search'
        };
        this.sortIntractEdata = {
            id: 'sort',
            type: 'click',
            pageid: 'library-search'
        };
    }
    public playContent(event) {
        this.playerService.playContent(event.data);
    }
    public inView(event) {
        _.forEach(event.inview, (elem, key) => {
            const obj = _.find(this.inViewLogs, { objid: elem.data.identifier });
            if (!obj) {
                this.inViewLogs.push({
                    objid: elem.data.identifier,
                    objtype: elem.data.contentType || 'content',
                    index: elem.id
                });
            }
        });
        if (this.telemetryImpression) {
        this.telemetryImpression.edata.visits = this.inViewLogs;
        this.telemetryImpression.edata.subtype = 'pageexit';
        this.telemetryImpression = Object.assign({}, this.telemetryImpression);
        }
    }
    ngAfterViewInit () {
        setTimeout(() => {
            this.telemetryImpression = {
                context: {
                    env: this.activatedRoute.snapshot.data.telemetry.env
                },
                edata: {
                    type: this.activatedRoute.snapshot.data.telemetry.type,
                    pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
                    uri: this.router.url,
                    subtype: this.activatedRoute.snapshot.data.telemetry.subtype,
                    duration: this.navigationhelperService.getPageLoadTime()
                }
            };
        });
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    private setNoResultMessage() {
        this.resourceService.languageSelected$.pipe(takeUntil(this.unsubscribe$))
          .subscribe(item => {
            let title = this.resourceService.frmelmnts.lbl.noBookfoundTitle;
            if(this.queryParams.key) {
              const title_part1 = _.replace(this.resourceService.frmelmnts.lbl.desktop.yourSearch, '{key}', this.queryParams.key);
              const title_part2 = this.resourceService.frmelmnts.lbl.desktop.notMatchContent;
              title = title_part1 + ' ' + title_part2;
            }
            this.noResultMessage = {
              'title': title,
              'subTitle': this.resourceService.frmelmnts.lbl.noBookfoundSubTitle,
              'buttonText': this.resourceService.frmelmnts.lbl.noBookfoundButtonText,
              'showExploreContentButton': false
            };
          });
      }
}
