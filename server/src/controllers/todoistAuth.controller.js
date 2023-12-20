import axios from 'axios';
import querystring from 'querystring';
import crypto from 'crypto';
import { config } from '../config/todoistAuth.config.js';
import User from '../models/user.model.js';

function generateRandomString(){
    return crypto.randomBytes(20).toString('hex');
};

export const auth = (req, res) => {
    const queryParams = querystring.stringify({
        client_id: config.clientId,
        scope: 'data:read_write, data:delete,project:delete',
        state: generateRandomString(),
    });
    res.redirect(`https://todoist.com/oauth/authorize?${queryParams}`);
};

export const recieveCode = async (req, res) => {
    const { code } = req.query;

    const response = await axios.post('https://todoist.com/oauth/access_token', {
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
    });

    const { access_token } = response.data;

    res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });

    res.redirect(config.redirectUri);
};



