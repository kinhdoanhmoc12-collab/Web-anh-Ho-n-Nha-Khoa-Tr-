module.exports = {
  apps: [
    {
      name: "zunphoto",
      script: "npm",
      args: "start",
      cwd: "/var/www/zunphoto",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "600M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "/root/.pm2/logs/zunphoto-error.log",
      out_file: "/root/.pm2/logs/zunphoto-out.log",
      time: true,
    },
  ],
};
