import cors, { CorsOptions } from "cors";
import listDomains from "./whiteList";
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || listDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
export default corsOptions;
