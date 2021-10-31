async function init() {
    if (location.search.split("=")[1] === undefined){
        const getWorkout = await API.getLastWorkout();
        if(getWorkout) {
            location.search = "?id=" + getWorkout._id;
        } else {
            document.querySelector("#continue-btn").classList.add("d-none")
        }
    }
}