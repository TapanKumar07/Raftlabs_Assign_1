const getOnebyAuthor = (model) => async (req, res) => {
    const doc = await model.findOne({ authors: req.query.author }).exec();
    if (!doc) res.status(400).send("Not Found");
    else res.json({ data: doc });
  };

module.exports = (model) => {
   return getOnebyAuthor(model)
}
  