import DataLoader from 'dataloader';
import { Updoot } from '../entities/Updoot';
import { User } from '../entities/User';

export const createUpdootLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Updoot | null>(
    async (keys) => {
      const updoots = await Updoot.findByIds(keys as any);
      const updootIdToUpdoot: Record<string, Updoot> = {};
      updoots.forEach((upddot) => {
        updootIdToUpdoot[`${upddot.userId}|${upddot.postId}`] = upddot;
      });
      return keys.map((key) => updootIdToUpdoot[`${key.userId}|${key.postId}`]);
    }
  );
