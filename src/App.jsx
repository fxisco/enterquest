import { useState, useEffect } from "react";
import "./App.css";
import Questions from "./components/Questions";
import * as content from "./data/questions.json";
import * as danishContent from "./data/questions-da.json";

function App() {
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [finished, setFinished] = useState(false);
  const [language, setLanguage] = useState('en');
  const isDanish = language === 'da'
  const translation = isDanish ? danishContent : content;
  const {
    questions,
    title,
    finishTitle,
    feedback,
    contactUs,
    share,
  } = translation;

  useEffect(() => {
    const savedLang = localStorage.getItem('enterquest:lang')

    setLanguage(savedLang ? savedLang : 'en')
  }, [setLanguage])

  const name = responses[0] || "";

  const onLanguageChange = (e) => {
    setLanguage(e.target.value)
    localStorage.setItem('enterquest:lang', e.target.value)
  }

  return (
    <div className="font-sans relative">
      <div className="font-sans flex flex-col">
        <div className="flex mb-6 m-auto">
          <h1 className="text-3xl font-bold text-black mr-3">{title}</h1>
          <select
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onChange={(e) => onLanguageChange(e)}
            value={language}
          >
            <option value={"en"}>EN</option>
            <option value={"da"}>DA</option>
          </select>
        </div>
        {!finished && (
          <Questions
            index={index}
            setIndex={setIndex}
            key={`questions-${language}`}
            language={language}
            questions={questions}
            responses={responses}
            setResponses={setResponses}
            setFinished={setFinished}
          />
        )}
        {finished && (
          <>
            <h3 className="text-xl text-black my-6 w-6/12 mx-auto">
              <span className="text-sky-500">{name}</span>! {finishTitle}
            </h3>
            <div className="flex-row w-10/12 md:w-6/12 mx-auto">
              {questions.slice(1).map((item, index) => (
                <div
                  key={index}
                  className="my-6 border-2 border-solid border-sky-500 rounded-lg"
                >
                  <h3 className="text-md text-black my-3 w-6/12 mx-auto">
                    {item.title}
                  </h3>
                  <h4 className="italic text-sm text-black my-3 w-6/12 mx-auto">
                    {responses[index + 1]}
                  </h4>
                </div>
              ))}
            </div>
            <div className="flex-row w-10/12 md:w-6/12 mx-auto">
              <p className="text-xl text-black">
                {feedback}{" "}
                <a
                  href="https://www.thecommonones.com/contact"
                  className="text-sky-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  {contactUs}
                </a>{" "}
                {share}
              </p>
              <img
                className="max-w-s ml-auto mr-auto"
                src={`/assets/${questions[0].avatar}`}
                alt="Avatar"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
