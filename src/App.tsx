import { NewsList } from "./pages/NewsList";
import { Route, Routes } from "react-router-dom";
import { NewsDetail } from "./pages/NewsDetail";
import { NewsItem } from "./types";
import { useEffect, useState } from "react";
import { getNewStoriesIds, getNewStories } from "./api";
import { Header } from "./components/Header";
import { Container } from "@mui/system";
import { Loading } from "./components/Loading";

function App() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadStories = async () => {
    setLoading(true);
    const newStoriesIds = await getNewStoriesIds();
    const storiesData = await getNewStories(newStoriesIds.slice(0, 100));
    const sortedStoriesData = storiesData.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
    setNews(sortedStoriesData);
    setLoading(false);
  };

  useEffect(() => {
    loadStories();
    const intervalId = setInterval(() => loadStories(), 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleRefreshClick = () => {
    loadStories();
  };

  return (
    <>
      <Header />
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <NewsList news={news} handleRefreshClick={handleRefreshClick} />
              }
            />
            <Route path="/news/:id" element={<NewsDetail news={news} />} />
          </Routes>
        )}
      </Container>
    </>
  );
}

export default App;
