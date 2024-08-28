import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovieDetails = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      setError("Error fetching movie details: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  if (!movie) {
    return <div className="text-center">Movie not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-4">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-64 object-cover rounded-lg mt-4"
      />
      <p className="mt-4 text-gray-700">{movie.overview}</p>
      <p className="mt-2 text-gray-500">Release Date: {movie.release_date}</p>
      <p className="mt-2 text-gray-500">Rating: {movie.vote_average}/10</p>

      {movie.production_companies.some((company) => company.logo_path) && (
        <div className="mt-2">
          <h2 className="text-lg font-semibold">Production Companies:</h2>
          <div className="flex justify-around flex-wrap mt-4 space-x-3">
            {movie.production_companies
              .filter((company) => company.logo_path)
              .map((company) => (
                <div key={company.id} className="mr-4 mb-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={company.name}
                    className="h-12 object-contain"
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
