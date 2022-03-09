export interface Event {
  title: string;
  description: string;
  date: string;
  users: string[];
  time: string;
  price: number;
  id: string;
  owner: string;
  url: string;
  poster: string;
  banner?: string;
  status: number;
}
export interface Razorpay {
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  created_at: number;
  currency: string;
  entity: string;
  id: string;
  notes: string[];
  offer_id: number | null;
  receipt: string;
  status: string;
}
export enum EventStatus {
  Idle = 0,
  Started = 1,
  Ended = 2,
}

export enum BookingStatus {
  None = 0,
  Bought = 1,
  Cancelled = 2,
}
