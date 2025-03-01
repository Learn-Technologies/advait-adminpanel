import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: 1000 * 60 * 60, // 60 Minutes
    },
  },
});

export function clearCache(cacheKey: string | any[]) {
  queryClient.removeQueries(cacheKey);
}

export function invalidateCache(cacheKey: string | any[]) {
  queryClient.invalidateQueries(cacheKey);
}
