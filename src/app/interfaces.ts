export interface Question { 
  text: String;
  list_of_answers: String;
  type: String;
  correct_answer: String;
  id: Number;
}

export interface  Vote {
  id: Number;
  vote: Number;
}