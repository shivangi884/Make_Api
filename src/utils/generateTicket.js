const crypto = require("crypto");

const generateTicket = () => {
  return `EVT-${crypto.randomBytes(6).toString("hex").toUpperCase()}`;
};

module.exports = generateTicket;
