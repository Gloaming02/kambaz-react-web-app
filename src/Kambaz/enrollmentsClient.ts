import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const findMyEnrollments = async () => {
  const response = await axios.get(`${ENROLLMENTS_API}/user/current`, {
    withCredentials: true,
  });
  return response.data;
};

export const enroll = async (userId: string, courseId: string) => {
  await axios.post(ENROLLMENTS_API, { user: userId, course: courseId });
};

export const unenroll = async (userId: string, courseId: string) => {
  await axios.delete(`${ENROLLMENTS_API}?user=${userId}&course=${courseId}`);
};
