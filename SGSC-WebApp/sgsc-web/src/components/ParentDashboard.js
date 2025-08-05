import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';

const ParentDashboard = () => {
  const { state } = useLocation();
  const { user } = state || {};
  const [childMarks, setChildMarks] = useState([]);

  useEffect(() => {
    if (user) {
      api.getStudentMarks('child-id').then(setChildMarks); // Replace 'child-id' with actual logic
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, Parent {user?.name}</h1>
        <p className="text-gray-600">Parent Dashboard</p>
      </header>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Child's Marks</h2>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {childMarks.length === 0 && <p className="text-gray-500">No marks available.</p>}
          {childMarks.map((mark) => (
            <div key={mark.testId} className="p-3 bg-gray-100 rounded-md flex justify-between">
              <span>{mark.testName}</span>
              <span className="font-medium">{mark.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;