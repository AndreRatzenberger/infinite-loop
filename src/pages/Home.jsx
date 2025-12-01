import { Link } from "react-router-dom";
import { posts } from "../posts/registry";
import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [hoveredPost, setHoveredPost] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #0a0a0f 0%, #0f0f18 50%, #0a0a0f 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Noise overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <header
        style={{
          padding: "80px 40px 60px",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(48px, 10vw, 96px)",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-4px",
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              background: "linear-gradient(135deg, #fff 0%, #52525b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
            }}
          >
            INFINITE LOOP
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#52525b",
              marginTop: "16px",
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: "-0.5px",
            }}
          >
            Interactive essays & explorable ideas
          </p>
        </div>
      </header>

      {/* Posts grid */}
      <main
        style={{
          padding: "0 40px 80px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "24px",
          }}
        >
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              to={`/${post.slug}`}
              style={{
                display: "block",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1 + 0.2}s`,
              }}
              onMouseEnter={() => setHoveredPost(post.slug)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <article
                style={{
                  background:
                    hoveredPost === post.slug
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(255,255,255,0.02)",
                  border: `1px solid ${
                    hoveredPost === post.slug
                      ? post.color || "rgba(99, 102, 241, 0.5)"
                      : "rgba(255,255,255,0.06)"
                  }`,
                  borderRadius: "16px",
                  padding: "32px",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform:
                    hoveredPost === post.slug
                      ? "translateY(-4px)"
                      : "translateY(0)",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: "240px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Glow effect on hover */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, ${post.color || "#6366f1"}, transparent)`,
                    opacity: hoveredPost === post.slug ? 1 : 0,
                    transition: "opacity 0.4s",
                  }}
                />

                {/* Date & type */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#52525b",
                      fontFamily: '"JetBrains Mono", monospace',
                    }}
                  >
                    {post.date}
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: post.color || "#6366f1",
                      padding: "3px 8px",
                      background: `${post.color || "#6366f1"}15`,
                      borderRadius: "4px",
                      fontFamily: '"JetBrains Mono", monospace',
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {post.type}
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: 600,
                    margin: "0 0 12px 0",
                    fontFamily: '"Space Grotesk", system-ui, sans-serif',
                    color: "#f4f4f5",
                    letterSpacing: "-0.5px",
                    lineHeight: 1.3,
                  }}
                >
                  {post.title}
                </h2>

                {/* Description */}
                <p
                  style={{
                    fontSize: "14px",
                    color: "#71717a",
                    margin: 0,
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  {post.description}
                </p>

                {/* Enter indicator */}
                <div
                  style={{
                    marginTop: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#52525b",
                    fontSize: "13px",
                    fontFamily: '"JetBrains Mono", monospace',
                    opacity: hoveredPost === post.slug ? 1 : 0.5,
                    transition: "all 0.3s",
                    transform:
                      hoveredPost === post.slug
                        ? "translateX(4px)"
                        : "translateX(0)",
                  }}
                >
                  <span>Enter</span>
                  <span
                    style={{
                      fontSize: "16px",
                      transition: "transform 0.3s",
                      transform:
                        hoveredPost === post.slug
                          ? "translateX(4px)"
                          : "translateX(0)",
                    }}
                  >
                    →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "40px",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "#3f3f46",
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          Ideas rendered as experiences
        </p>
      </footer>
    </div>
  );
}
