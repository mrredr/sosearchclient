import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { SearchResults } from './searchResults';
import { Question } from './question';
import { Config } from '../app.config';

import { AppState } from '../app.service';

@Injectable()
export class Results {


  constructor(public http: Http, public appState: AppState) {

  }

  getDataByString(query): Observable<SearchResults> {
    // return this.http.get('/assets/results.json')
    return this.http.get(Config.apiUrls.searchByString(query))
      .map(res => {
      this.appState.set('searchResults', res.json());
      return res.json();
    })
    .catch((error: Response | any) => {
      return Observable.throw('Error in Results.getData');
    });
  }

  getDataByQuery(query): Observable<SearchResults> {
    if (query.tag) {
      return this.getPopularQuestionsByTag(query.tag);
    } else if (query.user_id) {
        return this.getPopularQuestionsByUser(query.user_id);
    }
  }

  getPopularQuestionsByUser(user_id): Observable<SearchResults> {
    return this.http.get(Config.apiUrls.popularQuestoinsOfUser(user_id))
      .map(res => {
        this.appState.set('quickViewQuestions', res.json());
        return res.json();
      })
      .catch((error: Response | any) => {
        return Observable.throw('Error in Results.getData');
      });
  }

  getPopularQuestionsByTag(tag): Observable<SearchResults> {
    return this.http.get(Config.apiUrls.popularQuestionsOfTag(tag))
      .map(res => {
        this.appState.set('quickViewQuestions', res.json());
        return res.json();
      })
      .catch((error: Response | any) => {
        return Observable.throw('Error in Results.getData');
      });
  }

  getQuestion(id: number): Question {
    if (this.appState.state.hasOwnProperty('searchResults')) {
      var result = this.appState.get('searchResults').items.find((question) => {
        return question.question_id === id;
      });
      if (!result) {
        if (this.appState.state.hasOwnProperty('quickViewQuestions')) {
          result = this.appState.get('quickViewQuestions').items.find((question) => {
            return question.question_id === id;
          });
          if (result) {
            return result;
          } else {
            return null;
          }
        }
      } else {
        return result;
      }
    }

  }
}
