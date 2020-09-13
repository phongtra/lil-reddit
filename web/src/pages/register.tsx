import React from 'react';
import { Formik, Form } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button
} from '@chakra-ui/core';
import { Wrappper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';

const REGISTER_MUTATION = `
mutation Register($username: String!, $password: String!) {
    register(options: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
    }
  }
  
`;

const Register: React.FC = () => {
  const [{}, register] = useMutation(REGISTER_MUTATION);
  return (
    <Wrappper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          console.log(values);
          register(values);
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <FormControl>
              <InputField
                name='username'
                placeholder='Username'
                label='Username'
              />
              <Box mt={4}>
                <InputField
                  name='password'
                  placeholder='Password'
                  label='Password'
                  type='password'
                />
              </Box>
              <Button
                type='submit'
                variantColor='teal'
                mt={4}
                isLoading={isSubmitting}
              >
                Register
              </Button>
              {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrappper>
  );
};

export default Register;
