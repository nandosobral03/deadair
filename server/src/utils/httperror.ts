export type HttpError = {
    status: number;
    message: string;
}

export const isHttpError = (err: any): err is HttpError => {
    return typeof err === 'object' && 'status' in err && 'message' in err;
}


export const httpErrorOrDefault = (err: any): HttpError => {
    if (typeof err === 'object' && 'status' in err && 'message' in err) {
        return err;
    }
    else {
        return {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}

