import { StoryItem } from '../types/types';

interface SelectStoryFieldsProps {
	id: number;
	title: string;
	url: string;
	time: number;
	by: string;
	score: number;
	descendants: number;
	kids: number[];
	text: string;
	parent: string;
}

export const selectStoryFields = ({id, title, url, time, by, score, descendants, kids, text, parent}: SelectStoryFieldsProps) => {
		const story: StoryItem = {
		id,
        title,
        url,
        date: new Date(time * 1000),
		author: by,
        rating: score,
		countComments: descendants,
		kids,
		text,
		parent
	};
	return story;
};