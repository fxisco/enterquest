import { useState, useRef, useEffect } from "react";
import { questions } from "../data/questions.json";
import autosize from "autosize";

function Questions({ responses, setFinished, setResponses }) {
  const [index, setIndex] = useState(0);
  const textarea = useRef(null)
  const alignment = index > 0 ? "justify-between" : "justify-end";
  const currentQuestion = questions[index].title;
  const filledQuestionsQty = Object.values(responses).reduce((accum, val) => {
    if (val !== '') accum++

    return accum
  }, 0)
  const formFinished = filledQuestionsQty === questions.length

  const onResponseEnter = (e) => {
    setResponses((prev) => ({
      ...prev,
      [index]: e.target.value
    }))
  };

  const goForward = () => {
    if (index + 1 === questions.length) return;
    setIndex((prev) => prev + 1);
  };

  const goBackward = () => {
    if (index - 1 === -1) return;
    setIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (textarea.current) {
      autosize(textarea.current);
    }
  }, [])

  return (
    <>
      <h2 className="text-xl font-bold text-white my-3">
        Question {index + 1}:{" "}
      </h2>
      <h3 className="text-xl italic text-white my-6 w-6/12 mx-auto">
        {currentQuestion}
      </h3>
      <div className="flex justify-center my-8">
        <textarea
          ref={textarea}
          type="text"
          className="block w-6/12 py-2.5 pl-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 rounded-md resize-y"
          placeholder="Response"
          value={responses[index] ? responses[index] : ''}
          onChange={onResponseEnter}
        ></textarea>
      </div>
      {questions.length > 1 && (
        <div className={`flex w-6/12 my-8 mx-auto ${alignment}`}>
          {index > 0 && (
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={goBackward}
            >
              Previous
            </button>
          )}
          {index + 1 !== questions.length && responses[index]?.trim('') && (
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={goForward}
            >
              Next
            </button>
          )}
        </div>
      )}
      {formFinished &&
        <div className="flex w-6/12 my-8 mx-auto">
          <button
            type="button"
            className="w-full rounded-md bg-black px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black"
            onClick={() => setFinished(true)}
          >
            Finish form
          </button>
        </div>
      }
    </>
  );
}

export default Questions;
