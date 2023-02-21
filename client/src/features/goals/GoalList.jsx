import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

import { deleteGoal } from './goalsSlice.js';

// 📦 Component - GoalList
const GoalList = ({ goals }) => (
  <AnimatePresence>
    <ul className='grid gap-2.5 sm:grid-cols-2'>
      {goals.map(goal =>
        <motion.div
          key={goal._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          layout
        >
          <GoalItem goal={goal} />
        </motion.div>)}
    </ul>
  </AnimatePresence>
);

export default GoalList;

// 📦 Component - GoalItem
const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteGoal(goal._id));
    toast.success(`Goal ${goal.text} deleted`);
  };

  return <li
    className='grid gap-2 relative place-items-center min-h-[150px] p-3 pt-9 text-center bg-gray-100 rounded-md border-2 border-neutral-800'>
    {/* */}
    <p className='text-sm font-semibold absolute left-3 top-3 py-0.5 px-2 bg-neutral-800 rounded-md text-white'>
      {new Date(goal.createdAt).toLocaleString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      })}
    </p>
    {/* */}
    <h3 className='text-lg font-bold'>{goal.text}</h3>
    {/* */}
    <button
      className='absolute right-2.5 top-2.5 text-red-500 font-bold'
      onClick={onDelete}
    >
      <FiX size={25} />
    </button>
  </li>;
};
