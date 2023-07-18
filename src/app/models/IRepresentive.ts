export interface IRepresentive {
  userName: any;
  email: any;
  password: any;
  address: any;
  phone: any;
  branch: string;

  type_of_discount: number;
  percent: number;
  governate: string;
}

export interface updateRepresentative {
  id: string;
  userName: any;
  email: any;
  branch: string;
  phone: any;
  address: any;
  percent: number;
  type_of_discount: number;
  governate: string;
}

export interface getRepresentative {
  userName: string;
  email: string;
  branch: number;
  phone: any;
  address: string;
  percent: number;
  type_of_discount: number;
  governate: string;
}

export interface getAllRepresentative {
  id: string;
  userName: string;
  email: string;
  phone: string;
  branch: string;
  governate: string;
  type_of_discount: number;
  percent: number;
}
