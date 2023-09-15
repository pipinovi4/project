export default class ApiError extends Error {
    status: number
    errors: Array<Error>

    constructor(status: number, message: string, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User unauthorized')
    }

    static BadRequest(message: string, errors = []) {
        return new ApiError(400, message, errors);
    }
}