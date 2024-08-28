import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async (pageNumber) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${baseUrl}/movie/popular?api_key=${apiKey}&page=${pageNumber}`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
    } catch (error) {
      setError("Error fetching data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (loading && page === 1) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-52 object-cover rounded-t-lg"
            />
            <h2 className="text-lg font-bold mt-2">{movie.title}</h2>
            <p className="text-gray-600">{movie.release_date}</p>
            <Link
              to={`/movie/${movie.id}`}
              className="text-blue-500 hover:underline"
            >
              More Details
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        {loading && <div>Loading...</div>}
        {hasMore && !loading && (
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load More
          </button>
        )}
        {!hasMore && <div>No more movies to load</div>}
      </div>
    </div>
  );
}

export default Home;
