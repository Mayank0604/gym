const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  attendance: [
    {
      month: {
        type: Number,
        required: true
      },
      days: [
        {
          day: {
            type: Number,
            required: true
          },
          status: {
            type: String,
            enum: ['present', 'absent'], // Customize based on your specific statuses
            required: true
          }
        }
      ]
    }
  ]
});

const AttendanceModel = mongoose.model('Attendance', attendanceSchema);

module.exports = AttendanceModel;
