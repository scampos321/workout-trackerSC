const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then(workoutDB => {
        res.json(workoutDB);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post("/api/workouts/bulk", ({ body }, res) => {
    Workout.insertMany(body)
    .then(workoutDB => {
        res.json(workoutDB);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
    { $addFields: {
        totalDuration: {
            $sum: '$exercises.duration'
        }
        }}
    ])
    .then(workoutDB => {
    res.json(workoutDB)
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        { $addFields: {
            totalDuration: {
                $sum: '$exercises.duration'
            }
        }}
    ]).sort( {
        _id: -1
    }).limit(10)
    .then(workoutDB => {
        res.json(workoutDB);
    })
    .catch(err => {
        res.status(400).json(err)
    });
});

router.put("/api/workouts/:id", (req, res) => {
    Workout.updateOne(
        { _id: req.params.id },
        { $push: {exercises: req.body} },
        (err, edit) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(edit);
                res.send(edit);
            }
        } 
    )
})

module.exports = router;