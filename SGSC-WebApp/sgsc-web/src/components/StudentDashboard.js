import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';

const StudentDashboard = () => {
  const { state } = useLocation();
  const { user } = state || {};
  const [timetable, setTimetable] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    if (user) {
      api.getTimetable(user.id).then(setTimetable);
      api.getLeaderboard('test1').then(setLeaderboard);
      api.getStudentMarks(user.id).then(setMarks);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Student Dashboard</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Timetable */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Timetable</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {timetable.length === 0 && <p className="text-gray-500">No timetable available.</p>}
            {timetable.map((item) => (
              <div key={item.id} className="p-3 bg-gray-100 rounded-md">
                <span className="font-medium">{item.day}</span>: {item.schedule}
              </div>
            ))}
          </div>
        </div>
        {/* Leaderboard */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Leaderboard (Test 1)</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {leaderboard.length === 0 && <p className="text-gray-500">No leaderboard data.</p>}
            {leaderboard.map((entry, index) => (
              <div key={index} className="p-3 bg-gray-100 rounded-md flex justify-between">
                <span>{entry.studentId}</span>
                <span className="font-medium">{entry.score}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Marks */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Your Marks</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {marks.length === 0 && <p className="text-gray-500">No marks available.</p>}
            {marks.map((mark) => (
              <div key={mark.testId} className="p-3 bg-gray-100 rounded-md flex justify-between">
                <span>{mark.testName}</span>
                <span className="font-medium">{mark.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;