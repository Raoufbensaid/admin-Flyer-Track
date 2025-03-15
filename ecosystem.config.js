module.exports = {
  apps: [
    {
      name: "FlyerTrack",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "D:/FlyerTrack/admin-interface",
      interpreter: "node",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
