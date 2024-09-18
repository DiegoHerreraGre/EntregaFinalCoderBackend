import { Request, Response, NextFunction } from 'express';

export const authorization = (role: string) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        if (!req.user) {
            res.status(401).json({ status: 'error', msg: 'Unauthorized' });
            return;
        }
        if ((req.user.role as { role?: string }) !== role) {
            res.status(403).json({ status: 'error', msg: 'No permission' });
            return;
        }
        next();
    };
};
