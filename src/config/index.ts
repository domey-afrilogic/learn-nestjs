export default () => ({
  application: {
    node_env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
  },
});
