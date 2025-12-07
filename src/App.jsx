import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Impressum from "./pages/Impressum";
import PostLayout from "./components/PostLayout";
import { posts } from "./posts/registry";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
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
    </>
  );
}
