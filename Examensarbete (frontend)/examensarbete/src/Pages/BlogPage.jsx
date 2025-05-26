import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../Styling/BlogPage.css';

export function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    fetch("http://localhost:3001/api/blogposts")
      .then(res => res.json())
      .then(data => {
        let filtered = data;
  
        if (category) {
            filtered = data.filter(post => 
              post.category.toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-') === category.toLowerCase()
            );
          }
  
        const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(sorted);
      });
  }, [category]);

  const handleNext = () => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (posts.length === 0) return <p>Laddar blogginlägg...</p>;

  const post = posts[currentIndex];

  return (
    <div className="blogg-page">
      <h1>{post.title}</h1>
      <p><em>{post.date}</em></p>
      <p>{post.summary}</p>
      {post.image && <img src={post.image} alt={post.title} />}
      <div 
        className="blog-summary" 
        dangerouslySetInnerHTML={{ __html: post.summary }}
      />
      <div 
        className="blog-content" 
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      <div className="blogg-nav">
        <button onClick={handlePrev} disabled={currentIndex === 0}>← Föregående</button>
        <button onClick={handleNext} disabled={currentIndex === posts.length - 1}>Nästa →</button>
      </div>
    </div>
  );
}

