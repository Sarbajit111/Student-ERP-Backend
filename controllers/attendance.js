const Attendance = require('../model/attendance')
const { v4: uuidv4 } = require('uuid');

const takeAttendanceRecords = async (req, res) => {
    try {
        const {studentId,  present } = req.body;

        uppercasePresent = present.toUpperCase();
        if (uppercasePresent !== 'A' && uppercasePresent !== 'P') {
            return res.status(400).json({ error: `Present field must contain either "A/a" or "B/b"` });
        }
        if (studentId === '') {
            return res.status(400).json({ error: 'Student ID is required' });
        }

        const attendance = new Attendance({
            studentId: uuidv4(),
            present: uppercasePresent
        });
        

        let data = await attendance.save();
        res.status(201).send({ message: 'Added successfully' });

    } catch (error) {
        res.status(500).send({ error: 'Failed to create attendance record' });
    }
}

const getAttendanceRecords = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find();
        if (attendanceRecords.length > 0) {
            res.json(attendanceRecords)
        } else {
            res.status(404).json({ message: 'No attendance records found' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch attendance records' });
    }
}

const updateAttendanceRecords = async (req, res) => {

    const _id = req.params.id;

    try {
        const attendanceRecords = await Attendance.findByIdAndUpdate(_id, req.body, { new: true });
        if (!attendanceRecords) {
            // console.log('Student not found:', _id);
            return res.status(404).json({ message: 'No attendance records found' });
        }

        console.log('Record updated successfully:', attendanceRecords);
        res.json(attendanceRecords);
    }
    catch (err) {
        console.log('Error updating Records:', err);
        res.status(500).json({ error: 'Failed to update Records' });
    }
}
module.exports = { takeAttendanceRecords, getAttendanceRecords, updateAttendanceRecords };