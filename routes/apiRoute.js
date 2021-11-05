const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workout", ({ body }, res) => {
    Workout.create(body)
    .then(workoutDB => {
        res.json(workoutDB);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post("/api/workout", ({ body }, res) => {
    Workout.insertMany(body)
    .then(workoutDB => {
        res.json(workoutDB);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});



module.exports = router;