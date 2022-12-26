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
    askToLogOut: false
  }

  export type UserStore = {
    user?: UserInterface,
    signOut: () => void,
    updateUser: (user: any, location: string ) => void  
  }

