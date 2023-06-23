import React, { useState, useEffect } from "react";
import { ImBooks } from "react-icons/im";
import { BsFillMoonStarsFill } from "react-icons/bs";

function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  const dictionaryApi = async () => {
    const response = await fetch(url);
    const newWord = await response.json();
    setMeanings(newWord);
  };

  useEffect(() => {
    dictionaryApi();
  }, [word]);

  return (
    <main className={darkMode ? "dark" : ""}>
      <div className="dark:bg-gray-900 main">
        <div className="flex justify-between p-7">
          <ImBooks className="text-2xl dark:text-white" />
          <h3 className="dark:text-white">{word ? word : "Dictionary"}</h3>
          <BsFillMoonStarsFill
            onClick={() => setDarkMode(!darkMode)}
            className="cursor-pointer text-2xl dark:text-white"
          />
        </div>
        <div className="text-center">
          <form>
            <div>
              <input
                className="inputField dark:text-white"
                placeholder="Search for a word..."
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />
            </div>
          </form>
        </div>

        {meanings && (
          <div className="meanings dark:bg-gray-900">
            {meanings[0] && word && (
              <audio
                src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  height: "30px",
                  width: "100%",
                }}
                controls
              >
                Your browser doesn't support audio
              </audio>
            )}

            {word === "" ? (
              <span className="start dark:text-white">
                Start by typing a word...
              </span>
            ) : Array.isArray(meanings) ? (
              meanings.map((mean) =>
                mean.meanings.map((item) =>
                  item.definitions.map((def) => (
                    <div className="singleMeanings dark:bg-white dark:text-black">
                      <b key={def.definition}>{def.definition}</b>
                      <hr />
                      {def.example && (
                        <span>
                          <b>Example: </b>
                          {def.example}
                        </span>
                      )}
                      {def.synonyms && (
                        <span>
                          <b>Synonyms : </b>
                          {def.synonyms.map((s) => `${s}, `)}
                        </span>
                      )}
                    </div>
                  ))
                )
              )
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
