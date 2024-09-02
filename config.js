// config.js
module.exports = {
    application: {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type']
        }
    }
};
