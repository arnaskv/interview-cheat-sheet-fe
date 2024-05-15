import React from 'react';
import { Formik, Form} from 'formik';
import { Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from "../../constants/endpoints";
import { HTTP_METHODS } from "../../constants/http";
import useQuery from '../../hooks/useQuery';
import { userRegisterSchema } from '../../validation/userRegister';
import { ActionButtonContainer, FormContainer, RegisterPageContainer, RegisterPageTitle } from './RegisterPageStyles';
import ActionButton from '../../components/buttons/ActionButton';

type userRegister = {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
    const navigate = useNavigate();
    
    const onSuccess = () => {
      navigate('/login');
    }

    const loginUserCommand = useQuery({
      url: ENDPOINTS.AUTH.REGISTER,
      httpMethod: HTTP_METHODS.POST,
      onSuccess
    });
  
    const onSubmit = async (values: userRegister) => {
      await loginUserCommand.sendData(values);
    }
  
    const initialValues = {
      name: '',
      surname: '',
      email: '',
      password: '',
      passwordRepeat: ''
    };
  
    return (
      <RegisterPageContainer>
        <FormContainer>
          <RegisterPageTitle>
            <Typography variant="h4" align='left'>Register</Typography>
          </RegisterPageTitle>
          <Formik 
            initialValues={initialValues}
            validationSchema={userRegisterSchema}
      
            onSubmit={(values) => {
              const user = {
                name: values.name,
                surname: values.surname,
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
                            Name
                    </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="name"
                          label="Name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Grid>
                      <Grid item xs={6}>
                            Surname
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="surname"
                          label="Surname"
                          value={values.surname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          error={touched.surname && Boolean(errors.surname)}
                          helperText={touched.surname && errors.surname}
                        />
                      </Grid>
                      <Grid item xs={6}>
                            Email address
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="email"
                          label="Email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>
                      <Grid item xs={6}>
                          Password
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="password"
                          name="password"
                          label="Password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                        />
                      </Grid>
                      <Grid item xs={6}>
                          Repeat password
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="password"
                          name="passwordRepeat"
                          label="Repeat password"
                          value={values.passwordRepeat}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          error={touched.passwordRepeat && Boolean(errors.passwordRepeat)}
                          helperText={touched.passwordRepeat && errors.passwordRepeat}
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
                            Register
                        </ActionButton>
                      </ActionButtonContainer>
                    </Grid>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </RegisterPageContainer>
    );
  };
  
  export default Register;