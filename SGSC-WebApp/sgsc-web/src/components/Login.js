import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.login(email, password);
      setError('');
      if (response.user.role === 'student') {
        navigate('/student', { state: { user: response.user } });
      } else if (response.user.role === 'teacher') {
        navigate('/teacher', { state: { user: response.user } });
      } else if (response.user.role === 'admin') {
        navigate('/admin', { state: { user: response.user } });
      } else if (response.user.role === 'parent') {
        navigate('/parent', { state: { user: response.user } });
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login failed:', error);
    }
  };

  // Mock navigation for testing
  const handleMockLogin = (role) => {
    const mockUser = {
      id: 'test123',
      name: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      role: role,
    };
    navigate(`/${role}`, { state: { user: mockUser } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm transform transition duration-300 hover:shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">SGSC Login</h1>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <input
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white p-3 w-full rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="text-center">
          <p className="text-gray-600 mb-2">Test Dashboards Without Login:</p>
          <div className="flex flex-col space-y-2">
            <button
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200"
              onClick={() => handleMockLogin('student')}
            >
              Test Student Dashboard
            </button>
            <button
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200"
              onClick={() => handleMockLogin('teacher')}
            >
              Test Teacher Dashboard
            </button>
            <button
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200"
              onClick={() => handleMockLogin('admin')}
            >
              Test Admin Dashboard
            </button>
            <button
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200"
              onClick={() => handleMockLogin('parent')}
            >
              Test Parent Dashboard
            </button>
            <button
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200"
              onClick={() => handleMockLogin('mcqs')}
            >
              Test MCQ Screen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;