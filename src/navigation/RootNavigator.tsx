import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { StoryDetailScreen } from "../screens/StoryDetailScreen";
import { StoriesScreen } from "../screens/StoriesScreen";
import { storiesLoader } from "../components/StoriesContainer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<StoriesScreen />} loader={storiesLoader} />
      <Route path="news/:id" element={<StoryDetailScreen />} />
    </Route>
  )
);

export const RootNavigator = () => {
  return <RouterProvider router={router} />;
};
