import app from './express-config'
import https from 'https'
const keyPath = ''
const certPath = ''

const options = {
    key: keyPath,
    cert: certPath
}
const server = new https.Server(options, app)

export default server