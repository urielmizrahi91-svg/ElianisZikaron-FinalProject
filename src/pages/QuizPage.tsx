import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { quizQuestions } from '../data/quiz'

export default function QuizPage() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const question = quizQuestions[index]!

  useEffect(() => {
    heading.current?.focus()
  }, [index, finished])

  function chooseAnswer(option: number) {
    if (selected !== null) return
    setSelected(option)
    if (option === question.answer) setScore((previous) => previous + 1)
  }

  function nextQuestion() {
    if (selected === null) return
    if (index === quizQuestions.length - 1) setFinished(true)
    else {
      setIndex((previous) => previous + 1)
      setSelected(null)
    }
  }

  function restart() {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  return (
    <section className="content-panel quiz-panel">
      <h1>כמה אתם מכירים את אליאניס?</h1>
      <p>חמש שאלות מתוך סיפור החיים שמסרה המשפחה. אין הגבלת זמן.</p>
      {finished ? (
        <div>
          <h2 ref={heading} tabIndex={-1}>החידון הסתיים</h2>
          <p className="quiz-score">הניקוד שלכם: {score} מתוך {quizQuestions.length}</p>
          <p>תודה שהקדשתם רגע להכיר את סיפורו.</p>
          <button className="button" type="button" onClick={restart}>התחלה מחדש</button>
          <Link className="home-about-link" to="/about">לסיפור החיים</Link>
        </div>
      ) : (
        <div>
          <p>שאלה {index + 1} מתוך {quizQuestions.length} · ניקוד: {score}</p>
          <h2 ref={heading} tabIndex={-1}>{question.question}</h2>
          <div className="quiz-options" role="group" aria-label={question.question}>
            {question.options.map((option, optionIndex) => (
              <button
                className={`quiz-option${selected === optionIndex ? ' selected' : ''}`}
                type="button"
                key={option}
                disabled={selected !== null}
                onClick={() => chooseAnswer(optionIndex)}
              >
                {option}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div className="quiz-feedback" role="status">
              <p><strong>{selected === question.answer ? 'תשובה נכונה!' : `התשובה הנכונה: ${question.options[question.answer]}`}</strong></p>
              <p>{question.explanation}</p>
            </div>
          )}
          <button className="button" type="button" disabled={selected === null} onClick={nextQuestion}>
            {index === quizQuestions.length - 1 ? 'לסיכום' : 'לשאלה הבאה'}
          </button>
        </div>
      )}
    </section>
  )
}
