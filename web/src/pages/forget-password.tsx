import { FormControl, Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrappper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const ForgetPassword = () => {
  const [{}, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
  return (
    <Wrappper variant='small'>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          console.log(values);
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              If an account with that email exist, we will send you an email
            </Box>
          ) : (
            <Form>
              <FormControl>
                <InputField
                  name='email'
                  placeholder='Email'
                  label='Email'
                  type='email'
                />

                <Button
                  type='submit'
                  variantColor='teal'
                  mt={4}
                  isLoading={isSubmitting}
                >
                  Forgot Password
                </Button>
                {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
              </FormControl>
            </Form>
          )
        }
      </Formik>
    </Wrappper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgetPassword);
