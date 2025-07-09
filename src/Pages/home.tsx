import Navbar from "../Components/navbar";
import debounce from "lodash.debounce";
import styles from "../CSSModules/Home.module.css";
import { AuthContext } from "../Contexts/authContext";

// import { useMemo } from "react";

import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

interface Station {
    name: string;
    favicon: string;
    url: string;
    country: string;
    tags: string;
    homepage: string;
    language: string;
    codec: string;
}

const Home: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const authContext = useContext(AuthContext);
    const [stations, setStations] = useState<Station[]>([]);
    const [filteredStations, setFilteredStations] = useState<Station[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const fetchStations = useCallback(async (query = "") => {
        setLoading(true);
        setError("");

        try {
            const url = query
                ? `https://de1.api.radio-browser.info/json/stations/search?name=${encodeURIComponent(
                    query
                )}`
                : `https://de1.api.radio-browser.info/json/stations?limit=500&hidebroken=true&order=clickcount`;

            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch stations.");

            const data = await response.json();
            const validStations = data.filter(
                (station: Station) =>
                    station.name && station.country && station.url
            );

            setStations(validStations);
            setFilteredStations(validStations.slice(0, 4));

            if (validStations.length > 0 && !selectedStation) {
                setSelectedStation(validStations[0]);
            }

        } catch {
            setError("Unable to load stations. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [selectedStation]);

    useEffect(() => {
        fetchStations();
    }, [fetchStations]);

    useEffect(() => {
        const handleUserInteraction = () => {
            if (selectedStation && audioRef.current) {
                audioRef.current.src = selectedStation.url;
                audioRef.current.load();
                audioRef.current
                    .play()
                    .catch((err) => console.warn("Autoplay on user interaction failed:", err));
            }

            document.removeEventListener("click", handleUserInteraction);
            document.removeEventListener("keydown", handleUserInteraction);
        };

        document.addEventListener("click", handleUserInteraction);
        document.addEventListener("keydown", handleUserInteraction);

        return () => {
            document.removeEventListener("click", handleUserInteraction);
            document.removeEventListener("keydown", handleUserInteraction);
        };
    }, [selectedStation]);


    useEffect(() => {
        if (selectedStation && audioRef.current) {
            audioRef.current.src = selectedStation.url;
            audioRef.current.load();
            audioRef.current
                .play()
                .catch((err) => console.warn("Autoplay on first load failed:", err));
        }
    }, [selectedStation]);


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetch = useCallback(
        debounce((query: string) => {
            fetchStations(query);
        }, 500),
        [fetchStations]
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setSearch(value);

        if (!value) {
            setFilteredStations([]);
            return;
        }

        const filtered = stations.filter((station) =>
            `${station.name} ${station.country} ${station.tags}`
                .toLowerCase()
                .startsWith(value.toLowerCase())
        );

        if (filtered.length > 0) {
            setFilteredStations(filtered.slice(0, 4));
        } else {
            debouncedFetch(value);
        }
    };

    const handleStationSelect = (station: Station) => {
        setSelectedStation(station);
        setSearch("");
        setFilteredStations([]);

        if (audioRef.current) {
            audioRef.current.src = station.url;
            audioRef.current.load();
            audioRef.current.play().catch((err) => console.warn("Autoplay failed:", err));
        }
    };


    const handleInputFocus = () => {
        setFilteredStations([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleOnline = useCallback(
        debounce(() => {
            if (navigator.onLine && selectedStation && audioRef.current) {
                audioRef.current.src = selectedStation.url;
                audioRef.current.load();
                audioRef.current
                    .play()
                    .catch((err) => console.warn("Reconnection failed:", err));
            }
        }, 500),
        [selectedStation]
    );

    useEffect(() => {
        window.addEventListener("online", handleOnline);
        return () => window.removeEventListener("online", handleOnline);
    }, [handleOnline]);

    return (
        <div className={styles.homeContainer}>
            <Navbar />

            <div className={styles.heroStationCtn}>
                <section className={styles.hero}>
                    <h1 className={styles.heroTitle}>
                        Bringing the world <br />
                        <span>closer</span> to you
                    </h1>
                    <div className={styles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Search by country, place, or station name"
                            className={styles.searchInput}
                            value={search}
                            onChange={handleSearchChange}
                            onFocus={handleInputFocus}
                        />

                        {search && filteredStations.length > 0 && (
                            <ul className={styles.searchDropdown}>
                                {filteredStations.map((station, index) => (
                                    <li key={index} onClick={() => handleStationSelect(station)}>
                                        {station.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>

                <section className={styles.stationsContainer}>
                    {loading && (
                        <p className={styles.statusMessage}>Loading stations...</p>
                    )}
                    {error && <p className={styles.errorMessage}>{error}</p>}

                    {selectedStation && (
                        <div className={`${styles.stationCard} ${styles.single}`}>
                            <div className={styles.stationHeader}>
                                <img
                                    src={
                                        selectedStation.favicon || "https://via.placeholder.com/40"
                                    }
                                    alt={selectedStation.name}
                                />
                                <div className={styles.stationInfo}>
                                    <p className={styles.name}>{selectedStation.name}</p>
                                    <p className={styles.country}>{selectedStation.country}</p>
                                    {/* <p className={styles.tags}>{selectedStation.tags}</p> */}
                                </div>
                            </div>

                            <audio
                                ref={audioRef}
                                controls
                                className={styles.stationAudio}
                                onError={() => {
                                    console.warn("Stream error. Attempting to reconnect...");
                                    if (audioRef.current && selectedStation) {
                                        audioRef.current.src = selectedStation.url;
                                        audioRef.current.load();
                                        audioRef.current
                                            .play()
                                            .catch((err) => console.warn("Retry failed:", err));
                                    }
                                }}
                            >
                                <source src={selectedStation?.url} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Home;
