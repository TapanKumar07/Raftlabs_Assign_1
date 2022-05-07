const getMany = (model) => async (req, res) => {

    const doc = await model.find({}).exec();

    res.json(doc);
    
};

module.exports = (model) => {
    return getMany(model);
}