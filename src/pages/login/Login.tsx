import React from 'react';
import { Formik, Form} from 'formik';
import { Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from "../../constants/endpoints";
import { HTTP_METHODS } from "../../constants/http";
import { useContext } from "react";
import { UserContext } from '../../components/authenticationProvider/AuthenticationProvider';
import useQuery from '../../hooks/useQuery';
import { userLoginSchema } from '../../validation/userLogin';
import { LoginPageContainer, LoginPageTitle, FormContainer, ActionButtonContainer, HorizontalLine, HorizontalLineContainer } from './LoginPageStyles';
import ActionButton from '../../components/buttons/ActionButton';

type userLoginResponse = {
  token: string;
  refreshToken: string;
}

type userLogin = {
  email: string;
  password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    
    const onSuccess = (response : userLoginResponse) => {
      context?.login(response.token, response.refreshToken);
      navigate('/');
    }

    const loginUserCommand = useQuery({
      url: ENDPOINTS.AUTH.LOGIN,
      httpMethod: HTTP_METHODS.POST,
      onSuccess
    });
  
    const onSubmit = async (values: userLogin) => {
      await loginUserCommand.sendData(values);
    }

  
    const initialValues = {
      email: '',
      password: ''
    };
  
  
    return (
      <LoginPageContainer>
        <FormContainer>
          <LoginPageTitle>
            <Typography variant="h4" align='left'>Welcome to </Typography>
            <Typography variant="h4" align='left'>Interview Cheat Sheet</Typography>
          </LoginPageTitle>
          <Formik 
            initialValues={initialValues}
            validationSchema={userLoginSchema}
      
            onSubmit={(values) => {
              const user = {
                email: values.email,
                password: values.password
              };
              onSubmit(user);
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
              <Form>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        Email address
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="email"
                          placeholder='e.g, name@cognizant.com'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>
                      <Grid item xs={6} >
                        Password
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                        />
                      </Grid>
                        <ActionButtonContainer>
                          <ActionButton 
                            type="submit" 
                            disabled={isSubmitting} 
                            color="primary" 
                            variant="contained" 
                            fullWidth
                          >
                              Sign in
                          </ActionButton>
                          <HorizontalLineContainer>
                            <HorizontalLine />
                              or
                            <HorizontalLine />
                          </HorizontalLineContainer>
                          <ActionButton 
                            color="info" 
                            variant="contained" 
                            fullWidth
                            onClick={() => navigate('/register')}
                          >
                              Register
                          </ActionButton>
                        </ActionButtonContainer>
                    </Grid>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </LoginPageContainer>
    );
  };
  
  export default Login;