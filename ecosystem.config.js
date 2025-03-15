module.exports = {
  apps: [
    {
      name: "admin-interface",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "D:/FlyerTrack/admin-interface",
      interpreter: "node",
      exec_mode: "fork",
    },
  ],
};
