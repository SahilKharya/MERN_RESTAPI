const studentModel = require('../models/Student');

module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);
        studentModel.findById(req.params.id, function (err, studentInfo) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "Student found!!!", data: { students: studentInfo } });
            }
        });
    },

    getAll: function (req, res, next) {
        let studentList = [];
        studentModel.find({}, function (err, students) {
            if (err) {
                next(err);
            } else {
                for (let student of students) {
                    studentList.push({ id: student.id, firstname: student.FirstName, lastname: student.LastName, age: student.Age, college: student.College, batch: student.Batch });
                }
                res.json({ status: "success", message: "Listings found!!!", data: { students: studentList } });

            }
        });
    },

    updateById: function (req, res, next) {
        studentModel.findByIdAndUpdate(req.params.id, { FirstName: req.body.FirstName, LastName: req.body.LastName, Age: req.body.Age, College: req.body.College, Batch: req.body.Batch }, function (err, studentInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Student updated successfully!!!", data: null });
            }
        });
    },

    deleteById: function (req, res, next) {
        studentModel.findByIdAndRemove(req.params.id, function (err, studentInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Listing deleted successfully!!!", data: null });
            }
        });
    },
    
    create: function (req, res, next) {
        console.log(req.body);
        studentModel.create({ FirstName: req.body.FirstName, LastName: req.body.LastName, Age: req.body.Age, College: req.body.College, Batch: req.body.Batch }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Listing added successfully!!!", data: null });
        });
    },
}