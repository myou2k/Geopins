import React from "react";

import { GoogleLogin } from 'react-google-login'
import { GraphQLClient } from 'graphql-request'
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {
  const onSuccess = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token
    console.log(idToken)

    const client = new GraphQLClient('http://localhost:4000/graphql', { headers: { authorization : idToken}})
    const ME_QUERY = `
    {
      me {
        _id
        name
        email
        picture
      }
    }
    `
    const data = await client.request(ME_QUERY)
    console.log('data', data)
  }
  return <GoogleLogin 
    clientId="391953185645-uem88gqdfli79cgavvv3plpifnb8dvpr.apps.googleusercontent.com"
    onSuccess={onSuccess}
    isSignedIn={true}
    ></GoogleLogin>;
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
