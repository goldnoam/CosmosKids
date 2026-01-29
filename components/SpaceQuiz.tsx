
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';

const SpaceQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === QUIZ_QUESTIONS[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentQuestion + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (showResult) {
    return (
      <div className="text-center bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-700 shadow-2xl animate-scaleIn max-w-2xl mx-auto mb-16 md:mb-0">
        <div className="text-5xl md:text-6xl mb-6">🏆</div>
        <h2 className="text-3xl md:text-4xl font-black mb-4">כל הכבוד, אסטרונאוט!</h2>
        <p className="text-xl md:text-2xl text-slate-300 mb-8">
          הניקוד שלך: <span className="text-cyan-400 font-black">{score}</span> מתוך <span className="text-white">{QUIZ_QUESTIONS.length}</span>
        </p>
        <button
          onClick={restartQuiz}
          className="w-full md:w-auto bg-gradient-to-r from-cyan-600 to-purple-600 px-10 py-4 rounded-full font-bold text-lg md:text-xl hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          נסה שוב! 🚀
        </button>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden animate-fadeIn mb-16 md:mb-0">
      <div className="bg-slate-800 p-4 md:p-6 border-b border-slate-700 flex justify-between items-center">
        <h3 className="text-lg md:text-xl font-bold text-cyan-400">חידון חלל</h3>
        <span className="bg-slate-700/50 px-3 py-1 rounded-full text-[10px] md:text-xs text-slate-300 border border-slate-600">שאלה {currentQuestion + 1} מתוך {QUIZ_QUESTIONS.length}</span>
      </div>

      <div className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 leading-tight min-h-[3rem]">{q.question}</h2>
        <div className="grid gap-3 md:gap-4">
          {q.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`p-4 rounded-xl text-right transition-all border-2 text-base md:text-lg font-medium transform active:scale-[0.98] ${
                isAnswered
                  ? idx === q.correctAnswer
                    ? 'bg-green-900/40 border-green-500 text-white'
                    : idx === selectedOption
                    ? 'bg-red-900/40 border-red-500 text-white'
                    : 'bg-slate-800 border-slate-700 opacity-50'
                  : 'bg-slate-800 border-slate-700 hover:border-cyan-500 hover:bg-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="flex-1 ml-2">{option}</span>
                {isAnswered && idx === q.correctAnswer && <span className="text-green-400 flex-shrink-0">✅</span>}
                {isAnswered && idx === selectedOption && idx !== q.correctAnswer && <span className="text-red-400 flex-shrink-0">❌</span>}
              </div>
            </button>
          ))}
        </div>

        {isAnswered && (
          <button
            onClick={nextQuestion}
            className="mt-6 md:mt-8 w-full bg-cyan-600 py-3 md:py-4 rounded-xl font-black text-lg md:text-xl hover:bg-cyan-500 active:bg-cyan-700 transition-all shadow-lg shadow-cyan-900/30"
          >
            {currentQuestion + 1 === QUIZ_QUESTIONS.length ? 'סיום' : 'לשאלה הבאה'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SpaceQuiz;
