export interface CourseType {
  _id:              string;
  title:            string;
  thumbnail:        string;
  category:         string;
  about:            string;
  duration:         number;
  type:             string;
  startDate:        Date;
  endDate:          Date;
  startTime:        string;
  endTime:          string;
  fee:              number;
  strikedFee:       number;
  enrolledStudents: any[];
  resources:        any[];
  videos:           any[];
}
