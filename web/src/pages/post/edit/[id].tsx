import { FormControl, Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import { Router, useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import { useUpdatePostMutation } from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { useGetPostFromUrl } from '../../../utils/useGetPostFromUrl';

const EditPost: React.FC = () => {
  const router = useRouter();
  const [{ data, error, fetching }, intId] = useGetPostFromUrl();
  const [{}, updatePost] = useUpdatePostMutation();

  if (error) {
    return <Layout>{error.message}</Layout>;
  }

  return (
    <Layout variant='small'>
      {fetching ? (
        'Loading...'
      ) : !data?.post ? (
        <Box>Could not find post</Box>
      ) : (
        <Formik
          initialValues={{ title: data.post.title, text: data.post.text }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);
            //   const { error } = await createPost({ input: values });
            //   if (!error) {
            //     router.push('/');
            //   }
            await updatePost({ id: intId, ...values });
            router.push('/');
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormControl>
                <InputField name='title' placeholder='Title' label='Title' />
                <Box mt={4}>
                  <InputField
                    textarea
                    name='text'
                    placeholder='text...'
                    label='Body'
                  />
                </Box>

                <Button
                  type='submit'
                  variantColor='teal'
                  mt={4}
                  isLoading={isSubmitting}
                >
                  Update Post
                </Button>
                {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
              </FormControl>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
