import dotenv from 'dotenv';

dotenv.config();

export const config = {
    clientId: process.env.TODOIST_CLIENT_ID,
    clientSecret: process.env.TODOIST_CLIENT_SECRET,
    redirectUri: process.env.TODOIST_REDIRECT_URI,
};