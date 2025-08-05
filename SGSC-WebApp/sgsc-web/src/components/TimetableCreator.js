import React, { useState } from 'react';
import api from '../utils/api';

const TimetableCreator = () => {
  const [day, setDay] = useState('');
  const [schedule, setSchedule] = useState('');
  const [status, setStatus] = useState('');

  const handleCreateTimetable = async () => {
    try {
      // Mock endpoint (replace with /api/commands/create-timetable)
      await fetch('http://localhost:5000/api/commands/create-timetable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day, schedule }),
      });
      setStatus('Timetable created successfully!');
      setDay('');
      setSchedule('');
    } catch (error) {
      setStatus('Failed to create timetable.');
      console.error('Failed to create timetable:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Create Timetable</h2>
      {status && (
        <p className={`text-sm mb-4 ${status.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {status}
        </p>
      )}
      <input
        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        placeholder="Day (e.g., Monday)"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      />
      <textarea
        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        placeholder="Schedule (e.g., Math 9AM, Science 10AM)"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white p-3 w-full rounded-lg hover:bg-blue-700 transition duration-200"
        onClick={handleCreateTimetable}
      >
        Create Timetable
      </button>
    </div>
  );
};

export default TimetableCreator;