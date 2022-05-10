import React from 'react';
import { connect } from 'react-redux';

const PersonHeadline = ({ profile }) => {
  console.log(profile)
  return (
    <div>
      <h1>Hello, {profile['custom:firstName']}</h1>
    </div>
  )
}



const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonHeadline);
