import axios from 'axios';
import queryString from 'query-string';
import { TweetInterface, TweetGetQueryInterface } from 'interfaces/tweet';
import { GetQueryInterface } from '../../interfaces';

export const getTweets = async (query?: TweetGetQueryInterface) => {
  const response = await axios.get(`/api/tweets${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTweet = async (tweet: TweetInterface) => {
  const response = await axios.post('/api/tweets', tweet);
  return response.data;
};

export const updateTweetById = async (id: string, tweet: TweetInterface) => {
  const response = await axios.put(`/api/tweets/${id}`, tweet);
  return response.data;
};

export const getTweetById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/tweets/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTweetById = async (id: string) => {
  const response = await axios.delete(`/api/tweets/${id}`);
  return response.data;
};
