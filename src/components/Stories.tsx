import { StoryItem } from "../types/types";
import { Story } from "./Story";

interface StoriesProps {
  stories: StoryItem[];
}

export const Stories = ({ stories }: StoriesProps) => {
  return (
    <>
      {stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </>
  );
};
