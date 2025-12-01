import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Impressum from "./pages/Impressum";
import PostLayout from "./components/PostLayout";
import { posts } from "./posts/registry";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/impressum" element={<Impressum />} />
      {posts.map((post) => (
        <Route
          key={post.slug}
          path={`/${post.slug}`}
          element={
            <PostLayout post={post}>
              <post.component />
            </PostLayout>
          }
        />
      ))}
    </Routes>
  );
}
