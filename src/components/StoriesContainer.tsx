import { Suspense, useCallback, useEffect, useState } from "react";
import { getStoryAll, getStoryIds } from "../services/api";
import { Stories } from "./Stories";
import { Loader } from "./Loader";
import { StoryItem } from "../types/types";
import { slicingStoryIds } from "../utils/slicingStories";
import { sortingStories } from "../utils/sortingStories";
import { Button } from "@mui/material";
import { ONE_MIN } from "../constants";
import { Await, defer, useLoaderData } from "react-router-dom";

export const StoriesContainer = () => {
  // const [stories, setStories] = useState<StoryItem[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toggleUpdateStories, setToggleUpdateStories] = useState<boolean>(true);
  const { stories, refetch }: any = useLoaderData();

  // const fetchData = useCallback(async () => {
  //   try {
  //     setIsLoading(true);
  //     const storyIds = await getStoryIds();
  //     const storyAll = await getStoryAll(slicingStoryIds(storyIds));
  //     setStories(sortingStories(storyAll));
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  const handleUpdateStories = useCallback(() => {
    // setToggleUpdateStories(!toggleUpdateStories);
    refetch();
  }, [toggleUpdateStories]);

  // useEffect(() => {
  //   console.log("efect");
  //   storiesLoader();
  //   const intervalId = setInterval(
  //     () => setToggleUpdateStories(!toggleUpdateStories),
  //     ONE_MIN
  //   );
  //   return () => clearInterval(intervalId);
  // }, [toggleUpdateStories]);

  // useEffect(() => {
  //   fetchData();
  //   const intervalId = setInterval(
  //     () => setToggleUpdateStories(!toggleUpdateStories),
  //     ONE_MIN
  //   );
  //   return () => clearInterval(intervalId);
  // }, [toggleUpdateStories]);

  // return (
  //   <>
  //     {isLoading ? (
  //       <Loader />
  //     ) : (
  //       <>
  //         <Suspense fallback={<Loader />}>
  //           <Await></Await>
  //         </Suspense>
  //         <Button
  //           onClick={handleUpdateStories}
  //           variant="outlined"
  //           sx={{ mt: 3 }}
  //         >
  //           Refresh
  //         </Button>
  //         <Stories stories={stories as StoryItem[]} />
  //       </>
  //     )}
  //   </>
  // );

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={stories}>
        {(resolvedStories) => (
          <>
            <Button
              onClick={handleUpdateStories}
              variant="outlined"
              sx={{ mt: 3 }}
            >
              Refresh
            </Button>
            <Stories stories={resolvedStories as StoryItem[]} />
          </>
        )}
      </Await>
    </Suspense>
  );
};

const getStories = async () => {
  const storyIds = await getStoryIds();
  const storyAll = await getStoryAll(slicingStoryIds(storyIds));
  return sortingStories(storyAll);
};

export const storiesLoader = async () => {
  console.log("storiesLoader");
  return defer({
    stories: getStories(),
  });
};
