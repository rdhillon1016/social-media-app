const mongoose = require('mongoose');

const { Schema } = mongoose;
const { DateTime } = require('luxon');

const UserSchema = new Schema({
  first_name: { type: String, required: true, minlength: 2 },
  last_name: { type: String, required: true, minlength: 2 },
  username: { type: String, required: true, minlength: 2 },
  password: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, minlength: 5 },
  dob: { type: String },
  profilePicUrl: { type: String },
  date_created: { type: Date, required: true, default: Date.now() },
  friends: [{ type: Schema.Types.ObjectId, ref: 'Friends' }],
  bio: { type: String, maxlength: 200 },
});

UserSchema.virtual('full_name')
  .get(() => `${this.first_name} ${this.last_name}`);

UserSchema.virtual('formatted_date_created')
  .get(() => { DateTime.fromJSDate(this.date_created).toLocaleString(DateTime.DATE_MED); });

module.exports = mongoose.model('User', UserSchema);