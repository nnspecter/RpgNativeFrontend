import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { getCharacter, getMetrics, getTasks } from '../axios/api';


export const useTasks = () => {
  return useQuery({
    queryKey: queryKeys.tasks,
    queryFn: getTasks
  });
};

export const useCharacter = () => {
  return useQuery({
    queryKey: queryKeys.character,
    queryFn: getCharacter
  });
};

export const useMetrics = () => {
  return useQuery({
    queryKey: queryKeys.metrics,
    queryFn: getMetrics
  });
};