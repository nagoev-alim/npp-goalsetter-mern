import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { authSelect } from '../features/auth/authSlice.js';
import { getGoals, goalsSelect, resetGoalState } from '../features/goals/goalsSlice.js';

import { GoalForm, GoalList } from '../features/goals/index.js';
import toast from 'react-hot-toast';

// 📦 Component - Dashboard
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(authSelect.all);
  const goals = useSelector(goalsSelect.all);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (goals.error) {
        toast.error(goals.message);
      }
      dispatch(getGoals());
      return () => {
        dispatch(resetGoalState())
      }
    }
  }, [goals.error, goals.message, navigate, dispatch]);


  // 📦 Rendering
  return <div className='grid gap-4 p-3 max-w-2xl m-auto sm:py-10'>
    {/* Header */}
    <div className='grid gap-1 justify-items-center sm:gap-2'>
      <h1 className='font-bold text-lg flex flex-wrap items-center gap-1 sm:text-xl md:text-2xl md:gap-2'>
        👋 Welcome {user && user.name}
      </h1>
      {goals.goals.length !== 0 && <p className='text-neutral-500 md:font-bold md:text-xl'>Goals Dashboard</p>}
    </div>
    {/* Form */}
    <GoalForm />
    {/* Goals */}
    {goals.goals.length > 0
      ? <GoalList goals={goals.goals} />
      : <h3 className='text-center font-semibold'>🥲 You have not set any goals</h3>
    }
  </div>;
};

export default Dashboard;
