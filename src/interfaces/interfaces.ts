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
    user?: {
        _id?: string;
        fullname?: string;
        following?: (string)[];
        username?: string;
        password?: string
        media?: string;
        email?: string;
        tokenCreatedAt?: any;
        created?: Date;
        __v?: any;
    },
    signOut: () => void,
    updateUser: (user: any, location: string ) => void  
  }

