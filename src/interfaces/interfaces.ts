export interface UserInterface  {
    _id?: string;
    fullname?: string;
    following?: string[];
    username?: string;
    password?: string
    media?: string;
    email?: string;
    tokenCreatedAt?: any;
    created?: Date;
    __v?: any;
  }

  export type UserStore = {
    user?: UserInterface | undefined,
    signOut: () => void,
    updateUser: (user: any) => void  
  }

