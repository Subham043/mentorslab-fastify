export type UserType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'blocked';
  role: 'user' | 'admin' | 'school';
  createdAt: Date;
};
