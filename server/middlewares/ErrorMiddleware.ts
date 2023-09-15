import ApiError from '../exceprions/ApiError'
import {Request, Response, NextFunction} from 'express'

const ErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    if (error instanceof ApiError) {
        return res.status(error.status).json({message: error.message, errors: error.errors})
    }
    return res.status(500).json({message: 'Unforsee error'})
}

export default ErrorMiddleware