module.exports = {
  apps: [
    {
      name: "admin-interface",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "/root/admin-Flyer-Track", // chemin correct sur ton VPS
      interpreter: "node",
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
