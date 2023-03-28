import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { StoryDetailScreen } from "../screens/StoryDetailScreen";
import { StoriesScreen } from "../screens/StoriesScreen";

export const RootNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StoriesScreen />} />
        <Route path="news/:id" element={<StoryDetailScreen />} />
      </Route>
    </Routes>
  );
};
