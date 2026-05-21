module.exports = {
  apps: [
    {
      name: "wft-web",
      cwd: "./apps/web",
      script: "node",
      args: "./scripts/run-next.cjs start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
    {
      name: "wft-cms",
      cwd: "./apps/cms",
      script: "node",
      args: "./scripts/run-strapi.cjs start",
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: 1337,
      },
    },
  ],
};
