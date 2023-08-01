import { useState, useEffect } from "react";

function App() {
  const [listOfMovies, setListOfMovies] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  return (
    <>
      <Navbar
        listOfMovies={listOfMovies}
        setListOfMovies={setListOfMovies}
        setIsLoading={setIsLoading}
        setError={setError}
        query={query}
        setQuery={setQuery}
      />
      <Main>
        <ListedMovies
          listOfMovies={listOfMovies}
          isLoading={isLoading}
          error={error}
          query={query}
        />
        <SpecificMovie />
      </Main>
    </>
  );
}
function ListedMovies({ listOfMovies, isLoading, error, query }) {
  const [currentMovieSelected, setCurrentMovieSelected] = useState({});
  function handleClickSpecificMovie(id) {}
  return (
    <section class="listedMovies">
      {query === "" && <p class="messageListMovie">Enter a movie</p>}
      {error && query !== "" && <p class="messageListMovie">{error}</p>}
      {isLoading && !error && <p class="messageListMovie">Loading...</p>}
      {!isLoading &&
        !error &&
        listOfMovies.Search &&
        listOfMovies?.Search.map((movieObj) => (
          <div class="specificMovieList">
            <div class="imageContainer">
              <img src={movieObj.Poster} alt=""></img>
            </div>
            <div class="specificMovieTitle">
              <p>{movieObj.Title}</p>
              <p>{movieObj.Year}</p>
            </div>
          </div>
        ))}
    </section>
  );
}

function Main({ children }) {
  return <main>{children}</main>;
}

function Navbar({
  listOfMovies,
  setListOfMovies,
  setIsLoading,
  setError,
  query,
  setQuery,
}) {
  const KEY = "57e0e46e";
  useEffect(() => {
    async function fetchData() {
      if (query === "") {
        setListOfMovies([]);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setError("");
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!res.ok) throw new Error("Something went wrong...");
          const data = await res.json();
          if (data.Response === "False") throw new Error("No movie found");
          setListOfMovies(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }, [query]);
  return (
    <nav>
      <div class="logo">
        <img src="jazrah.png" alt="logo" />
        <p>jazrah</p>
      </div>
      <input
        type="text"
        placeholder="search a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>
        Found{" "}
        {listOfMovies.Search?.length > 1 ? listOfMovies.Search?.length : "a"}{" "}
        {listOfMovies.Search?.length > 1 ? "movies" : "movie"}
      </p>
    </nav>
  );
}

function SpecificMovie() {
  return (
    <section class="specificMovie">
      <div class="clickedMovie">
        <div class="selectedMovie">
          <div class="selectedMoviePoster">kjdf</div>
          <div class="selectedMovieMainInfo">
            <p>Inception</p>
            <p>16 Jul 2020 - 148 min</p>
            <p>Action, Adventure, Sci-Fi</p>
            <p>8.5 IMDB</p>
          </div>
        </div>
        <div class="selectedMovieMore">
          <div class="starComponent">
            <p>19289821</p>
            <p>19289821</p>
            <p>19289821</p>
            <p>19289821</p>
            <p>19289821</p>
          </div>
          <div class="misc">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos cumque facere laboriosam repellendus quidem error
              perspiciatis dolores. Tenetur quod omnis libero nobis,
              repellendus, sit ut neque praesentium, enim alias atque?
            </p>
            <p>starring jdskfsdjfsdflkjdsklfj</p>
            <p>directed by dslkfjsdklf</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
