import axios from "axios";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "proseqviewer/dist/assets/proseqviewer.css";
import "video-react/dist/video-react.css";

const env = import.meta.env;
// axios.defaults.baseURL = env.PROD ? env.VITE_BACKEND_BASEURL : "http://localhost:8001";
axios.defaults.baseURL = env.VITE_BACKEND_BASEURL;

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
