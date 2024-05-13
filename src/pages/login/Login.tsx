import React from 'react';
import { Formik, Form} from 'formik';
import { Grid, TextField, Button, Card, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from "../../constants/endpoints";
import { HTTP_METHODS } from "../../constants/http";
import { useContext } from "react";
import { UserContext } from '../../components/authenticationProvider/AuthenticationProvider';
import useQuery from '../../hooks/useQuery';
import { userLoginSchema } from '../../validation/userLogin';

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
      <div>
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
        {(formik) => (
          <Form>
            <Card style={{ width: '50%'}}>
              <DialogContent>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <h2>Login</h2>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant="outlined"
                      error={Boolean(formik.errors.email && formik.touched.email)}
                      helperText={
                        formik.errors.email &&
                        formik.touched.email &&
                        formik.errors.email
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      name="password"
                      label="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant="outlined"
                      error={Boolean(formik.errors.password && formik.touched.password)}
                      helperText={
                        formik.errors.password &&
                        formik.touched.password &&
                        formik.errors.password
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" disabled={false}> 
                      Sign in
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
            </Card>
          </Form>
        )}
      </Formik>
      </div>
    );
  };
  
  export default Login;