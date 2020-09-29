import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Stack,
  Text
} from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import { Layout } from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';
import { useState } from 'react';
import { UpdootSection } from '../components/UpdootSection';
import { isServer } from '../utils/isServer';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 13,
    cursor: null as null | string
  });
  const [{ data, fetching }] = usePostsQuery({ variables });
  if (fetching) {
    return <div>loading...</div>;
  }
  return (
    <Layout>
      <Flex align='center'>
        <Heading>LilReddit</Heading>
        <NextLink href='/create-post'>
          <Link ml='auto'>create post</Link>
        </NextLink>
      </Flex>

      <br />
      {!data ? (
        <div>There is no data</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) => (
            <Flex key={p.id} p={5} shadow='md' borderWidth='1px'>
              <UpdootSection post={p} />
              <Box>
                <Heading fontSize='xl'>{p.title}</Heading>
                <Text>posted by {p.creator.username}</Text>
                <Text mt={4}>
                  {p.text.length > 50 ? p.textSnippet + '...' : p.text}
                </Text>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore && (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: 10,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt
              });
            }}
            m='auto'
            my={8}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
