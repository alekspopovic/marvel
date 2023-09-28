import { useState } from "react";
import md5 from "md5";
import "../styles/Search.scss";
import Characters from "./Characters";
import Comics from "./Comics";

export default function Search() {
  const [characterData, setCharacterData] = useState(null);
  const [comicData, setComicData] = useState(null);
  const [characterName, setCharacterName] = useState("");

  const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
  const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;

  const handleSubmit = (event) => {
    event.preventDefault();

    getCharacterData();
  };

  const getCharacterData = () => {
    setCharacterData(null);
    setComicData(null);

    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);

    const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${characterName}&limit=100`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setCharacterData(result.data);
        console.log(result.data);
      })
      .catch(() => {
        console.log("error while getting character data");
      });
  };

  const getComicData = (characterId) => {
    window.scrollTo({ top: 0, left: 0 });

    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);

    const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setComicData(result.data);
        console.log(result.data);
      })
      .catch(() => {
        console.log("error while getting comic data");
      });
  };

  const handleChange = (event) => {
    setCharacterName(event.target.value);
  };

  const generateHash = (timeStamp) => {
    return md5(timeStamp + privateKey + publicKey);
  };

  const handleReset = () => {
    setCharacterName("");
    setCharacterData(null);
    setComicData(null);
  };

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter character name"
          onChange={handleChange}
        />
        <div className="buttons">
          <button type="submit">Get Character Data</button>
          <button type="reset" className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {!comicData && characterData && characterData.results[0] && (
        <Characters data={characterData.results} onClick={getComicData} />
      )}

      {comicData && comicData.results[0] && (
        <Comics data={comicData.results} onClick={() => {}} />
      )}
    </>
  );
}
