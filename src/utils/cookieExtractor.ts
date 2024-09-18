export const cookieExtractor = (req: any): string | null => {
    let token: string | null = null;
    if (req && req.cookies) {
        token = req.cookies.token;
    }

    return token;
};
