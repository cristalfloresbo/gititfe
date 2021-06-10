import { User } from "./user.model";

export interface Ad {
  adId: number;
  type: string;
  workAreaName: string;
  fee: number;
  address: string;
  requiredTime: number;
  description: string;
  createdAt: string;
  user: User;
}
