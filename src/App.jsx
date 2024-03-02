import { useState, useEffect } from "react";
import "./App.css";
import Questions from "./components/Questions";
import * as content from "./data/questions.json";
import * as danishContent from "./data/questions-da.json";

function App() {
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [step, setStep] = useState('welcome');
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

  useEffect(() => {
    if (step === 'results') {
      (function (d,s,id) {
        var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//forms.aweber.com/form/48/139699748.js";
      fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "aweber-wjs-mz1mfjfbd")
    }
  }, [step])

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
        {step === 'welcome' && (
          <div className="flex my-8 flex-col items-center">
            <p className="w-8/12 text-start">
              Welcome to EnterQues, your mentor for a meaning journey.
              I am currently a prototype version of something great, you’re about to embark upon the beautiful
              journey of finding and forging your very own path. While the struggle is real, the reward is
              marvelous!<br /><br />
              I will help you to gather your project, thoughts, and ideas in a practical manner, be it a business, a
              social enterprise, or a non-profit. Though this doesn’t guarantee you success, it will bring structure
              to your thought process and give you room to experiment.<br /><br />
              I am currently being developed by The common Ones, please feel free to reach out.
            </p>
            <button
              type="button"
              className="mt-8 rounded-md text-white bg-blue-700 px-2.5 py-1.5 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-blue-800"
              onClick={() => setStep('questions')}
            >
              Let's start
            </button>
          </div>
        )}
        {step === 'questions' && (
          <Questions
            index={index}
            setIndex={setIndex}
            key={`questions-${language}`}
            language={language}
            questions={questions}
            responses={responses}
            setResponses={setResponses}
            setStep={setStep}
          />
        )}
        {step === 'results' && (
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
              <p className="text-xl text-black mt-8">
                If you’d like to know about my development please subscribe to my newsletter.
              </p>
              <div className="AW-Form-139699748"></div>
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
