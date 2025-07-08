import React from "react";
import { Station } from "./ContextProvider";

interface ApiDataContext {
  data: Station[] | null;
  loading: boolean;
  error: string | null;
}



const ApiData = React.createContext<ApiDataContext>({
  data: null,
  loading: false,
  error: null,
})

export default ApiData