import { useRouter } from 'next/router';
import { CombinedError } from 'urql';
import { PostQuery, usePostQuery } from '../generated/graphql';

export const useGetPostFromUrl = (): [
  {
    data: PostQuery | undefined;
    error: CombinedError | undefined;
    fetching: boolean;
  },
  number
] => {
  const router = useRouter();
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: { id: intId }
  });
  return [{ data, error, fetching }, intId];
};
