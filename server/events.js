const EventEmitter = require("events");

// Create an EventEmitter object
const reloopEvents = new EventEmitter();

// Create an event listener
reloopEvents.on("jobPosted", (jobTitle) => {
    console.log(`New job posted: ${jobTitle}`);
});

reloopEvents.on("businessAdded", (businessName) => {
    console.log(`New business added: ${businessName}`);
});

// Trigger the events
reloopEvents.emit("jobPosted", "Upcycling Assistant");

reloopEvents.emit("businessAdded", "GreenCraft Studio");