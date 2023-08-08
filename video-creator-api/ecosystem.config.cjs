module.exports = {
    apps: [
        {
            name: 'backend',
            script: 'server.js',
            watch: true,
            env: {
                NODE_ENV: 'production',
                PORT: 5001,
                HOST: 'localhost',
                ALLOWED_ORIGINS: 'http://localhost:3000',
                MONGO_URI: 'mongodb://localhost:27017/db',
                JWT_SECRET_KEY: 'secret',
                JW_EXPIRE_TIME: '1d',
            },
        },
    ],
};
