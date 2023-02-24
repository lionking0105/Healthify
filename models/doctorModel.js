const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell your name!'],
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  speciality: {
    type: String,
  },
  certification: {
    type: String,
  },
  office_location: {
    type: String,
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      select: false,
    },
  ],
  availableTimes: {
    type: [
      {
        day: {
          type: Date,
        },
        startTime: {
          type: String,
        },
        endTime: {
          type: String,
        },
        hourRange: {
          type: [String],
        },
      },
    ],
    default: [],
    select: false,
  },
});

doctorSchema.methods.getHourRange = function (start, end) {
  const hourRange = [];
  let hour = parseInt(start.split(':')[0]);
  const endHour = parseInt(end.split(':')[0]);

  while (hour <= endHour) {
    hourRange.push(`${hour.toString().padStart(2, '0')}:00`);
    hour++;
  }

  return hourRange;
};

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
