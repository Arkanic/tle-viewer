import "./scss/main.scss";

import * as assets from "./ts/assets";
import * as loader from "./ts/loader";


loader.doLoadTasks([
    {
        task: assets.downloadAssets,
        message: "Downloading Assets..."
    }
]).then(() => {
    console.log("loaded");
});