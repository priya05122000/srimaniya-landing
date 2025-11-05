import { createContext, Dispatch, SetStateAction } from "react";

export const LoadingContext = createContext<{
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}>({
  loading: false,
  setLoading: () => {},
});
