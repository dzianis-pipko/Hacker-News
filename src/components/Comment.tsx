import { Typography, Card, CardActionArea } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { getNewStory } from "../api";
import { NewsItem } from "../types";
import { Loading } from "./Loading";
import { Comments } from "./Comments";

interface CommentProps {
  commentId: number;
  refresh: boolean;
}

export const Comment = memo(({ commentId, refresh }: CommentProps) => {
  const [comment, setComment] = useState<NewsItem>();
  const [loading, setLoading] = useState<boolean>(false);

  const loadComment = async () => {
    setLoading(true);
    const commentData = await getNewStory(commentId);
    setComment(commentData);
    setLoading(false);
  };

  useEffect(() => {
    loadComment();
  }, [refresh]);

  return (
    <>
      {comment && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <Card
              sx={{ mixWidth: 345, mb: 3, mt: 3, backgroundColor: "#edf3f1" }}
            >
              <CardActionArea sx={{ padding: 2 }}>
                <Typography gutterBottom variant="h6" component="div">
                  Author: {comment.author}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Text: {comment.text}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Parent: {comment.parent}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {comment.date.toLocaleDateString()}
                </Typography>
                {comment.kids && (
                  <Comments refresh={refresh} commentsIds={comment.kids} />
                )}
              </CardActionArea>
            </Card>
          )}
        </>
      )}
    </>
  );
});
