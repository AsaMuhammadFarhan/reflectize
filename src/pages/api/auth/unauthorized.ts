import type { NextApiRequest, NextApiResponse } from 'next';
import type { ResponseBody } from '~/middleware';

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>) {
    console.log("header::", req.headers);
    res.status(401).json({ code: 401, message: 'Not authenticated.' });
};
