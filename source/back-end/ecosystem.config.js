module.exports = {
  apps : [
    {
      name: 'server',
      script: 'server.exe',
      instances: 1,
      cwd: './API',
    },
  ],
};