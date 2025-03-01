export interface IProfile {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female';
    image: string;    
  }