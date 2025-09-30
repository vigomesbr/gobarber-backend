declare namespace Express {
    export interface Request {
        user: {
            id: string;
        }
    };

    export interface Response {
        locals: {
            validated: {
                body?: any;
                query?: any;
                params?: any;
            };
        };
    }
}