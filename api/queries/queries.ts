import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { getTasks } from '../axios/api';


export const useTasks = () => {
  return useQuery({
    queryKey: queryKeys.tasks,
    queryFn: getTasks
  });
};