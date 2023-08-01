import { useState, useEffect } from "react";

function App() {
  const [listOfMovies, setListOfMovies] = useState([]);
  return (
    <>
      <Navbar listOfMovies={listOfMovies} setListOfMovies={setListOfMovies} />
      <Main>
        <ListedMovies listOfMovies={listOfMovies} />
        <SpecificMovie />
      </Main>
    </>
  );
}
function ListedMovies({ listOfMovies }) {
  return (
    <section class="listedMovies">
      <div class="specificMovieList">
        <div class="imageContainer"></div>
        <div class="specificMovieTitle">
          <p>Inception</p>
          <p>2010</p>
        </div>
      </div>
    </section>
  );
}

function Main({ children }) {
  return <main>{children}</main>;
}

function Navbar({ listOfMovies, setListOfMovies }) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const KEY = "57e0e46e";
  useEffect(
    function () {
      async function request() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        const data = await res.json();
        setListOfMovies(data);
        console.log(data.Search);
      }
      request();
    },
    [query]
  );
  return (
    <nav>
      <div class="logo">
        <img src="jazrah.png" alt="logo" />
        <p>jazrah</p>
      </div>
      <input
        type="text"
        placeholder="search a movie..."
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : listOfMovies?.Search ? (
        <p>
          Found{" "}
          {listOfMovies.Search.length > 1 ? listOfMovies.Search.length : "a"}{" "}
          {listOfMovies.Search.length > 1 ? "movies" : "movie"}
        </p>
      ) : (
        <p>No movie found</p>
      )}
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
