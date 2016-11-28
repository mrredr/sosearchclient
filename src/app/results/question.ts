import { Answer } from './answer';

export class Question {
  tags: Array <string>;
  answers: Array <Answer>;
  owner: any;
  answer_count: number;
  last_activity_date?: number;
  question_id: number;
  title: string;
  body: string;
}
