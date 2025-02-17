export interface WorkspaceType {
  _id: string;
  title: string;
  thumbnail: ThumbnailType;
  category: string;
  about: string;
  duration: number;
  type: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  fee: number;
  strikedFee: number;
  registeredClients: any[];
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
