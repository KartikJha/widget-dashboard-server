import mongoose from 'mongoose';

const widgetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['note', 'graph', 'task'], required: true },
  updatedBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Widget = mongoose.model('Widget', widgetSchema);

export default Widget;
