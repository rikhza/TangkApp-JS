const db = process.env.DB;
const mongoose = require("mongoose");

mongoose.connect(
	// "mongodb://127.0.0.1:27017/tangkApp",
	"mongodb+srv://cigico:fakechar11@cigi.1v9ma.mongodb.net/tangkapp"
);
