const Space = require('../models/Space');

// @desc    Get all spaces with filter & search
// @route   GET /api/spaces
// @access  Public
const getSpaces = async (req, res, next) => {
  try {
    const { search, category, capacity, isAvailable, city } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'location.address': { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (capacity) {
      query.capacity = { $gte: Number(capacity) };
    }

    if (isAvailable !== undefined && isAvailable !== '') {
      query.isAvailable = isAvailable === 'true';
    }

    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }

    const spaces = await Space.find(query).populate('managedBy', 'name email').sort({ createdAt: -1 });

    res.json({
      success: true,
      count: spaces.length,
      data: spaces
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single space by ID
// @route   GET /api/spaces/:id
// @access  Public
const getSpaceById = async (req, res, next) => {
  try {
    const space = await Space.findById(req.params.id).populate('managedBy', 'name email avatar phone');

    if (!space) {
      return res.status(404).json({ success: false, message: 'Space not found' });
    }

    res.json({
      success: true,
      data: space
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a space
// @route   POST /api/spaces
// @access  Private (Admin or Space Owner)
const createSpace = async (req, res, next) => {
  try {
    const { name, description, location, category, capacity, facilities, image, isAvailable, hourlyRate, rules } = req.body;

    if (!name || !description || !location || !category || !capacity) {
      return res.status(400).json({ success: false, message: 'Please provide name, description, location, category, and capacity' });
    }

    const space = await Space.create({
      name,
      description,
      location,
      category,
      capacity,
      facilities: Array.isArray(facilities) ? facilities : facilities ? facilities.split(',').map(f => f.trim()) : [],
      image,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      hourlyRate: hourlyRate || 0,
      rules: Array.isArray(rules) ? rules : rules ? rules.split(',').map(r => r.trim()) : [],
      managedBy: req.user._id
    });

    res.status(201).json({
      success: true,
      data: space
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a space
// @route   PUT /api/spaces/:id
// @access  Private (Admin or Space Owner)
const updateSpace = async (req, res, next) => {
  try {
    let space = await Space.findById(req.params.id);

    if (!space) {
      return res.status(404).json({ success: false, message: 'Space not found' });
    }

    // Check authorization: Admin or Manager
    if (req.user.role !== 'admin' && space.managedBy && space.managedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this space' });
    }

    space = await Space.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: space
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a space
// @route   DELETE /api/spaces/:id
// @access  Private (Admin or Space Owner)
const deleteSpace = async (req, res, next) => {
  try {
    const space = await Space.findById(req.params.id);

    if (!space) {
      return res.status(404).json({ success: false, message: 'Space not found' });
    }

    if (req.user.role !== 'admin' && space.managedBy && space.managedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this space' });
    }

    await space.deleteOne();

    res.json({
      success: true,
      message: 'Space removed successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSpaces,
  getSpaceById,
  createSpace,
  updateSpace,
  deleteSpace
};
