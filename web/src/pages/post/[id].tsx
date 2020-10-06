import { Box, Heading } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { EditDeletePostButton } from '../../components/EditDeletePostButton';
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
          <Box mb={4}>{data?.post?.text}</Box>
          <EditDeletePostButton id={data.post.id} />
        </>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
