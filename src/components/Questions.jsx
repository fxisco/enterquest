import { useRef, useEffect, useState } from "react";
import { questions } from "../data/questions.json";
import autosize from "autosize";

function Questions({
  responses,
  setFinished,
  setResponses,
}) {
  const [index, setIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const textarea = useRef(null)
  const alignment = index > 0 ? "justify-between" : "justify-end";
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
    setCurrentQuestion('')
    setShowInput(false)
    setIndex((prev) => prev + 1);
  };

  const goBackward = () => {
    if (index - 1 === -1) return;
    setCurrentQuestion('')
    setShowInput(false)
    setIndex((prev) => prev - 1);
  };

  useEffect(() => {
    let questionIndex = -1;

    const type = () => {
      if (questionIndex === questions[index].title.length - 1) {
        setTimeout(() => {
          setShowInput(true)
        }, 1000)

        return
      }
      questionIndex++;

      setCurrentQuestion((question) => {
        return question + questions[index].title[questionIndex]
      })


      setTimeout(type, 25)
    }

    if (responses[index]) {
      setCurrentQuestion(questions[index].title)
      setShowInput(true)
    } else {
      type()
    }

  }, [index])

  useEffect(() => {
    if (textarea.current) {
      autosize(textarea.current);
    }
  }, [])

  return (
    <>
      <h3 className="text-xl italic text-white my-6 w-8/12 md:w-6/12 mx-auto">
        {currentQuestion}
      </h3>
      <div className="flex justify-center my-8">
        <textarea
          ref={textarea}
          style={{ display: showInput ? 'block' : 'none' }}
          type="text"
          className="w-8/12 md:w-6/12 py-2.5 pl-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 rounded-md resize-y"
          placeholder="Response"
          value={responses[index] ? responses[index] : ''}
          onChange={onResponseEnter}
        ></textarea>
      </div>
      {questions.length > 1 && (
        <div className={`flex w-8/12 md:w-6/12 my-8 mx-auto ${alignment}`}>
          {index > 0 && showInput && (
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={goBackward}
            >
              Previous
            </button>
          )}
          {index + 1 !== questions.length && responses[index]?.trim('') && showInput && (
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
      <img className="max-w-xs ml-auto mr-auto" src={`/assets/${questions[index].avatar}`} />
    </>
  );
}

export default Questions;
