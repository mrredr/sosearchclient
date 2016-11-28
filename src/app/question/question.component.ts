import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Results } from '../results/results.service';

@Component({
  selector: 'question',
  template: `
    <h2 [innerHTML]="question.answers[0].title"></h2>
    <ul class="list">
      <li class="list__item" *ngFor="let answer of question?.answers">
        <span class="list__item-body" [innerHTML]="answer.body"></span>
      </li>
    </ul>
  `
})
export class QuestionComponent implements OnInit, OnDestroy {
  localState = { searchValue: '' };
  question = {};
  subcription: any;
  // TypeScript public modifiers
  constructor(public results: Results, public route: ActivatedRoute, public router: Router) {

  }

  ngOnInit(): void {
    this.subcription = this.route.params.subscribe(function(params) {
      let id = +params['id'];
      if (!this.results.getQuestion(id)) {
        this.router.navigate(['/search']);
      } else {
        this.question = this.results.getQuestion(id);
      }
    }.bind(this));
  }

  ngOnDestroy():void {
    this.subcription.unsubscribe();
  }
}
