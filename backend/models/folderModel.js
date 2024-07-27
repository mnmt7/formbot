const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.ObjectId,
      // required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      // required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

folderSchema.virtual('folders', {
  ref: 'Folder',
  foreignField: 'parent',
  localField: '_id',
});

folderSchema.virtual('formbots', {
  ref: 'Formbot',
  foreignField: 'folder',
  localField: '_id',
});

folderSchema.post(
  'findOneAndDelete',
  { document: true, query: true },
  async (folder) => {
    await folder.model().deleteMany({ parent: folder._id });

    await folder.model('Formbot').deleteMany({ folder: folder._id });
  },
);

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
