const winston = require('winston');
const { combine, timestamp,json } = winston.format;

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json()
    ),
    //defaultMeta: { service: 'app.js' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error'}),
        new winston.transports.File({ filename: 'combined.log' }),
        //new winston.transports.File({ filename: 'debug.log'})
    ]
});

logger.add( new winston.transports.Console({
    format: winston.format.simple()
}));




module.exports = function buildLogger(service){
    return  {
        log:(message)=>{
            logger.log('info', {message, service});
        },
        error:(message)=>{
            logger.log('error', {message, service});
        },
        debugger:(message)=>{
            logger.log('debug', {message, service});
        }
    }
};