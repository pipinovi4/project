require('dotenv').config()
import server from './configs/express-config'
import ApiError from './exceprions/ApiError'

const start = () => {
    try {
        server.listen(process.env.PORT, () => console.log(`Server started on port: ${process.env.PORT}`))
    } catch (e) {
        throw new ApiError(500, 'Unforseen error')
    }
}

start()