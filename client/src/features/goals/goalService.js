import axios from 'axios';

// const URL = 'http://localhost:5000/api/goals';
const URL = '/api/goals';

const headers = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const goalService = {
  /**
   * @description Get goals
   * @param _
   * @param getState
   * @param rejectWithValue
   * @return {Promise<*>}
   */
  get: async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const { data } = await axios.get(URL, headers(token));
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
  /**
   * @description Create goal
   * @param payload Form data
   * @param getState
   * @param rejectWithValue
   * @return {Promise<*>}
   */
  create: async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const { data } = await axios.post(URL, payload, headers(token));
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
  /**
   * @description Update goal
   * @param payload Form data
   * @param getState
   * @param rejectWithValue
   * @return {Promise<*>}
   */
  update: async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const { data } = await axios.put(`${URL}/${payload.id}`, { text: payload.text }, headers(token));
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
  /**
   * @description Delete goal
   * @param payload Form data
   * @param getState
   * @param rejectWithValue
   * @return {Promise<*>}
   */
  delete: async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const { data: { id } } = await axios.delete(`${URL}/${payload}`, headers(token));
      return id;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
};
