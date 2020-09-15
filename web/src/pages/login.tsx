import React from 'react';
import { Formik, Form } from 'formik';
import { FormControl, Box, Button } from '@chakra-ui/core';
import { Wrappper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Login: React.FC = () => {
  const [{}, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrappper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const res = await login(values);
          if (res.data?.login.errors) {
            setErrors(toErrorMap(res.data.login.errors));
          } else if (res.data?.login.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
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
                Login
              </Button>
              {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrappper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
