import { CommentItem } from '../types/types';

interface SelectCommentFieldsProps {
	id: number;
	time: number;
	by: string;
	score: number;
	descendants: number;
	kids: number[];
	text: string;
	parent: string;
	type: string;
}

export const selectCommentFields = ({id, time, by, kids, text, parent, type}: SelectCommentFieldsProps) => {
		const story: CommentItem = {
		id,
        date: new Date(time * 1000),
		author: by,
		kids,
		text,
		parent,
		type 
	};
	return story;
};