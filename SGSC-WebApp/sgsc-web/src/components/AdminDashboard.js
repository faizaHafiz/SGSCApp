import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';
import TimetableCreator from './TimetableCreator';

const AdminDashboard = () => {
  const { state } = useLocation();
  const { user } = state || {};
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Mock student list (replace with /api/queries/students)
    setStudents([{ id: '1', name: 'John Doe', phoneNumber: '+1234567890' }]);
  }, []);

  const handleCreateStudent = async () => {
    try {
      await api.createStudent({ name, phoneNumber });
      setStatus('Student created successfully!');
      setStudents([...students, { id: new Date().toString(), name, phoneNumber }]);
      setName('');
      setPhoneNumber('');
    } catch (error) {
      setStatus('Failed to create student.');
      console.error('Failed to create student:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, Admin {user?.name}</h1>
        <p className="text-gray-600">Admin Dashboard</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Students</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 && (
                  <tr>
                    <td colSpan="2" className="p-3 text-gray-500 text-center">No students available.</td>
                  </tr>
                )}
                {students.map((student) => (
                  <tr key={student.id} className="border-t">
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Add Student & Timetable Forms */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Add Student</h2>
            {status && (
              <p className={`text-sm mb-4 ${status.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {status}
              </p>
            )}
            <input
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
              placeholder="Phone Number (e.g., +1234567890)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white p-3 w-full rounded-lg hover:bg-blue-700 transition duration-200 mt-4"
              onClick={handleCreateStudent}
            >
              Add Student
            </button>
          </div>
          <TimetableCreator />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;