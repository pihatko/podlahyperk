"use client";

import { useEffect, useState } from "react";

type InstagramPost = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
};

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    fetch("/api/instagram")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data || []);
      });
  }, []);

  return (
    <section>
      <div>
        {posts.slice(0, 6).map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.media_type === "VIDEO" ? (
              <video
                src={post.media_url}
                muted
                playsInline
              />
            ) : (
              <img
                src={post.media_url}
                alt={post.caption || "Instagram post"}
              />
            )}
          </a>
        ))}
      </div>
    </section>
  );
}