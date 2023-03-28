import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStory } from "../services/api";
import { StoryItem } from "../types/types";
import { CommentsContainer } from "./CommentsContainer";
import { Loader } from "./Loader";

export const StoryDetailContainer = () => {
  const { id } = useParams();
  const [story, setStory] = useState<StoryItem>({} as StoryItem);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const storyId = Number(id);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const storyItem = await getStory(storyId);
      setStory(storyItem);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { title, date, author, rating, countComments, kids } = story;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Button onClick={goBack} sx={{ mt: 3 }} variant="text">
            Back
          </Button>
          <Card
            sx={{
              mixWidth: 345,
              mb: 3,
              mt: 3,
              padding: 2,
              backgroundColor: "#edf3f1",
            }}
          >
            <Typography gutterBottom variant="h4" component="h2">
              {title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Date: {date && date.toLocaleDateString()}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Author: {author}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Rating: {rating}
            </Typography>
            {countComments ? (
              <Typography variant="h6" color="text.secondary">
                Comments: {countComments}
              </Typography>
            ) : null}

            <br />
            {countComments ? (
              <Typography variant="h6">Comments:</Typography>
            ) : null}
            {kids && <CommentsContainer commentIds={kids} />}
          </Card>
        </>
      )}
    </>
  );
};
