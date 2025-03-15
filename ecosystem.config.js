module.exports = {
  apps: [
    {
      name: "FlyerTrack",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "/root/admin-Flyer-Track", // chemin Linux
      interpreter: "node",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
