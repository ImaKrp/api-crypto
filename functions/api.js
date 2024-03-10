import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import "dotenv/config";
// import http from "http"; //! coment on deploy
import router from './routes.js';

const app = express();
app.use(express.json());
app.use(cors());

// const serverHttp = http.createServer(app); //! coment on deploy

// serverHttp.listen(8000, () =>
//   //! coment on deploy
//   console.log(`🚀  Server is running on PORT 8000`)
// );
// app.use(router); //! coment on deploy


app.use("/.netlify/functions/api", router);
export const handler = serverless(app);
export default handler;
