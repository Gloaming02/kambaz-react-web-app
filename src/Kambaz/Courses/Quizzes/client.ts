import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

//attempt
export const getRemainingAttempts = async (quizId: string, userId: string) => {
  const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/quizzes/${quizId}/can-attempt/${userId}`);
  return response.data.remainingAttempts;
};

export const createQuizAttempt = async (attempt: any) => {
  const response = await axiosWithCredentials.post(`${REMOTE_SERVER}/api/quiz-attempts`, attempt);
  return response.data;
};

export const findAttemptsByUserAndQuiz = async (userId: string, quizId: string) => {
  const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/attempts/user/${userId}/quiz/${quizId}`);
  return response.data;
};

export const deleteQuizAttempt = async (attemptId: string) => {
  const response = await axiosWithCredentials.delete(`${REMOTE_SERVER}/api/quiz-attempts/${attemptId}`);
  return response.data;
};


//question
export const addQuestionToQuiz = async (quizId: string, question: any) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
};

export const updateQuestion = async (questionId: string, question: any) => {
  const response = await axiosWithCredentials.put(
    `${REMOTE_SERVER}/api/questions/${questionId}`,
    question
  );
  return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/quizzes/${quizId}/questions`
  );
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axiosWithCredentials.delete(
    `${REMOTE_SERVER}/api/questions/${questionId}`
  );
  return response.data;
};


//quiz

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quizId: string, quiz: any) => {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}`, quiz);
  return response.data;
};


export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/course/${courseId}`);
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const createQuizForCourse = async (courseId: string) => {
  const defaultQuiz = {
    title: "New Quiz",
    description: "",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes", 
    published: false,
    shuffleAnswers: true,
    timeLimit: 20,
    maxAttempts: 1,
    showCorrectAnswers: "Never",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    availableDate: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    untilDate: new Date().toISOString(),
    questions: []
  };

  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/course/${courseId}`,
    defaultQuiz
  );
  return response.data;
};
