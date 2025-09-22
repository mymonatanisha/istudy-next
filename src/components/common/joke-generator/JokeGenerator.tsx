"use client";
import React, { useEffect } from "react";
import useJokeGenerator from "@/hooks/useJokeGenerator";

const JokeGenerator: React.FC = () => {
    const { currentJoke, loading, error, fetchNewJoke } = useJokeGenerator();

    // Fetch a joke when component mounts
    useEffect(() => {
        fetchNewJoke();
    }, [fetchNewJoke]);

    return (
        <div className="bd-joke-generator-area section-space">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-10">
                        <div className="bd-joke-generator-wrapper text-center">
                            <div className="bd-section-title-wrapper mb-40">
                                <h2 className="bd-section-title mb-20">
                                    <i className="fa-regular fa-face-laugh-beam me-2"></i>
                                    Random Joke Generator
                                </h2>
                                <p className="bd-section-paragraph">
                                    Need a quick laugh? Click the button below to get a random joke that will brighten your day!
                                </p>
                            </div>

                            <div className="bd-joke-content-wrapper">
                                {loading && (
                                    <div className="bd-joke-loading mb-30">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="spinner-border text-primary me-3" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <span className="text-muted">Fetching a joke for you...</span>
                                        </div>
                                    </div>
                                )}

                                {error && (
                                    <div className="bd-joke-error mb-30">
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                            <div>{error}</div>
                                        </div>
                                    </div>
                                )}

                                {currentJoke && !loading && (
                                    <div className="bd-joke-display mb-30">
                                        <div className="bd-joke-card p-4 rounded shadow-sm">
                                            <div className="bd-joke-quote mb-3">
                                                <i className="fa-solid fa-quote-left text-primary fs-4"></i>
                                            </div>
                                            <p className="bd-joke-text fs-5 mb-3 text-dark lh-base">
                                                {currentJoke}
                                            </p>
                                            <div className="bd-joke-quote">
                                                <i className="fa-solid fa-quote-right text-primary fs-4"></i>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="bd-joke-btn">
                                    <button
                                        type="button"
                                        onClick={fetchNewJoke}
                                        disabled={loading}
                                        className="bd-btn btn-primary"
                                    >
                                        <i className="fa-solid fa-shuffle me-2"></i>
                                        {loading ? "Getting Joke..." : "Get New Joke"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JokeGenerator;