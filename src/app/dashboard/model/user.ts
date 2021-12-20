import { vehicle } from './vehicle';
import { rol } from './rol';

export interface user {
  id?:number;
  email: string;
  fullName: string;
  address: string;
  cellPhone: string;
  isAccepted: boolean;
  isDeleted: boolean;
  observations: string;
  password: string;
  vehicle?: vehicle;
  rol?: rol;
}
