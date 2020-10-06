import { Box, IconButton, Link } from '@chakra-ui/core';
import React from 'react';
import NextLink from 'next/link';
import { useDeletePostMutation } from '../generated/graphql';

interface EditDeletePostButtonInterface {
  id: number;
}

export const EditDeletePostButton: React.FC<EditDeletePostButtonInterface> = ({
  id
}) => {
  const [{}, deletePost] = useDeletePostMutation();
  return (
    <Box>
      <NextLink href={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          icon='edit'
          mr={4}
          aria-label='Edit Post'
          onClick={() => {}}
        />
      </NextLink>

      <IconButton
        icon='delete'
        aria-label='Delete Post'
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Box>
  );
};
