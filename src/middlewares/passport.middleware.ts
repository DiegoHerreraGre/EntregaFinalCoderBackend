import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const passportCall = (strategy: string) => {
    return async (
        req: Request = {} as Request,
        res: Response = {} as Response,
        next: NextFunction
    ): Promise<void> => {
        passport.authenticate(
            strategy,
            (err: Error | null, user: any, info: any) => {
                if (err) return next(err);
                if (!user)
                    return res.status(401).json({
                        status: 'error',
                        msg: info.message ? info.message : info.toString(),
                    });

                req.user = user;
                next();
            }
        )(req, res, next);
    };
};
