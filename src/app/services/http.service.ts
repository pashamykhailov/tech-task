import { Question, Vote } from './../interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postNewQuestions(body: Question) {
    return this.http.post(`${environment.api}/questions`, body);
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${environment.api}/questions`);
  }

  voteQuestion(body: Vote) {
    return this.http.put<Vote>(`${environment.api}/questions/vote`, body);
  }
}
