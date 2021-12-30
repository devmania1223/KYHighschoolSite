import type { Request } from "polka";
import type { ServerResponse as Response } from "http";
import * as session from "server/session"

export async function get(req: Request, res: Response) {
    if (session.check(req, res)) {
         res.end();
    }
}