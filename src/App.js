import { useState, useEffect } from "react";

function App() {
  const [listOfMovies, setListOfMovies] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [currentMovieSelected, setCurrentMovieSelected] = useState(null);
  const [moviesYouRated, setMoviesYouRated] = useState([]);
  const [toggleMenu, setToggleMenu] = useState(true);
  function handleToggleMenu() {
    setToggleMenu((prev) => !prev);
  }
  return (
    <>
      <p class="list" onClick={() => handleToggleMenu()}>
        {!toggleMenu ? "see movie info" : "see movies you rated"}
      </p>
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
          setCurrentMovieSelected={setCurrentMovieSelected}
          currentMovieSelected={currentMovieSelected}
          setToggleMenu={setToggleMenu}
        />
        <SpecificMovie>
          {toggleMenu ? (
            <ClickedMovie
              currentMovieSelected={currentMovieSelected}
              key={currentMovieSelected?.imdbID}
              moviesYouRated={moviesYouRated}
              setMoviesYouRated={setMoviesYouRated}
              setToggleMenu={setToggleMenu}
            />
          ) : (
            <WatchedMovies
              moviesYouRated={moviesYouRated}
              setCurrentMovieSelected={setCurrentMovieSelected}
              setToggleMenu={setToggleMenu}
              setMoviesYouRated={setMoviesYouRated}
            />
          )}
        </SpecificMovie>
      </Main>
    </>
  );
}

function WatchedMovies({
  moviesYouRated,
  setCurrentMovieSelected,
  setToggleMenu,
  setMoviesYouRated,
}) {
  const avgImdb = moviesYouRated.reduce((acc, curr) => {
    return acc + curr.imdbRating;
  }, 0);
  const findMax = moviesYouRated.map((obj) => obj.imdbRating);
  const averageRuntime = moviesYouRated.reduce((acc, curr) => {
    return acc + curr.Runtime;
  }, 0);
  function handleRemoveFromRated(imdbID) {
    setMoviesYouRated((prev) => {
      const updated = [...prev];
      const filtered = updated.filter((obj) => obj.imdbID !== imdbID);
      return filtered;
    });
  }
  return (
    <section class="ratedMovies">
      <div class="top">
        <p>Movies you rated:</p>
        {moviesYouRated.length > 0 ? (
          <div class="statsTop">
            <p>
              {moviesYouRated.length}{" "}
              {moviesYouRated.length > 1 ? "movies" : "movie"}
            </p>
            <p>{(avgImdb / moviesYouRated.length).toFixed(2)} stars imdb avg</p>
            <p>highest: {Math.max(...findMax)}</p>
            <p>
              avg duration:{" "}
              {(averageRuntime / moviesYouRated.length).toFixed(2)} mins
            </p>
          </div>
        ) : (
          <p>Please rate a movie!</p>
        )}
      </div>
      <div class="bottom">
        {moviesYouRated &&
          moviesYouRated.map((obj) => (
            <div class="specificBottomMovie">
              <div class="imgContainer">
                <img src={obj.Poster} alt="logo" />
              </div>
              <div class="infoBottom">
                <p>{obj.Title}</p>
                <div>
                  <p>{obj.imdbRating} stars imdb</p>
                  <p>{obj.Stars} stars</p>
                  <p>{obj.Runtime} min</p>
                </div>
                <div className="specificBottomMovieNavigation">
                  <svg
                    onClick={() => handleRemoveFromRated(obj.imdbID)}
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                  <svg
                    onClick={() => {
                      setCurrentMovieSelected(obj);
                      setToggleMenu(true);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 0 576 512"
                  >
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

function ClickedMovie({
  currentMovieSelected,
  moviesYouRated,
  setMoviesYouRated,
  setToggleMenu,
}) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isWatched, setIsWatched] = useState(false);
  function handleAddMoviesYouRated(movieObj) {
    const {
      Title,
      imdbRating,
      imdbID,
      Runtime,
      Poster,
      Released,
      Genre,
      Actors,
      Director,
    } = movieObj;
    const movieRated = {
      Poster,
      Title,
      imdbRating: Number(imdbRating),
      imdbID,
      Runtime: Number(Runtime.split(" ")[0]),
      Stars: rating,
      Released,
      Genre,
      Actors,
      Director,
    };
    let existingMovieIndex = moviesYouRated.findIndex(
      (obj) => obj.imdbID === movieObj.imdbID
    );
    if (existingMovieIndex > -1) {
      if (moviesYouRated[existingMovieIndex].Stars !== rating) {
        const updated = {
          ...moviesYouRated[existingMovieIndex],
          Stars: rating,
        };
        setMoviesYouRated((prev) => {
          const newArray = prev.map((movie, index) =>
            index === existingMovieIndex ? updated : movie
          );
          return newArray;
        });
      }
    } else {
      setMoviesYouRated((prev) => {
        const newArray = [movieRated, ...prev];
        return newArray;
      });
    }
    setToggleMenu(false);
  }
  useEffect(
    function () {
      const findMovie = moviesYouRated.find(
        (movieObj) => movieObj.imdbID === currentMovieSelected.imdbID
      );
      setIsWatched(findMovie ? true : false);
      setRating(findMovie ? findMovie.Stars : 0);
    },
    [currentMovieSelected, moviesYouRated]
  );
  return (
    <section class="specificMovie">
      {currentMovieSelected ? (
        <div class="clickedMovie">
          <div class="selectedMovie">
            <div class="selectedMoviePoster">
              <img
                src={currentMovieSelected.Poster}
                alt="specific movie poster"
              />
            </div>
            <div class="selectedMovieMainInfo">
              <p>{currentMovieSelected.Title}</p>
              <p>
                {currentMovieSelected.Released}- {currentMovieSelected.Runtime}
              </p>
              <p>{currentMovieSelected.Genre}</p>
              <p>{currentMovieSelected.imdbRating} IMDB</p>
            </div>
          </div>
          <div class="selectedMovieMore">
            <div class="starComponent">
              {isWatched ? (
                <span class="alreadyRated">
                  You already Rated this movie {rating}{" "}
                  {rating > 1 ? "stars" : "star"}. If you want to change the
                  rating, delete it from movies you rated and rate it again.
                </span>
              ) : (
                <>
                  <p>Rate: </p>
                  <div className="svgContainer">
                    {Array.from({ length: 10 }, (_, index) => (
                      <svg
                        onClick={() => {
                          if (rating === index + 1) {
                            setRating(0);
                            setHoveredRating(0);
                          } else {
                            setRating(index + 1);
                          }
                        }}
                        onMouseEnter={() => setHoveredRating(index + 1)}
                        onMouseLeave={() => setHoveredRating(0)}
                        key={`kjdsfjsdkf${index}9919`}
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        zoomAndPan="magnify"
                        viewBox="0 0 375 374.999991"
                        preserveAspectRatio="xMidYMid meet"
                        version="1.0"
                        style={
                          index < rating
                            ? { filter: "contrast(2)" }
                            : index < hoveredRating
                            ? { filter: "contrast(2)" }
                            : {}
                        }
                      >
                        <path
                          fill="#ffffff"
                          d="M 153.132812 224.882812 C 153.046875 208.089844 152.902344 180.625 152.835938 163.855469 C 152.753906 147.0625 165.304688 140.136719 179.636719 148.457031 C 193.988281 156.78125 217.886719 170.398438 232.238281 178.699219 C 246.570312 187.019531 246.863281 200.742188 232.617188 209.214844 C 218.351562 217.683594 194.261719 231.535156 179.996094 240.003906 C 165.75 248.472656 153.21875 241.675781 153.132812 224.882812 Z M 153.132812 224.882812 "
                          fillOpacity="1"
                          fillRule="nonzero"
                        />
                        <path
                          fill="#8cc640"
                          d="M 122.949219 181.832031 C 123.921875 122.75 139.121094 95.09375 158.066406 81.730469 C 168.648438 75.738281 177.347656 74.617188 185.476562 74.425781 C 191.46875 74.277344 197.226562 74.785156 202.773438 75.78125 C 220.382812 78.027344 259.078125 89.671875 295.910156 123.683594 C 276.332031 73.664062 216.65625 39.507812 161.980469 47.46875 C 119.964844 53.566406 83.492188 88.019531 79.957031 163.175781 C 76.929688 227.636719 105.503906 268.570312 127.394531 262.960938 C 125.042969 232.0625 122.589844 202.882812 122.949219 181.832031 Z M 122.949219 181.832031 "
                          fillOpacity="1"
                          fillRule="nonzero"
                        />
                        <path
                          fill="#f15b26"
                          d="M 205.96875 254.296875 C 154.46875 283.226562 122.925781 284.050781 101.84375 274.414062 C 91.34375 268.273438 85.96875 261.351562 81.714844 254.425781 C 78.558594 249.320312 76.101562 244.113281 74.175781 238.796875 C 67.234375 222.449219 57.792969 183.144531 68.589844 134.1875 C 35.269531 176.304688 35.863281 245.085938 70.28125 288.308594 C 96.742188 321.511719 144.855469 335.65625 211.515625 300.84375 C 268.710938 270.964844 289.644531 225.644531 273.746094 209.574219 C 248.304688 227.171875 224.34375 243.984375 205.96875 254.296875 Z M 205.96875 254.296875 "
                          fillOpacity="1"
                          fillRule="nonzero"
                        />
                        <path
                          fill="#29aae2"
                          d="M 227.664062 146.363281 C 278.109375 177.089844 294.300781 204.171875 296.226562 227.296875 C 296.039062 239.472656 292.609375 247.542969 288.691406 254.65625 C 285.792969 259.910156 282.449219 264.609375 278.785156 268.910156 C 267.949219 282.972656 238.335938 310.480469 190.367188 325.046875 C 243.394531 333.433594 303.023438 299.234375 323.808594 248.007812 C 339.769531 208.664062 328.507812 159.765625 265.492188 118.707031 C 211.429688 83.488281 161.683594 87.449219 155.460938 109.175781 C 183.277344 122.773438 209.671875 135.414062 227.664062 146.363281 Z M 227.664062 146.363281 "
                          fillOpacity="1"
                          fillRule="nonzero"
                        />
                      </svg>
                    ))}
                  </div>
                  <p>
                    {rating > 0
                      ? `Rated: ${rating}`
                      : `Rated: ${hoveredRating}`}
                  </p>
                </>
              )}
            </div>
            <div class="misc">
              {!isWatched && rating > 0 ? (
                <div>
                  <button
                    onClick={() => {
                      handleAddMoviesYouRated(currentMovieSelected);
                    }}
                  >
                    Add to list
                  </button>
                </div>
              ) : (
                ""
              )}
              <p>{currentMovieSelected.Plot}</p>
              <p>starring {currentMovieSelected.Actors}</p>
              <p>directed by {currentMovieSelected.Director}</p>
            </div>
          </div>
        </div>
      ) : (
        <p class="pleaseSelectAMovie">Please select a movie</p>
      )}
    </section>
  );
}

function SpecificMovie({ children }) {
  return <>{children} </>;
}

function ListedMovies({
  listOfMovies,
  isLoading,
  error,
  query,
  setCurrentMovieSelected,
  currentMovieSelected,
  setToggleMenu,
}) {
  function handleClickSpecificMovie(id) {
    async function fetchData() {
      const res = await fetch(
        `http://www.omdbapi.com/?i=${id}&apikey=57e0e46e`
      );
      const data = await res.json();
      console.log(data);
      setCurrentMovieSelected(data);
    }
    fetchData();
    setToggleMenu(true);
  }
  return (
    <section class="listedMovies">
      {query === "" && <p class="messageListMovie">Enter a movie</p>}
      {error && query !== "" && <p class="messageListMovie">{error}</p>}
      {isLoading && !error && <p class="messageListMovie">Loading...</p>}
      {!isLoading &&
        !error &&
        listOfMovies.Search &&
        listOfMovies?.Search.map((movieObj) => (
          <div
            key={movieObj.imdbID}
            class="specificMovieList"
            onClick={() => handleClickSpecificMovie(movieObj.imdbID)}
            style={
              currentMovieSelected &&
              currentMovieSelected.imdbID === movieObj.imdbID
                ? {
                    background: "linear-gradient(-300deg, #ff2e00, #9aff00)",
                    backgroundSize: "400% 400%",
                    animation: "gradient 7s ease infinite",
                    boxShadow: "0 4px 10px rgba(300, 300, 300, .4)",
                  }
                : {}
            }
          >
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
        {listOfMovies.Search?.length > 1
          ? listOfMovies.Search?.length
          : listOfMovies.Search?.length === 1
          ? "a"
          : "no"}{" "}
        {listOfMovies.Search?.length > 1 ? "movies" : "movie"}
      </p>
    </nav>
  );
}

export default App;
