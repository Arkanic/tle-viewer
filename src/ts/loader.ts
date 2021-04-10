import * as assets from "./assets";

let loadingBox:HTMLElement = document.getElementById("loading")!;
let loadingMessage:HTMLElement = document.getElementById("loading-message-content")!;

interface LoadTask {
    task:Function;
    message:string;
}

export async function doLoadTasks(loadTasks:Array<LoadTask>):Promise<void> {
    for(const thingToLoad of loadTasks) {
        loadingMessage.innerHTML = `${thingToLoad.message} (${loadTasks.indexOf(thingToLoad)+1}/${loadTasks.length})`;

        await thingToLoad.task();
    }

    loadingBox.classList.add("hidden");
    return Promise.resolve();
}