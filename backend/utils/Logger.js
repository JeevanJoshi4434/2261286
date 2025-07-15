const axios = require("axios");
const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";
/**
 * Sends a log to the test server
 * @param {"backend"|"frontend"} stack
 * @param {"debug"|"info"|"warn"|"error"|"fatal"} level
 * @param {string} pkg
 * @param {string} message
 */
async function Log(stack, level, pkg, message) {
//   try {
//     const res = await axios.post(LOG_API_URL, {
//       stack,
//       level,
//       package: pkg,
//       message
//     });

//     return res.data;
//   } catch (err) {
//     // Log internally if external logging fails
//     console.error("Failed to send log:", err.message);
//   }
    console.log(stack, level, pkg, message);
}

module.exports = Log;
