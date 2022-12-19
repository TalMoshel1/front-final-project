export interface UserInterface  {
    _id?: string;
    fullname?: string;
    following?: [];
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
    user?: {
      _id?: string;
      username?: string;
      media?: string;
      following?: string[];
    },
    signOut: () => void,
    updateUser: (user: any, location: string ) => void  
  }

