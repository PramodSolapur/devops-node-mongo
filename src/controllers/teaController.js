import mongoose from 'mongoose';
import Tea from '../models/Tea.js';

const createTea = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    if (!name) {
      throw new Error('tea name is required');
    }
    await Tea.create({ name, price });
    res.status(201).json({ status: 'success', message: 'Tea added!' });
  } catch (error) {
    next(error);
  }
};

const getAllTeas = async (req, res, next) => {
  try {
    const teas = await Tea.find().select('-__v -createdAt -updatedAt');
    res.status(200).json({ items: teas.length, data: teas });
  } catch (error) {
    next(error);
  }
};

const getTea = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      throw new Error('Invalid tea id');
    }
    const tea = await Tea.findById(id).select('-__v -createdAt -updatedAt');
    if (!tea) {
      return res.status(404).json({
        message: 'Tea not found',
      });
    }
    res.status(200).json({ data: tea });
  } catch (error) {
    next(error);
  }
};

const updateTea = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      throw new Error('Invalid tea id');
    }
    await Tea.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: false,
    });

    res.status(200).json({ status: 'success', message: 'tea updated!' });
  } catch (error) {
    next(error);
  }
};

const deleteTea = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      throw new Error('Invalid tea id');
    }
    await Tea.findByIdAndDelete(id);
    res.status(200).json({ status: 'success', message: 'tea deleted!' });
  } catch (error) {
    next(error);
  }
};

export { createTea, getAllTeas, getTea, updateTea, deleteTea };
