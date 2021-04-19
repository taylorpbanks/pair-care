import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ActionCreators as actions } from '../../redux/share/actions';
import {
  Grid,
  Button,
  TextField,
  Chip,
  Snackbar,
  IconButton,
  InputAdornment,
  Tooltip,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  Person,
  Close,
  InfoOutlined,
  Edit,
  FileCopy,
} from '@material-ui/icons';
import {
  createShared,
  deleteShared,
} from '../../graphql/mutations';
import { listShareds } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import NoItemsModal from './no-items-modal';
import './share-my-list.css';

function ShareMyList({ withThem, addWithThem, list, profile }) {
  const [showSnackBar, setShowSnackBar] = useState(undefined);
  const [error, setError] = useState(false);

  const emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
  const emptyDataObj = {name: '', email: '', customMessage: ''}
  const firstName = profile['custom:firstName'];
  const lastName = profile['custom:lastName'];
  const fullName = `${firstName} ${lastName}`;

  const [people, setPeople] = useState(withThem || []);
  const [data, setData] = useState(emptyDataObj);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    document.title = 'Pair Care | Share My List'
    if (!withThem || !withThem.length) {
      fetchPeople();
    }
  }, []);

  async function fetchPeople() {
    const apiData = await API.graphql(graphqlOperation(listShareds, {
      filter: {
        fromSub: { eq: profile.sub }
      },
      limit: 10000,
    }));

    const { items } = apiData.data.listShareds;
    setPeople(items);
    addWithThem(items);
  }

  async function addEmail(e) {
    e.preventDefault();
    const preList = list[0] ? list[0].length : 0;
    const pregList = list[1] ? list[1].length : 0;
    const babyList = list[2] ? list[2].length : 0;
    const totalList = preList + pregList + babyList;

    if (totalList === 0) {
      setIsModalOpen(true);
    } else {
      setError(false);

      const request = {
        fromName: fullName,
        fromEmail: profile.email,
        fromSub: profile.sub,
        toEmail: data.email.toLowerCase(),
        toName: data.name,
        customMessage: data.customMessage || ''
      };
  
      await API.graphql({ query: createShared, variables: { input: request } })
        .then(response => {
          let copyArray = [...people];
  
          request.id = response.data.createShared.id;
          copyArray.push(request);
          setPeople(copyArray);
          setShowSnackBar(`You have successfully shared your list with ${data.name}.`)
          setData(emptyDataObj);
          addWithThem(copyArray);
        })
        .catch(() => {
          setError(true);
        });
    }
  }

  const handleDataChange = (field, value) => {
    setError(false);
    setData({...data, [field]: value});
  }

  async function deletePerson(person) {
    const peopleArrayCopy = people.filter(listPeople => listPeople.id !== person.id);
    const { id } = person;

    await API.graphql({ query: deleteShared, variables: { input: { id } }})
      .then(() => {
        setPeople(peopleArrayCopy);
        setShowSnackBar(`You have successfully unshared your list.`);
        addWithThem(peopleArrayCopy);
      })
      .catch(() => {
        setError(true);
      });
  }

  const copyUrl = () => {
    var copyText = document.getElementById('unique-url');
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand('copy');
  };

  return (
    <div className="page-container">
      <NoItemsModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
      <h1>Share My List</h1>
      <p>You're helping to make it easier for other parents one list at a time!</p>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <img src={require("../../img/stock2.jpg")} alt="pair-care share" style={{ maxWidth: '100%' }} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <form className="mt-30" onSubmit={(e) => {addEmail(e)}}>
            <h3 className="mb-0">Add new person to share with</h3>
            {error && (
              <Alert style={{marginTop: '15px'}} severity="error">
                <strong>An unknown error occurred.</strong> Please try again.
              </Alert>
            )}
            <TextField
              id="name"
              label="Name"
              type="text"
              className="field-container"
              onChange={(e) => { handleDataChange('name', e.target.value) }}
              variant="outlined"
              InputLabelProps={{ required: false }}
              size="small"
              autoComplete="off"
              value={data.name}
              required
            />

            <TextField
              id="email"
              label="Email"
              type="text"
              className="field-container"
              onChange={(e) => { handleDataChange('email', e.target.value) }}
              variant="outlined"
              InputLabelProps={{ required: false }}
              inputProps={{ pattern: emailRegex }}
              size="small"
              autoComplete="off"
              value={data.email}
              required
            />
            {data.email !== '' && !data.email.match(emailRegex) && <span className="error-text">Enter a valid email address.</span>}

            <TextField
              id="customMessage"
              label="Custom Message"
              type="textarea"
              className="field-container"
              onChange={(e) => { handleDataChange('customMessage', e.target.value) }}
              variant="outlined"
              InputLabelProps={{ required: false }}
              size="small"
              autoComplete="off"
              value={data.customMessage}
              multiline
              rowsMax={6}
              placeholder="Check out my list on Pair Care!"
            />

            <div className="mt-30">
              <Button variant="contained" color="primary" className="single-submit-btn" type="submit">
                Add
              </Button>
            </div>
          </form>

          <hr className="mt-30 mb-30" />

          <h3>
            People you are sharing with ({people.length})
            &nbsp;
            {people.length > 0 && !isEdit && <Edit style={{ verticalAlign: 'middle', cursor: 'pointer' }} color="secondary" onClick={() => setIsEdit(true)} />}
            {people.length > 0 && isEdit && <Close style={{ verticalAlign: 'middle', cursor: 'pointer' }} color="secondary" onClick={() => setIsEdit(false)} />}
          </h3>
          <div className="email-container">
            {!people.length && (
              <div className="text-small">
                <InfoOutlined fontSize="small" color="primary"/>
                <div className="no-share-msg">You are not currently sharing your list with anyone.</div>
              </div>
            )}

            {isEdit && people.map((person, index) => (
              <Chip
                key={person.toEmail}
                icon={<Person />}
                className="mr-5 mt-5"
                size="small"
                label={`${person.toName} | ${person.toEmail}`}
                onDelete={() => deletePerson(person)}
                color="secondary"
              />
            ))}

          {!isEdit && people.map((person, index) => (
              <Chip
                key={person.toEmail}
                icon={<Person />}
                className="mr-5 mt-5"
                size="small"
                label={`${person.toName} | ${person.toEmail}`}
                color="secondary"
              />
            ))}
          </div>

          <hr className="mt-30 mb-30" />

          <h3>
            Share your unique url directly
            <Tooltip title="Sharing your url directly will allow you to invite a person to join Pair Care but they will not be able to view your list after signing up unless you add their email above.">
              <InfoOutlined color="primary" style={{fontSize: '20px', verticalAlign: 'middle'}} />
            </Tooltip>
          </h3>
          <TextField
              id="unique-url"
              label="Unique Url"
              type="text"
              className="field-container"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <Tooltip title="Copy" aria-label="Copy">
                    <InputAdornment position="start">
                      <FileCopy onClick={copyUrl} style={{color: '#226d77', cursor: 'pointer', marginLeft: '5px'}} />
                    </InputAdornment>
                  </Tooltip>
                ),
              }}
              size="small"
              value={`https://pair-care.com/shared-lists/?id=${profile.sub}&name=${fullName}`}
              readOnly
            />
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal:'left' }}
        open={showSnackBar}
        onClose={() => {setShowSnackBar(undefined)}}
        message={showSnackBar}
        autoHideDuration={5000}
        key="bottomleft"
        severity="success"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => {setShowSnackBar(undefined)}}>
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
    />
    </div>
  )
}

const mapStateToProps = (state) => ({
  withThem: state.share.withThem,
  list: state.myList,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => {
  return {
    addWithThem: (people) => dispatch(actions.addWithThem(people)),
    //addThem: (people) => dispatch(actions.addThem(people)),
    //deleteThem: (people) => dispatch(actions.deleteThem(people)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareMyList);