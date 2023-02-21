import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { goalSchema } from '../../utils/validateSchema.js';
import { createGoal } from './goalsSlice.js';
import toast from 'react-hot-toast';
import { ErrorMessage, Input } from '../../components/index.js';

// 📦 Component - GoalForm
const GoalForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(goalSchema),
    defaultValues: { goal: '' },
  });

  // 📦 Rendering
  return <form
    className='grid gap-2 max-w-lg w-full m-auto sm:gap-3'
    onSubmit={handleSubmit(({ goal }) => {
      dispatch(createGoal({ text: goal }));
      reset();
      toast.success('Goal was successfully created');
    })}
  >
    {/*  */}
    <label className='form-group'>
      <Input
        className='input'
        type='text'
        name='goal'
        placeholder='For example, drink more water'
        register={register}
      >
        <span className='form-group-label'>Enter your goal text</span>
      </Input>
      <ErrorMessage errors={errors} field='goal' />
    </label>
    {/*  */}
    <button className='btn btn-primary' type='submit' disabled={!isValid}>Add Goal</button>
  </form>;
};

export default GoalForm;
