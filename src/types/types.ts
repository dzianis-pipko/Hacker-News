export interface StoryItem {
  id: number;
	title: string;
	url: string;
	date: Date;
	author: string;
	rating: number;
	countComments: number;
	kids: number[];
	text: string;
	parent: string;
}

export interface CommentItem {
  id: number;
  date: Date;
	author: string;
	kids: number[]| undefined;
	text: string;
  parent: string;
	type: string;
}