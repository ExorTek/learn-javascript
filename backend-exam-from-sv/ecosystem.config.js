module.exports = {
    apps: [
        {
            name: 'server',
            script: 'server.js',
            autorestart: true,
            instances: 'max',
            exec_mode: 'cluster',
            watch: true,
            max_memory_restart: '8G',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
