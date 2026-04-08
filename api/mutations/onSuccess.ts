import { queryKeys } from "../queries/queryKeys";
import { queryClient } from "../QueryClient";




export const invalidateAll = () => {
      queryClient.invalidateQueries({queryKey: queryKeys.tasks});
      queryClient.invalidateQueries({queryKey: queryKeys.metrics});
      queryClient.invalidateQueries({queryKey: queryKeys.character});
      queryClient.invalidateQueries({queryKey: queryKeys.tasks});
    }

