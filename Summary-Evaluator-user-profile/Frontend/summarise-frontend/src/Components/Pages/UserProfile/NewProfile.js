import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from "react-router-dom";
import { BASE_URL } from '../../../Services/Common';
import { POST } from '../../../Services/HttpHandlers';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    // marginTop: "5%",
    maxWidth: 700,
  },
  media: {
    height: "50%",
    width: "50%",
    padding: "2%",
    borderRadius: "50%",
    background: "#23395d"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function LoginCard() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState(undefined);
  const [userPass, setUserPass] = React.useState(undefined);
  const [userUName, setUName] = React.useState(undefined);
  const [userFName, setFName] = React.useState(undefined);
  const [userLName, setLName] = React.useState(undefined);
  const [userAffilitation, setAffiliation] = React.useState(undefined);
  const [userOrg, setOrg] = React.useState(undefined);
  const [redirect, setRedirect] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    const userData = {
      "email": userEmail,
      "password": userPass,
      "user_name": userUName,
      "first_name": userFName,
      "last_name": userLName,
      "affiliation": userAffilitation,
      "institute": userOrg
    }

    POST(BASE_URL, 'register', userData)
      .then(response => (!response.ok ? undefined : response.json()))
      .then(response_message => {
        const message = response_message.message;
        if (message.includes('successfully')) {
          console.log('elhamdulelah');
          setRedirect(true);
        } else {
          alert(message);
        }
      }
      ).catch(error => alert('Could Not Register! Please Check Your Internet Connection and Try Again'));

  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/user/login' />
    }
  }



  return (

    <form onSubmit={handleSubmit}>

      {renderRedirect()}
      <Card className={classes.root}>
        <CardHeader
          title="Register"
          style={{
            textAlign: "center",
            color: "#23395d"
          }}
        />
        <CardContent>

          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "1%"
          }}>


            <TextField
              required
              id="user_mail"
              label="User Email"
              placeholder="someone@example.org"
              variant="filled"
              onChange={event => setUserEmail(event.target.value)}
            />


            <TextField
              style={{
                marginTop: "3%"
              }}
              required
              id="filled-required"
              label="Required"
              type="password"
              label="Password"
              variant="filled"
              onChange={event => setUserPass(event.target.value)}
            />

            <TextField
              style={{
                marginTop: "3%"
              }}
              required
              id="filled-required"
              label="User Name"
              placeholder="SelenaHarper97"
              variant="filled"
              onChange={event => setUName(event.target.value)}

            />

            <TextField
              style={{
                marginTop: "3%"
              }}
              required
              id="filled-required"
              label="First Name"
              placeholder="Selena"
              variant="filled"
              onChange={event => setFName(event.target.value)}
            />

            <TextField
              style={{
                marginTop: "3%"
              }}
              id="filled-required"
              label="Last Name"
              placeholder="Harper"
              variant="filled"
              onChange={event => setLName(event.target.value)}
            />

            <TextField
              style={{
                marginTop: "3%"
              }}
              required
              id="filled-required"
              label="Current Affiliation"
              placeholder="Software Developer"
              variant="filled"
              onChange={event => setAffiliation(event.target.value)}
            />

            <TextField
              style={{
                marginTop: "3%"
              }}
              required
              id="filled-required"
              label="Organization"
              placeholder="Google"
              variant="filled"
              onChange={event => setOrg(event.target.value)}
            />
          </div>



        </CardContent>
        <CardActions style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "5%"
        }} >
          <Button variant="contained" style={{
            width: "90%",
            padding: "2%",
            background: "#23395d",
            color: "white"
          }}
            type="submit"

            onSubmit={handleSubmit}
          >
            Register Now
        </Button>

          <Typography paragraph
            style={{
              marginTop: "2%",
              paddingTop: "2px"
            }}>
            Already a user?


            <Link to="/user/login" style={{
              textDecoration: "None",
              paddingLeft: "5px",
              color: "orangered",
              fontWeight: "bold"
            }}>
              Login
              </Link>
          </Typography>

        </CardActions>
      </Card>
    </form>

  );
}
