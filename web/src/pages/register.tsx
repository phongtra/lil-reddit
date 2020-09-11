import React from 'react';
import { Formik, Form } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from '@chakra-ui/core';
import { Wrappper } from '../components/Wrapper';

const Register: React.FC = () => {
  return (
    <Wrappper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange }) => (
          <Form>
            <FormControl>
              <FormLabel htmlFor='username'>Username</FormLabel>
              <Input
                value={values.username}
                onChange={handleChange}
                id='username'
                placeholder='Username'
              />
              {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrappper>
  );
};

export default Register;
