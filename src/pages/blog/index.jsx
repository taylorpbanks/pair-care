import React, { useEffect } from 'react';
import { Card } from '@material-ui/core';
import { Link } from 'react-router-dom';
import blog from '../../constants/blog';
import './index.css';

function BlogList() {
  useEffect(() => {
    document.title = 'Pair Care | Blog';
    window.scrollTo(0, 0)
  }, []);

  const {featured, posts} = blog;

  return (
    <div className="blog">
      <div className="welcome-bar" style={{margin: '-15px'}}>
        <h1 style={{maxWidth: '1400px', margin: '0 auto'}}>
          Care Corner
        </h1>
        <h3 className="subtext text-center">a place where we'll share helpful information to help you prepare and navigate parenthood.</h3>
      </div>
      <div className=" page-container mb-30 mt-30">
        <h2>Featured Article</h2>
        <div className="standard-flex-box">
          <div className="col-4">
            <img src={featured.img} alt={featured.title} style={{maxWidth: '100%', maxHeight: '300px'}} />
          </div>

          <div className="col-8">
            <h3 className="primary-color">{featured.title}</h3>  
            <h4 className="secondary-color">{featured.date}</h4>
            <p>
              {featured.html}
            </p>
            <div style={{width: '50%'}}>
              <Link to={`/post/${featured.id}`} className="text-right mt-15" href="#">Read More &#8250;</Link>
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>
      <div className="secondary-box" style={{marginLeft: '-15px', marginRight: '-15px', marginBottom: '-15px'}}>
        <h2 style={{maxWidth: '1400px', margin: '0 auto'}}>Recent Posts</h2>
        <div className="page-container standard-flex-box">
          {posts.map(post => (
            <Card className="col-3 item-box" variant="outlined" key={post.id} style={{ position: 'relative' }}>
              <div className="item-title">
                {post.title}
              </div>

              <div className="view-link-container">
                <Link to={`/post/${post.id}`} className="zoom-in">
                  <figure><img src={post.img} alt={post.title} style={{maxWidth: '100%', maxHeight: '300px'}} /></figure>
                </Link>
                <div className="text-right mt-30" style={{
                  fontSize: '.75em',
                  color: 'gray',
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px'
                }}>{post.date} | {post.time}</div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  </div>
  )
}

export default BlogList;