import { MediaInterface } from 'interfaces/media';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TweetInterface {
  id?: string;
  content: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  media?: MediaInterface[];
  user?: UserInterface;
  _count?: {
    media?: number;
  };
}

export interface TweetGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  user_id?: string;
}
