import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Results } from './results.service';
import { AppState } from '../app.service';

import { SearchResults } from './searchResults';


@Component({
  selector: 'results',
  styleUrls: [
    './results.component.scss'
  ],
  template: `
  <results-table
    class="results-table"
    [questions]="searchResultsData?.items"
    [title]="'Search results'"
    (onQuickViewOpen)="onQuickViewOpen($event)"></results-table>

  <div
    [style.top.px]="quickViewPosition?.top"
    [hidden]="hideQuickViewPanel"
    class="quick-view-panel">
    <input type="button" (click)="hideQuickViewPanel = true" value="Close panel"/>
    <div [hidden]="!showError">
      Something went wrong. Please search again
    </div>
    <results-table
      class="results-table"
      [questions]="quickViewData?.items"
      [title]="quickViewTitle"></results-table>
  </div>
  `
})
export class ResultsComponent implements OnInit {
  quickViewPosition = {top:0};
  searchResultsData: SearchResults;
  quickViewData: SearchResults;
  quickViewTitle = '';
  hideQuickViewPanel = true;

  constructor(public results: Results, public appState: AppState, public router: Router) {

  }

  ngOnInit() {
    this.searchResultsData = this.appState.get('searchResults');
  }

  onQuickViewOpen(event) {
    this.results.getDataByQuery(event.query)
      .subscribe(data => {
        this.quickViewPosition.top = event.event.pageY + 15;
        this.quickViewData = data;
        this.quickViewTitle = `Popular questions of ${JSON.stringify(event.query)}`;
        this.hideQuickViewPanel = false;
      }, err => {
        this.quickViewPosition.top = event.event.pageY + 15;
        this.quickViewTitle = 'Something went wrong. Please try again'
        this.hideQuickViewPanel = false;
      });
  }
}
