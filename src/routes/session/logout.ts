import type { Request } from "polka";
import type { ServerResponse as Response } from "http";
import * as session from "server/session"

export async function get(req: Request, res: Response) {
    console.log("aaa")
    session.remove(req.headers.authorization);
    res.end();
}