import { User } from "server/model";
import type { Request } from "polka";
import type { ServerResponse as Response } from "http";
import * as session from "server/session";

export async function post(req: Request, res: Response) {
    const { username, password } = req.body;
    const users = await User.findAll({
        where: {
            username: username,
            password: password
        }
    });

    if (users.length == 1) {
        res.statusCode = 200;
        res.end(session.add(users[0]));
    } else {
        res.statusCode = 401;
    }
    res.end();
}