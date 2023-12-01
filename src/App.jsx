import { useState } from "react";
import "./App.css";
import Questions from "./components/Questions";
import { questions } from "./data/questions.json";

function App() {
  const [responses, setResponses] = useState({});
  const [finished, setFinished] = useState(false);
  const name = responses[0] || "";

  return (
    <div className="font-sans flex flex-col">
      <h1 className="text-3xl font-bold text-white mb-16">
        Entrepreneurial Journey {finished && "- Completion"}
      </h1>
      {!finished && (
        <Questions
          responses={responses}
          setResponses={setResponses}
          setFinished={setFinished}
        />
      )}
      {finished && (
        <>
          <h3 className="text-xl text-white my-6 w-6/12 mx-auto">
            <span className="text-sky-500">{name}</span>!{" "}
            {"Let's embark on your entrepreneurial journey"}
          </h3>
          <div className="flex-row w-6/12 mx-auto">
          {questions.slice(1).map((item, index) => (
            <div key={index} className="my-6 border-2 border-solid border-sky-500 rounded-lg">
              <h3 className="text-md text-white my-3 w-6/12 mx-auto">{item.title}</h3>
              <h4 className="italic text-sm text-white my-3 w-6/12 mx-auto">{responses[index + 1]}</h4>
            </div>
          ))}
          </div>
          <div className="flex-row w-6/12 mx-auto">
            <p className="text-xl text-white">We value your feedback! Please, <a href="https://www.thecommonones.com/contact" className="text-sky-500" target="_blank" rel="noreferrer">Contact Us</a> and share your thoughts.</p>
          </div>
        </>
      )}

    </div>
  );
}

export default App;
