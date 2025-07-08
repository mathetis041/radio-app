import ApiData from "../Contexts/RadioContext";
import React, { useContext } from "react";
import { Station } from "../Contexts/ContextProvider";

const PausePlay = () => {
  const { data, loading, error } = useContext(ApiData);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  if (!data || data.length === 0) return <p>No stations found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.map((station: Station, index: number) => (
        <div key={index} className="p-4 border rounded shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">{station.name}</h2>
          <p className="text-sm text-gray-600">{station.country}</p>
          <audio controls className="mt-2 w-full">
            <source src={station.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ))}
    </div>
  );
};

export default PausePlay;
