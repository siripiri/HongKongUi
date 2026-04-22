export interface Address {
  id: number;
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
}

export interface ClientData {
  id: number;
  companyName: string;
  gst: string;
  address: Address;
  phoneNumber: string;
  email: string;
}
