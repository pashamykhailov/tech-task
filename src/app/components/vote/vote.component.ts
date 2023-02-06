import { Question } from './../../interfaces';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  questions: Question[];
  openIndex;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.http.getQuestions().subscribe(
      (succ) => {
        this.questions = succ;
      },
      (err) => {
        console.log('error in getting questions ', err);
      }
    );
  }

  openAnswers(index) {
    if (this.openIndex === index) return this.openIndex = undefined;
    this.openIndex = index;
  }
  
  vote(questionId, voteId) {
    this.http.voteQuestion({id: questionId, vote: voteId}).subscribe((succ) => {
     console.log('data from success response', succ);
    },(err) => {
     console.log('error occurs ', err);
    })
  }
}
