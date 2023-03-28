import { Button, Card, CardContent, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { CommentItem } from "../types/types";
import { ChildComments } from "./ChildComments";

interface CommentProps {
  comment: CommentItem;
}

export const Comment = ({
  comment: { author, text, parent, date, kids },
}: CommentProps) => {
  const [isOpenComments, setIsOpenComments] = useState<boolean>(false);

  const openChildComments = useCallback(() => {
    setIsOpenComments(!isOpenComments);
  }, []);

  return (
    <Card
      sx={{
        mixWidth: 345,
        mb: 3,
        mt: 3,
        backgroundColor: "#edf3f1",
      }}
    >
      <CardContent sx={{ padding: 2 }}>
        <Typography gutterBottom variant="h6" component="div">
          Author: {author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Text: {text}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Parent: {parent}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: {date && date.toLocaleDateString()}
        </Typography>
        {kids && (
          <Button
            onClick={openChildComments}
            variant="text"
            sx={{ mt: 1, mb: 1 }}
          >
            Open child comments
          </Button>
        )}

        {isOpenComments && kids && <ChildComments kids={kids} />}
      </CardContent>
    </Card>
  );
};
