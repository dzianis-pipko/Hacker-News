import { StoryItem } from '../types/types';

export const sortingStories = (storyAll: StoryItem[]): StoryItem[] => {
	return storyAll.sort((a, b) => b.date.getTime() - a.date.getTime());
};