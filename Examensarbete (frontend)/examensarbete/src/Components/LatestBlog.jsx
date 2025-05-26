import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styling/LatestBlogPosts.css';

export function LatestBlogPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/blogposts')
      .then(res => res.json())
      .then(data => {
        // Sortera efter datum (nyast först) och ta de tre första
        const sorted = data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);
        setPosts(sorted);
      })
      .catch(err => {
        console.error("Kunde inte hämta blogginlägg:", err);
      });
  }, []);

  return (
    <div className="latest-blogs">
      <h2>Senaste blogginlägg</h2>
      <div className="blog-posts-container"> {/* Flexbox container */}
        {posts.map(post => (
          <div key={post.id} className="blog-post">
            <Link to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <h3>{post.title}</h3>
            </Link>

            <p>{post.summary}</p>

            {post.image && (
              <img src={post.image} alt={post.title} />
            )}
            <div><small>{post.date}</small></div>
          </div>
        ))}
      </div>
      <Link to="/blogg/casa-de-papel" className="read-more-link">Läs fler blogginlägg →</Link>
    </div>
  );
}
