import { NewsItem } from "../types";
import { useParams } from "react-router-dom";
import { Typography, Card, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Comments } from "../components/Comments";
import { memo, useState } from "react";

interface NewsDetailProps {
  news: NewsItem[];
}

export const NewsDetail = memo(({ news }: NewsDetailProps) => {
  const { id } = useParams();
  const newsItem = news.find((item) => item.id === Number(id));
  if (!newsItem) {
    return (
      <Typography variant="h6" component="h2">
        News not found
      </Typography>
    );
  }

  const [refresh, setRefresh] = useState<boolean>(false);

  const handleRefreshClick = () => {
    setRefresh(!refresh);
  };
  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Link to={`/`} style={{ textDecoration: "none", color: "#000" }}>
          <Button variant="text">Back</Button>
        </Link>
      </Stack>

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
          {newsItem.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Date: {newsItem.date.toLocaleDateString()}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Author: {newsItem.author}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Rating: {newsItem.rating}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Comments: {newsItem.countComments}
        </Typography>
        <a
          href={newsItem.url}
          target="_blank"
          style={{
            display: "inline-block",
            marginTop: "10px",
            textDecoration: "none",
          }}
        >
          <Typography variant="h6">Read More</Typography>
        </a>
        {newsItem.countComments && (
          <div style={{ marginTop: "90px" }}>
            <Typography gutterBottom variant="h6" component="div">
              Comments:
            </Typography>
            <Button onClick={handleRefreshClick} variant="outlined">
              Refresh comments
            </Button>
          </div>
        )}

        {newsItem.kids && (
          <Comments refresh={refresh} commentsIds={newsItem.kids} />
        )}
      </Card>
    </>
  );
});
