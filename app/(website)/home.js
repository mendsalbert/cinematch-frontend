"use client";

import Link from "next/link";
import Container from "@/components/container";
import MovieCard from "@/components/moviecard";
import React, { useEffect, useState } from "react";

export default function Post() {
  const [movieDetails, setMovieDetails] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Function to fetch recommendations and then fetch movie details from OMDB
  const fetchSearchResults = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ movie_name: searchVal })
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setIsLoading(true);
      const movieDetailsPromises = data.recommendations.map(movie =>
        fetch(
          `http://www.omdbapi.com/?t=${encodeURIComponent(
            movie
          )}&apikey=57408735`
        ).then(res => {
          if (!res.ok) throw new Error("Failed to fetch from OMDB");
          return res.json();
        })
      );

      const moviesDetails = await Promise.all(movieDetailsPromises);
      setMovieDetails(moviesDetails);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Effect to fetch movie details when the Enter key is pressed and searchVal changes
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "Enter") {
        fetchSearchResults();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchVal]);

  return (
    // Maleficent
    <>
      {movieDetails && (
        <Container>
          <div className="relative flex h-12 w-full items-center overflow-hidden rounded-lg bg-white focus-within:shadow-lg">
            <div className="grid h-full w-12 place-items-center text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              className="peer h-full w-full pr-2 text-sm text-gray-700 outline-none dark:bg-gray-900 dark:text-white"
              type="text"
              id="search"
              onChange={e => {
                setSearchVal(e.target.value);
              }}
              placeholder="Search something.."
            />
          </div>

          {isLoading ? (
            <div className="mt-12 flex flex-row items-center justify-center">
              <lord-icon
                src="https://cdn.lordicon.com/ybaojceo.json"
                trigger="loop"
                delay="2000"
                style={{
                  width: "40px",
                  height: "40px"
                }}></lord-icon>
            </div>
          ) : (
            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
              {movieDetails.map(movies => (
                <MovieCard movie={movies} aspect="square" />
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <lord-icon
              src="https://cdn.lordicon.com/tfliqeqn.json"
              trigger="loop"
              style={{
                width: "100px",
                height: "100px"
              }}></lord-icon>
          </div>
        </Container>
      )}
    </>
  );
}
