import { NextFunction, Request, Response } from 'express';

export const isUserCart = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { cid } = req.params;
    const userCart = (req.user as { cart?: string })?.cart;

    if (!userCart || userCart !== cid) {
        res.status(401).json({
            status: 'error',
            msg: 'Wrong cart user',
        });
        return;
    }
    next();
};
