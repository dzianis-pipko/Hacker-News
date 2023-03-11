import { Button, Card, CardActionArea, Typography } from "@mui/material";
import { memo } from "react";
import { Link } from "react-router-dom";
import { NewsItem } from "../types";

interface NewsListProps {
  news: NewsItem[];
  handleRefreshClick: () => void;
}

export const NewsList = memo(
  ({ news, handleRefreshClick }: NewsListProps): JSX.Element => {
    return (
      <div>
        <Button onClick={handleRefreshClick} variant="outlined" sx={{ mt: 3 }}>
          Refresh
        </Button>
        {news.map((item) => (
          <Link
            key={item.id}
            to={`/news/${item.id}`}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <Card
              key={item.id}
              sx={{ mixWidth: 345, mb: 3, mt: 3, backgroundColor: "#edf3f1" }}
            >
              <CardActionArea sx={{ padding: 2 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Rating: {item.rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Author: {item.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {item.date.toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Comments: {item.countComments}
                </Typography>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </div>
    );
  }
);
