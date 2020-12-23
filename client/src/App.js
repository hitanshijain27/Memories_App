import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

const App = () => {

  const [isAuthenticated, setIsAuthenticated]=useState(false)
  const [user, setUser]=useState({name: "",email: ""})
  const responseSuccessGoogle = async (response) => {
    console.log(response);
    const profile=await response.getBasicProfile();
    console.log(profile.getName());
    console.log(profile.getEmail());
    setUser({
      name: profile.getName(),
      email: profile.getEmail()
    })
  }
  const logout = ()=>{
    setUser({name: "",email: ""})
    setIsAuthenticated(false)
  }
  useEffect(()=>{
    if(user.name.length>0 || user.email.length>0)
      setIsAuthenticated(true)
  }, [user])

  return(
    <div>
      <section>
        {isAuthenticated?<AuthenticatedView logout={logout} user={user} />:<UnAuthenticatedView responseSuccessGoogle={responseSuccessGoogle}/>}
      </section>
    </div>

  );
}

const AuthenticatedView=({user,logout})=>{
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <div>
      <Typography className={classes.heading} align='center' variant="h3">Company Orders</Typography>
      <h1>Welcome, {user.name}</h1>
      <h2>{user.email}</h2>
      <GoogleLogout className={classes.button} 
      clientId="119161189697-eer5vnq3lqn40vr5b59gk8c6qvsaj9b9.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
      />
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>

  )
}

const UnAuthenticatedView=({responseSuccessGoogle})=>{
  const classes = useStyles();
  return(
    <div>
      <Typography className={classes.heading} variant="h3" align="center">Company Orders</Typography>
      <h1>Are You a Business Owner?</h1>
      <GoogleLogin 
        clientId="119161189697-eer5vnq3lqn40vr5b59gk8c6qvsaj9b9.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseSuccessGoogle}
        isSignedIn={true}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
};
export default App;
