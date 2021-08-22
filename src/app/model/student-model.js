// Student List model which expose the schema of student with it's respective fields

const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    studentId: Number,
    studentName: String,
    studentEmail: String,
    institutionName: String,
    institutionType: String,
    courseName: String
}, {
    timeStamps: true
});

module.exports = mongoose.model('StudentList', StudentSchema);