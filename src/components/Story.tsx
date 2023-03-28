import { Card, CardActionArea, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StoryItem } from "../types/types";

interface StoryProps {
  story: StoryItem;
}

export const Story = ({
  story: { id, title, rating, author, date, countComments },
}: StoryProps): JSX.Element => {
  return (
    <Link
      key={id}
      to={`/news/${id}`}
      style={{ textDecoration: "none", color: "#000" }}
    >
      <Card
        key={id}
        sx={{ mixWidth: 345, mb: 3, mt: 3, backgroundColor: "#edf3f1" }}
      >
        <CardActionArea sx={{ padding: 2 }}>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {rating}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {date.toLocaleDateString()}
          </Typography>
          {countComments ? (
            <Typography variant="body2" color="text.secondary">
              Comments: {countComments}
            </Typography>
          ) : null}
        </CardActionArea>
      </Card>
    </Link>
  );
};
