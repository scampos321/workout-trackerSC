const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post("/api/workouts/bulk", ({ body }, res) => {
    Workout.insertMany(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
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
    .then(dbWorkout => {
    res.json(dbWorkout)
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
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err)
    });
});

router.put("/api/workouts/:id", (req, res) => {
    Workout.updateOne(
        { _id: req.params.id },
        { $push: {exercises: req.body} },
        (error, edited) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(edited);
                res.send(edited);
            }
        } 
    )
})

module.exports = router;