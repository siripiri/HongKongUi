export interface Address {
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
}

export interface ClientData {
  companyName: string;
  gstNo: string;
  address: Address;
  phoneNumber: string;
  email: string;
}
