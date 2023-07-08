import { TweetInterface } from 'interfaces/tweet';
import { GetQueryInterface } from 'interfaces';

export interface MediaInterface {
  id?: string;
  type: string;
  url: string;
  tweet_id: string;
  created_at?: any;
  updated_at?: any;

  tweet?: TweetInterface;
  _count?: {};
}

export interface MediaGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  url?: string;
  tweet_id?: string;
}
