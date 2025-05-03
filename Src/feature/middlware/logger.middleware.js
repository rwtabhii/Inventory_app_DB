import winston from "winston"

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "request-logging" },
    transports: [
        new winston.transports.File({ filename: "log.txt" })
    ]


});

const loggerMiddleware = (req, res, next) => {
    if (!req.url.includes("signin")) {
        const logData = `${req.url} - ${JSON.stringify(req.body)}`;
        logger.info(logData)
    }
    next();
}

export default loggerMiddleware;