import { queryKeys } from "../queries/queryKeys";
import { queryClient } from "../QueryClient";




export const invalidateAll = () => {
      queryClient.invalidateQueries({queryKey: queryKeys.tasks});
    }

