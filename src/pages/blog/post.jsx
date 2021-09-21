import React, { useEffect } from 'react';
import blog from '../../constants/blog';
import { useParams, Link } from 'react-router-dom';
import './index.css';

function Post() {
  const params = useParams();
  useEffect(() => {
    document.title = 'Pair Care | Post';
  }, []);

  let attributes;
  if (params.id == 1) {
    attributes = blog.featured
  } else {
    attributes = blog.posts.find((post) => post.id == params.id)
  }

  return (
    <div className="blog page-container" style={{maxWidth: '600px'}}>
      <h1>{attributes.title}</h1>
      <img src={attributes.img} alt={attributes.title} style={{width: '100%'}} />
      <h3 className="secondary-color">{attributes.date} - {attributes.time} read</h3>

      <div dangerouslySetInnerHTML={{__html: attributes.html}} />

      <div className="mt-30">
        <Link to="/blog">
          &#8249; Back to Blog List
        </Link>
      </div>
    </div>
  )
}

export default Post;