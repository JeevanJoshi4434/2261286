import axios from "axios";

const LOG_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";

const VALID_STACKS = ["frontend"];
const VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const VALID_PACKAGES = ["api", "component", "hook", "page", "state", "style", "auth", "config", "middleware", "utils"];

const Log = async (stack, level, pkg, message) => {
    if (!VALID_STACKS.includes(stack) || !VALID_LEVELS.includes(level) || !VALID_PACKAGES.includes(pkg)) return;

    //   try {
    //     await axios.post(LOG_ENDPOINT, {
    //       stack,
    //       level,
    //       package: pkg,
    //       message
    //     });
    //   } catch (err) {
    //     console.warn("Failed to send log:", err.message);
    //   }
    console.log(stack, level, pkg, message);
};

export default Log;
