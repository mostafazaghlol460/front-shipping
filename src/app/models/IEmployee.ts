export interface IEmployee {
  userName: any;
  email: any;
  address: any;
  phone: any;
  branch: string;
  password: any;
}

export interface updateEmployee {
  id: string;
  userName: string;
  email: string;
  branch: string;
  phone: string;
  address: string;
}

export interface getEmployee {
  name: string;
  //password:string
  branch: string;
  phoneNumber: string;
  address: string;
}

export interface getAllEmployee {
  isDeleted: any;
  id: string;
  userName: string;
  email: string;
  phone: string;
  branch: string;
}
