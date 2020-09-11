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

const Register: React.FC = () => {
  return (
    <Wrappper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <FormControl>
              <FormLabel htmlFor='username'>Username</FormLabel>
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
