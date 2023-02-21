import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';

import { createGoal, goalsSelect, setEditStatus, updateGoal } from './goalsSlice.js';
import { goalSchema } from '../../utils/validateSchema.js';

import { ErrorMessage, Input } from '../../components/index.js';

// 📦 Component - GoalForm
const GoalForm = () => {
  const dispatch = useDispatch();
  const { editStatus } = useSelector(goalsSelect.all);
  const { register, handleSubmit, formState: { errors, isValid }, reset, setValue } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(goalSchema),
    defaultValues: { goal: '' },
  });

  useEffect(() => {
    if (editStatus.isEditable) {
      setValue('goal', editStatus.item.text);
    }
  }, [editStatus]);

  const onSubmit = ({ goal: text }) => {
    if (editStatus.isEditable) {
      dispatch(updateGoal({ text, id: editStatus.item._id }));
      dispatch(setEditStatus({
        isEditable: false,
        item: null,
      }));
    } else {
      dispatch(createGoal({ text }));
    }
    toast.success(`Goal was successfully ${editStatus.isEditable ? 'updated' : 'created'}`);
    reset();
  };

  // 📦 Rendering
  return <form className='grid gap-2 max-w-lg w-full m-auto sm:gap-3' onSubmit={handleSubmit(onSubmit)}>
    {/*  */}
    <label className='form-group'>
      <Input
        className='input'
        type='text'
        name='goal'
        placeholder='For example, drink more water'
        register={register}
      >
        <span className='form-group-label'>{editStatus.isEditable ? 'Edit your goal' : 'Enter your goal text'}</span>
      </Input>
      <ErrorMessage errors={errors} field='goal' />
    </label>
    {/*  */}
    <button
      className={`btn btn-primary ${editStatus.isEditable ? 'bg-green-500' : ''} `}
      type='submit'
      disabled={!isValid}
    >
      {editStatus.isEditable ? 'Update' : 'Add'} Goal
    </button>
    {editStatus.isEditable &&
      <button
        className='btn text-white bg-red-500 border-red-400 hover:text-white'
        type='button'
        onClick={() => {
          dispatch(setEditStatus({
            isEditable: false,
            item: null,
          }));
          reset();
        }}
      >Cancel Edit</button>
    }
  </form>;
};

export default GoalForm;
