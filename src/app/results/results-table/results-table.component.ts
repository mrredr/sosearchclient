import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Question } from '../question';

@Component({
  selector: 'results-table',
  styleUrls: [
    './results-table.component.scss'
  ],
  template: `
    <h2>{{title}}</h2>
    <table>
      <tr>
        <th>Question</th>
        <th>Author</th>
        <th>Tags</th>
      </tr>
      <tr *ngFor="let question of questions;">
        <td>
          <span
            class="link"
            (click)="openQuestion(question.question_id)"
            [innerHTML]="question.title"></span>
        </td>
        <td>
          <span
            class="link link--action"
            (click)="showPopularQuestionsOfAuthor(question.owner.user_id, $event)">
            {{question.owner.display_name}}</span><br>
        </td>
        <td>
          <span
            class="link link--action"
            *ngFor="let tag of question.tags"
            (click)="showPopularQuestionsOfTag(tag, $event)">
            {{tag}} </span>
        </td>
      </tr>
    </table>
  `
})
export class ResultsTableComponent implements OnInit {
  @Input () title: string;
  @Input () questions: Array<Question>;
  @Output () onQuickViewOpen = new EventEmitter<any>();

  // TypeScript public modifiers
  constructor(public route: ActivatedRoute, public router: Router) {

  }

  ngOnInit(): void {

  }

  showPopularQuestionsOfTag(tag, event) {
    this.onQuickViewOpen.emit({query: {tag: tag}, event: event});
  }

  showPopularQuestionsOfAuthor(user_id, event) {
    this.onQuickViewOpen.emit({query: {user_id: user_id}, event: event});
  }

  openQuestion (id: number) {
    this.router.navigate(['/results', id]);
  }
}
