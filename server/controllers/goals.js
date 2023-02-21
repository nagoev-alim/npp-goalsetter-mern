import asyncHandler from 'express-async-handler';
import Goal from '../models/GoalModel.js';

export const goalsController = {
  /**
   * @desc    Get goals
   * @route   GET /api/goals
   * @access  private
   */
  get: asyncHandler(async (req, res) => {
    const { id: user } = req.user;

    const goals = await Goal.find({ user });

    res.status(200).json(goals);
  }),
  /**
   * @desc    Create goals
   * @route   POST /api/goals
   * @access  public
   */
  create: asyncHandler(async (req, res) => {
    const { text } = req.body;
    const { id: user } = req.user;

    if (!text) {
      res.status(400);
      throw new Error('Please add a text field');
    }

    const goal = await Goal.create({ text, user });

    res.status(200).json(goal);
  }),
  /**
   * @desc    Update goal
   * @route   PUT /api/goals/:id
   * @access  public
   */
  update: asyncHandler(async (req, res) => {
    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    const { id } = req.params;
    const { id: user } = req.user;

    const goal = await Goal.findById(id);

    if (!goal) {
      res.status(400);
      throw new Error('Goal not found');
    }

    // Make sure the logged-in user matches the goal user
    if (goal.user.toString() !== user) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(updatedGoal);
  }),
  /**
   * @desc    Delete goal
   * @route   DELETE /api/goals/:id
   * @access  public
   */
  delete: asyncHandler(async (req, res) => {
    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    const { id } = req.params;
    const { id: user } = req.user;

    const goal = await Goal.findById(id);

    if (!goal) {
      res.status(400);
      throw new Error('Goal not found');
    }

    // Make sure the logged-in user matches the goal user
    if (goal.user.toString() !== user) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await goal.remove();

    res.status(200).json({ id: req.params.id });
  }),
};
