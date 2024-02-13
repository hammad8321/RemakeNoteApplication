import app from "./app";
import mongoose from "mongoose";
import env from "./util/validateEnv";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongooooose in connnected");
    app.listen(port, () => {
      console.log("Server turunnnnning: " + port);
    });
  })
  .catch(console.error);

// done 1:16 min
