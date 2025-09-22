import { useState, useCallback } from "react";

interface Joke {
    id: string;
    joke: string;
    status: number;
}

const useJokeGenerator = () => {
    const [currentJoke, setCurrentJoke] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNewJoke = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://icanhazdadjoke.com/", {
                headers: {
                    "Accept": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: Joke = await response.json();
            
            if (data?.joke) {
                setCurrentJoke(data.joke);
            } else {
                setError("Could not fetch joke.");
            }
        } catch (err) {
            console.error("Error fetching joke:", err);
            setError("Failed to load joke. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    return { 
        currentJoke, 
        loading, 
        error, 
        fetchNewJoke 
    };
};

export default useJokeGenerator;