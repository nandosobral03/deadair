export const parseHTTPError = (error: any, defaultMessage: string) => {
    return error.response.data.message || defaultMessage;
}