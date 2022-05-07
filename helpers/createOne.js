const createOne = (model,type) => async (req, res) => {
   try {   

      const doc = await model.create(req.body);
      return res.send("<h1>Successfully Added Entry!</h1>")
    } catch(err) {
      console.log(err)
      res.status(400).send("Invalid operation " + err.message);
    }
  };

  module.exports = (model,type) => {
      return createOne(model,type)
  }