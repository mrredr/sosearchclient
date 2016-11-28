import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.service';
import { Results } from '../results/results.service';
import { SearchResults } from './results/searchResults';

@Component({
  selector: 'search',
  styleUrls: ['./search.component.css'],
  template: `
    <form (ngSubmit)="submitForm(searchValue)">
      <input
        required
        [value]="searchValue"
        (input)="searchValue=$event.target.value">
      <button>Search</button>
    </form>

    <div [hidden]="!showError">
      Something went wrong. Please search again
    </div>
  `
})
export class SearchComponent implements OnInit {
  searchValue: string;
  showError: boolean;

  constructor(public appState: AppState, public router: Router, public results: Results) {

  }

  ngOnInit() {
    this.searchValue = this.appState.get('searchValue') || '';
    this.appState.set('searchResults', '');
  }

  submitForm(value: string) {
    if (value.trim() !== '') {
      this.showError = false;
      this.appState.set('searchValue', value);
      this.results.getDataByString(this.appState.get('searchValue'))
        .subscribe(
          data => {
            this.router.navigate(['results'])
            this.appState.set('searchValue', '');
          },
          err => {this.showError = true;});
    }
  }

  ngOnDestroy() {
  }
}
