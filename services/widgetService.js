import Widget from '../models/Widget.js';

// Create a new widget
export const createWidget = async (req, res) => {
  try {
    const { title, description, type, updatedBy } = req.body;
    const widget = new Widget({ title, description, type, updatedBy });
    await widget.save();
    res.status(201).json(widget);
  } catch (err) {
    res.status(400).json({ message: 'Error creating widget', error: err.message });
  }
};

// Get all widgets
export const getWidgets = async (req, res) => {
  try {
    const widgets = await Widget.find();
    res.status(200).json(widgets);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching widgets', error: err.message });
  }
};

// Update a widget by ID
export const updateWidget = async (req, res) => {
  try {
    const widget = await Widget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!widget) {
      return res.status(404).json({ message: 'Widget not found' });
    }
    res.status(200).json(widget);
  } catch (err) {
    res.status(400).json({ message: 'Error updating widget', error: err.message });
  }
};

// Delete a widget by ID
export const deleteWidget = async (req, res) => {
  try {
    const widget = await Widget.findByIdAndDelete(req.params.id);
    if (!widget) {
      return res.status(404).json({ message: 'Widget not found' });
    }
    res.status(200).json({ message: 'Widget deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting widget', error: err.message });
  }
};
