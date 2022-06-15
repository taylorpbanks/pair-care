import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './index.css';
import axios from 'axios';
import moment from 'moment';
import {
  MailOutline,
  Instagram,
  Pinterest,
  Facebook,
} from '@material-ui/icons';
import {
  Button
} from '@material-ui/core';

function Post() {
  const params = useParams();
  const [attributes, setAttributes] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
    .get(
      `https://public-api.wordpress.com/rest/v1/sites/paircare131120833.wordpress.com/posts/${params.id}`
    )
    .then(res => {
      setAttributes(res.data)
    })
    .catch(error => console.log(error))
    .finally(() => setIsLoading(false))

    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    document.title = `Pair Care | ${attributes?.title || ''}`;
  }, [attributes])

  if (isLoading) {
    return  null
  }

  if (!attributes?.title && !isLoading) {
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
      <img src={attributes.post_thumbnail.URL} alt={attributes.title} style={{width: '100%'}} />
      <h3 className="secondary-color">{moment(attributes.date).format("MMMM DD, YYYY")}</h3>

      <div dangerouslySetInnerHTML={{__html: attributes.content}} />

      <hr />
      <div className="mt-30">
        <a href={`https://www.pinterest.com/pin/create/button/?url=https://www.pair-care.com/post/${attributes.ID}&media=${attributes.post_thumbnail.URL}&description=${attributes.title}`} style={{textDecoration: 'none'}}>
          <Button style={{ backgroundColor: '#E50022', color: 'white', textTransform: 'capitalize', textDecoration: 'none' }}>
            <Pinterest fontSize="medium" />&nbsp;&nbsp;Pin
          </Button>
        </a>

        <a href={`https://www.facebook.com/sharer/sharer.php?u=https://www.pair-care.com/post/${attributes.ID}`} style={{textDecoration: 'none'}}>
          <Button style={{ backgroundColor: '#3A589E', color: 'white', textTransform: 'capitalize', marginLeft: '15px' }}>
            <Facebook fontSize="medium" />&nbsp;&nbsp;Share
          </Button>
        </a>

        <br />
        <br />
        <Link to="/blog" className="pt-15">
          &#8249; Back to Blog List
        </Link>
      </div>
    </div>
  )
}

export default Post;