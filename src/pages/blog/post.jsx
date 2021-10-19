import React, { useEffect, useState } from 'react';
import blog from '../../constants/blog';
import { useParams, Link } from 'react-router-dom';
import './index.css';

function Post() {
  const params = useParams();
  const [attributes, setAttributes] = useState({});

  useEffect(() => {
    if (params.id == 1) {
      setAttributes(blog.featured)
    } else {
      setAttributes(blog.posts.find((post) => post.id == params.id))
    }

    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    document.title = `Pair Care | ${attributes?.title || ''}`;
  }, [attributes])

  if (!attributes?.title) {
    document.title = `Pair Care | Oops`;
    return (
      <div className="blog page-container" style={{maxWidth: '600px'}}>
        <h1>Oops, we cannot find the page you are looking for!</h1>
        <img src={require("../../img/blog/first-baby.jpg")} style={{width: '100%'}} />
        <p>Want to read something else?</p>
        <div className="mt-30">
          <Link to="/blog">
            &#8249; Back to Blog List
          </Link>
        </div>
      </div>
    )
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