import ApiData from "./RadioContext";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

export interface Station {
  name: string;
  url: string;
  country: string;
  favicon: string;
  tags: string;
}

export default function ContextProvider({ children }: Props) {
  const [data, setData] = useState<Station[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = process.env.REACT_APP_RADIO_API;


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resp = await fetch(
          `${BASE_URL}/json/stations/topclick/30`);
        const respData = await resp.json();
        setData(respData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch radio stations.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const contextValue = {
    data,
    loading,
    error,
  };

  return (
    <ApiData.Provider value={contextValue}>
      {children}
    </ApiData.Provider>
  );
}
