import axios from 'axios';
import { selectStoryFields } from '../utils/selectStoryFields';
import { CommentItem, StoryItem } from '../types/types';
import { ITEM_URL, TOP_STORIES_URL } from '../constants';
import { selectCommentFields } from '../utils/selectCommentFields';

export const getStoryIds = async (): Promise<number[]> => {
	const response = await axios.get(TOP_STORIES_URL);
	return response.data;
};

export const getStory = async (storyId: number): Promise<StoryItem> => {
	const responce = await axios.get(`${ITEM_URL + storyId}.json`);
	return selectStoryFields(responce.data);
};

export const getStoryAll = async (storyIds: number[]): Promise<StoryItem[]> => {
	const storyAll: StoryItem[] = await Promise.all<Promise<StoryItem>[]>(storyIds.map(getStory));
	return storyAll;
};

export const getComment = async (commentId: number): Promise<CommentItem> => {
	const responce = await axios.get(`${ITEM_URL + commentId}.json`);
	return selectCommentFields(responce.data);
};

export const getCommentAll = async (commentIds: number[]): Promise<CommentItem[]> => {
	const commentAll: CommentItem[] = await Promise.all<Promise<CommentItem>[]>(commentIds.map(getComment));
	console.log('commentAll: ', commentAll);
	return commentAll;
};