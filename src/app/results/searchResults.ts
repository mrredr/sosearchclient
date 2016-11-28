import { Question } from './question';

export class SearchResults {
  items: Array <Question>;
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}
