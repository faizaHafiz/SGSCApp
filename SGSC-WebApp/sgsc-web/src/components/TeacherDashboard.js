import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';

const TeacherDashboard = () => {
  const { state } = useLocation();
  const { user } = state || {};
  const [marks, setMarks] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [testId, setTestId] = useState('');
  const [testName, setTestName] = useState('');
  const [score, setScore] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [notificationStatus, setNotificationStatus] = useState('');

  useEffect(() => {
    if (user) {
      api.getStudentMarks('all').then(setMarks);
    }
  }, [user]);

  const handleUpdateMarks = async () => {
    try {
      await api.updateMarks({ studentId, testId, testName, score: parseInt(score) });
      setNotificationStatus('Marks updated successfully!');
      api.getStudentMarks('all').then(setMarks);
      setStudentId('');
      setTestId('');
      setTestName('');
      setScore('');
    } catch (error) {
      setNotificationStatus('Failed to update marks.');
      console.error('Failed to update marks:', error);
    }
  };

  const handleSendNotification = async () => {
    try {
      await api.sendNotification(phoneNumber, message);
      setNotificationStatus('Notification sent successfully!');
      setPhoneNumber('');
      setMessage('');
    } catch (error) {
      setNotificationStatus('Failed to send notification.');
      console.error('Failed to send notification:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, Teacher {user?.name}</h1>
        <p className="text-gray-600">Teacher Dashboard</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Marks List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Student Marks</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3">Student ID</th>
                  <th className="p-3">Test Name</th>
                  <th className="p-3">Score</th>
                </tr>
              </thead>
              <tbody>
                {marks.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-3 text-gray-500 text-center">No marks available.</td>
                  </tr>
                )}
                {marks.map((mark) => (
                  <tr key={mark.testId} className="border-t">
                    <td className="p-3">{mark.studentId}</td>
                    <td className="p-3">{mark.testName}</td>
                    <td className="p-3">{mark.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Update Marks & Notification Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Manage Marks & Notifications</h2>
          {notificationStatus && (
            <p className={`text-sm mb-4 ${notificationStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {notificationStatus}
            </p>
          )}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-600">Update Marks</h3>
            <input
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <input
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Test ID"
              value={testId}
              onChange={(e) => setTestId(e.target.value)}
            />
            <input
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Test Name"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
            />
            <input
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Score"
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
            <button
              className="bg-green-600 text-white p-3 w-full rounded-lg hover:bg-green-700 transition duration-200"
              onClick={handleUpdateMarks}
            >
              Update Marks
            </button>
            <h3 className="text-md font-medium text-gray-600 mt-6">Send Notification</h3>
            <input
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Phone Number (e.g., +1234567890)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <textarea
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white p-3 w-full rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={handleSendNotification}
            >
              Send Notification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;