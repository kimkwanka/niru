const api = (app) => {
  app.get('/api', (req, res) => {
    res.json({
      data: 'Some data!',
    });
  });
};

export default api;
