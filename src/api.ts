import axios from 'axios';
import { NewsItem } from './types';

export const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
export const newStoriesUrl = `${baseUrl}newstories.json`;
export const itemUrl = `${baseUrl}item/`;

export const getNewStoriesIds = async (): Promise<number[]> => {
	const response = await axios.get(newStoriesUrl);
	const newsIds: number[] = response.data;
	return newsIds;
};

export const getNewStory = async (id: number): Promise<NewsItem> => {
	const response = await axios.get(`${itemUrl + id}.json`);
	const storyData = await response.data;
	
	const story: NewsItem = {
		id: storyData.id,
        title: storyData.title,
        url: storyData.url,
        date: new Date(storyData.time * 1000),
        author: storyData.by,
        rating: storyData.score,
		countComments: storyData.descendants,
		kids: storyData.kids,
		text: storyData.text,
		parent: storyData.parent
	};
	return story;
};

export const getNewStories = async (ids: number[]): Promise<NewsItem[]> => {
	const stories = await Promise.all(ids.map(getNewStory));
	return stories;
};


