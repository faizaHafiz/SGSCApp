import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';

const MCQScreen = () => {
  const { state } = useLocation();
  const { user } = state || {};
  const [mcqs, setMCQs] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    if (user) {
      api.getDailyMCQs().then(setMCQs);
    }
  }, [user]);

  const handleAnswerChange = (mcqId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [mcqId]: answer });
  };

  const handleSubmit = async (mcqId) => {
    try {
      const result = await api.submitMCQAnswer(mcqId, selectedAnswers[mcqId]);
      setResults({ ...results, [mcqId]: result.isCorrect });
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Daily CET MCQs</h1>
        <p className="text-gray-600">Test your knowledge!</p>
      </header>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">MCQs</h2>
        {mcqs.length === 0 && <p className="text-gray-500">No MCQs available.</p>}
        {mcqs.map((mcq) => (
          <div key={mcq.id} className="mb-6 p-4 bg-gray-100 rounded-md">
            <p className="font-medium mb-2">{mcq.question}</p>
            <div className="space-y-2">
              {mcq.options.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name={`mcq-${mcq.id}`}
                    value={option}
                    checked={selectedAnswers[mcq.id] === option}
                    onChange={() => handleAnswerChange(mcq.id, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            <button
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200 mt-4"
              onClick={() => handleSubmit(mcq.id)}
              disabled={!selectedAnswers[mcq.id]}
            >
              Submit
            </button>
            {results[mcq.id] !== undefined && (
              <p className={`mt-2 ${results[mcq.id] ? 'text-green-600' : 'text-red-600'}`}>
                {results[mcq.id] ? 'Correct!' : 'Incorrect.'}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCQScreen;