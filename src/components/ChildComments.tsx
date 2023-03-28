import { useCallback, useEffect, useState } from "react";
import { getCommentAll } from "../services/api";
import { CommentItem } from "../types/types";
import { Comments } from "./Comments";
import { Loader } from "./Loader";

interface ChildCommentsProps {
  kids: number[];
}

export const ChildComments = ({ kids }: ChildCommentsProps) => {
  const [commentsChild, setCommentsChild] = useState<CommentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!kids) {
        return;
      }
      const commentItems = await getCommentAll(kids);
      setCommentsChild(commentItems);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  return <>{isLoading ? <Loader /> : <Comments comments={commentsChild} />}</>;
};
