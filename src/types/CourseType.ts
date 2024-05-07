export interface CourseType {
  _id: string;
  title: string;
  thumbnail: ThumbnailType | string;
  category: string;
  about: string;
  duration: number;
  type: string;
  startDate: string;
  endDate: Date;
  startTime: string;
  endTime: string;
  fee: number;
  strikedFee: number;
  enrolledStudents: any[];
  resources: any[];
  videos: any[];
  [key: string]: any;
}

export interface CategoryType {
  _id: string;
  category: string;
  subCategory: string[];
  [key: string]: any;
}

export interface ThumbnailType {
  type: string;
  url: string;
  [key: string]: any;
}