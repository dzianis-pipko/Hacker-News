import { useCallback, useEffect, useState } from "react";
import { getStoryAll, getStoryIds } from "../services/api";
import { Stories } from "./Stories";
import { Loader } from "./Loader";
import { StoryItem } from "../types/types";
import { slicingStoryIds } from "../utils/slicingStories";
import { sortingStories } from "../utils/sortingStories";
import { Button } from "@mui/material";
import { ONE_MIN } from "../constants";

export const StoriesContainer = () => {
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toggleUpdateStories, setToggleUpdateStories] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const storyIds = await getStoryIds();
      const storyAll = await getStoryAll(slicingStoryIds(storyIds));
      setStories(sortingStories(storyAll));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdateStories = useCallback(() => {
    setToggleUpdateStories(!toggleUpdateStories);
  }, [toggleUpdateStories]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(
      () => setToggleUpdateStories(!toggleUpdateStories),
      ONE_MIN
    );
    return () => clearInterval(intervalId);
  }, [toggleUpdateStories]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Button
            onClick={handleUpdateStories}
            variant="outlined"
            sx={{ mt: 3 }}
          >
            Refresh
          </Button>
          <Stories stories={stories} />
        </>
      )}
    </>
  );
};
