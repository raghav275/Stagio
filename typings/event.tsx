export interface Event {
  title: string;
  description: string;
  date: Date;
  time: string;
  price: number;
  id: string;
  owner: string;
  url: string;
  poster: string;
  banner?: string;
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