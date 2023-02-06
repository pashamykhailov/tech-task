import { BannerText } from './../../constants';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  createFrom: FormGroup;
  bannerText = BannerText.bannerTextSuccess;

  showBanner = false;
  bannerFlick = 2000;

  correctAnswerOpen = false;

  addNewAnswer() {
    this.answers.push(this.fb.control(''));
  }

  get answers() {
    const controls = this.createFrom.get('list_of_answers') as FormArray;
    return controls;
  }

  get questionType() {
    const controls = this.createFrom.get('type').value;
    return controls;
  }

  constructor(private fb: FormBuilder, private http: HttpService) {}

  ngOnInit(): void {
    this.createFrom = this.fb.group({
      text: this.fb.control(''),
      list_of_answers: this.fb.array([this.fb.control('44')]),
      type: this.fb.control('1'),
      correct_answer: this.fb.control(''),
    });
  }

  removeAnswer(index) {
    this.answers.controls.splice(index, 1);
  }

  saveForm() {
    this.showBanner = true;
    this.http.postNewQuestions(this.createFrom.value).subscribe((succ) => {
      setTimeout(() => {
        this.showBanner = false;
        this.bannerText = BannerText.bannerTextSuccess;
      }, this.bannerFlick);
      this.createFrom.reset();
    }, (err) => {
      setTimeout(() => {
        this.showBanner = false;
        this.bannerText = BannerText.bannerTextError;
      }, this.bannerFlick);
      this.createFrom.reset();
    });
  }

  openDropdown() {
    this.correctAnswerOpen = !this.correctAnswerOpen;
  }

  setCorrectAnswer(value) {
    this.createFrom.get('correct_answer').setValue(value);
    this.correctAnswerOpen = false;
  }
}
