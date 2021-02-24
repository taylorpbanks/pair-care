import React, { useEffect } from 'react';
import { Button, Avatar } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom';
import {
  ShareOutlined,
  ListAltOutlined,
  BuildOutlined,
} from '@material-ui/icons';
import categories from '../../constants/categories';
import './unauthorized.css';
function Unauthorized({ authState, onStateChange }) {
  const [redirect, setRedirect] = React.useState(undefined);
  useEffect(() => {
    document.title = 'Pair Care | Welcome';
  }, []);

  if (redirect) {
    return <Redirect to={redirect} />
  }

  const babyItems = categories[2];

  return (
    <div className="unauthorized">
      <div style={{position: 'relative'}}>
        <h1 className="welcome-title">
          Sharing your must-have items just got easier!
        </h1>

        <img
          src={require("../../img/bbby-toys-3.jpg")}
          alt="pair-care welcome"
          style={{maxWidth: '100%'}}
        />

        <div className="welcome-content">
          <h2 style={{marginBottom: '5px', marginTop: 0, color: 'black'}}>Let's get started</h2>

          <Button
            style={{ borderRadius: '50px', color: 'white' }}
            type="submit"
            onClick={() => setRedirect('register')}
            variant="contained"
            color="primary"
          >
            Create a List
          </Button>

          <p style={{marginTop: '30px'}}>
            Already have a list?
            &nbsp;
            <Link to="/login" style={{color: '#226d77'}}>
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <h2 style={{marginBottom: '30px', marginTop: '30px', textAlign: 'center'}} className="page-container">Why use Pair Care?</h2>
      <div className="standard-flex-box mb-30 page-container" style={{textAlign: 'center'}}>
          <div className="col-4 ">
            <ListAltOutlined fontSize="large" color="secondary" className="icons-highlights" />
            <br />
            <div className="icons-text">Create</div>
            <p>Create a list of your own recommended items</p>
          </div>

          <div className="col-4">
            <ShareOutlined fontSize="large" color="secondary" className="icons-highlights" />
            <br />
            <div className="icons-text">Share</div>
            <p>Share your list with other parents</p>
          </div>

          <div className="col-4">
            <BuildOutlined fontSize="large" color="secondary" className="icons-highlights" />
            <br />
            <div className="icons-text">Manage</div>
            <p>Manage your list as you discover new products</p>
          </div>
        </div>

        <div className="secondary-box">
          <div className="page-container standard-flex-box">
            <div className="col-6">
              <div className="avatars">
                {babyItems.slice(1).map(item => (
                  <div key={item.id} className="avatar-container">
                    <Avatar className="mr-15" style={{backgroundColor: '#226d77'}}>{item.highlighted ? item.highlighted : item.icon}</Avatar>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-6">
              <h1>That's not everything.</h1>
              <h2 className="subtext">Every Pair Care user gets access to a curated list featuring items for every stage: pre-pregnancy, pregnancy, and parent & baby.</h2>
              <Button
                style={{ borderRadius: '50px', color: 'white' }}
                type="submit"
                onClick={() => setRedirect('register')}
                variant="contained"
                color="secondary"
                size="large"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Unauthorized;