import { Box, Heading } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { Layout } from '../../components/Layout';
import { usePostQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

const Post = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: { id: intId }
  });

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
