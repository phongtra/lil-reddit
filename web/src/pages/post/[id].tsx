import { Box, Heading } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Layout } from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';

const Post = () => {
  const [{ data, error, fetching }] = useGetPostFromUrl();
  if (error) {
    return <Layout>{error.message}</Layout>;
  }
  return (
    <Layout>
      {fetching ? (
        '...'
      ) : !data?.post ? (
        <Box>Could not find post</Box>
      ) : (
        <>
          <Heading mb={4}>{data?.post?.title}</Heading>
          {data?.post?.text}
        </>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
