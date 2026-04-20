function ownership(model) {
  return async (req, res, next) => {
    try {
      const record = await model.findByPk(req.params.id);

      if (!record) {
        return res.status(404).json({ error: 'Not found' });
      }

      //  if has userId field
      if (req.user.role !== 'admin' && record.userId !== req.user.id) {
        return res.status(403).json({ error: 'Access denied (not owner)' });
      }

      req.record = record;
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

module.exports = ownership;