const api = {
  login: async (email, password) => {
    // Mock login response
    return {
      user: { id: 'test123', name: 'Test User', role: 'student' },
    };
  },
  getTimetable: async (userId) => {
    // Mock timetable data
    return [
      { id: '1', day: 'Monday', schedule: 'Math 9AM, Science 10AM' },
      { id: '2', day: 'Tuesday', schedule: 'English 9AM, History 10AM' },
    ];
  },
  getLeaderboard: async (testId) => {
    // Mock leaderboard data
    return [
      { studentId: 'student1', score: 95 },
      { studentId: 'student2', score: 88 },
    ];
  },
  getStudentMarks: async (studentId) => {
    // Mock marks data
    return [
      { testId: 'test1', testName: 'Math Test', score: 90 },
      { testId: 'test2', testName: 'Science Test', score: 85 },
    ];
  },
  updateMarks: async (marksData) => {
    // Mock update marks response
    return { success: true };
  },
  sendNotification: async (phoneNumber, message) => {
    // Mock notification response
    return { success: true };
  },
  createStudent: async (studentData) => {
    // Mock create student response
    return { success: true };
  },
  getDailyMCQs: async () => {
    // Mock MCQ data
    return [
      {
        id: '1',
        topic: 'Math',
        question: 'What is 2+2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4',
      },
    ];
  },
  submitMCQAnswer: async (mcqId, answer) => {
    // Mock MCQ answer response
    return { mcqId, answer, isCorrect: answer === '4' };
  },
};

export default api;