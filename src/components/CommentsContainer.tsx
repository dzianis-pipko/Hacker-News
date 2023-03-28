import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getCommentAll } from "../services/api";
import { CommentItem } from "../types/types";
import { Comments } from "./Comments";
import { Loader } from "./Loader";
interface CommentsContainerProps {
  commentIds: number[];
}

export const CommentsContainer = ({ commentIds }: CommentsContainerProps) => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toggleUpdateComments, setToggleUpdateComments] =
    useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const commentItems = await getCommentAll(commentIds);
      setComments(commentItems);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdateComments = useCallback(() => {
    setToggleUpdateComments(!toggleUpdateComments);
  }, [toggleUpdateComments]);

  useEffect(() => {
    fetchData();
  }, [toggleUpdateComments]);

  return (
    <>
      <Button onClick={handleUpdateComments} variant="outlined" sx={{ mt: 3 }}>
        Update Comments
      </Button>
      {isLoading ? <Loader /> : <Comments comments={comments} />}
    </>
  );
};
