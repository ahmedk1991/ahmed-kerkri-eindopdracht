const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    env: {
        NEXT_PUBLIC_DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL,
    },
};
