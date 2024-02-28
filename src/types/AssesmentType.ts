export interface AssesmentType {
  message:     string;
  assessments: Assessments;
  [key: string]: any;
}

export interface Assessments {
  title:     string;
  assesment: AssesmentElement[];
  _id:       string;
  __v:       number;
}

export interface AssesmentElement {
  question:           string;
  answers:            string[];
  correctAnswerIndex: number;
  _id:                string;
}
