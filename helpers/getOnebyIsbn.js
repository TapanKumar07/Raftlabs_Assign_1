const getOnebyIsbn = (model) => async (req, res) => {
  try  {
  const doc = await model.findOne({ isbn: req.query.isbn }).exec();
  if (!doc) res.status(400).send("Not Found");
  else res.json({ data: doc });
  }
  catch(er)
  {
    console.log(er)
  }
};

module.exports = (model) => {
  return getOnebyIsbn(model);
};
