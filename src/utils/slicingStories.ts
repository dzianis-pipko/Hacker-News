import { MAX_STORIES } from '../constants';

export const slicingStoryIds = (storyIds: number[]): number[] => storyIds.slice(0, MAX_STORIES);