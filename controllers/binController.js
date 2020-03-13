const Bin = require("../models/BinModel");

module.exports.addBin = (req, res) => {

  /*type: Number,
    serviceTime: String,
    NumberInposition: String,
    Cluster:*/
  const newBin = Bin({
    type: req.body.type,
    serviceTime: req.body.serviceTime,
    numberInposition: req.body.nbrInposition,
    Cluster: req.body.clusterid,
    lat:req.body.lat,
    lng:req.body.lng
  });
  newBin.save().then(result => {
    res.json({ result: result });
  });
};

module.exports.getAllBins = (req, res) => {
  Bin.find().populate('Cluster').then(data => {
    res.json({ result: data });
  });
};
module.exports.getBinsByCluster = (req, res) => {
  const id = req.params.clusterid;
  Bin.find({ Cluster: id }).populate('Cluster').then(data => {
    res.json({ result: data });
  });
};
module.exports.updateBin = async(req, res) => {
  // const id = req.params.id;
  // const column = req.body.column;
  // const value = req.body.value;
  // if (column == "type") {
  //   Bin.findByIdAndUpdate(id, { type: value }).then(data => {
  //     if (data) {
  //       res.json({ result: data });
  //     }
  //   });
  // } else if (column == "serviceTime") {
  //   Bin.findByIdAndUpdate(id, { serviceTime: value }).then(data => {
  //     if (data) {
  //       res.json({ result: data });
  //     }
  //   });
  // } else if (column == "numberInposition") {
  //   Bin.findByIdAndUpdate(id, { numberInposition: value }).then(data => {
  //     if (data) {
  //       res.json({ result: data });
  //     }
  //   });
  // } else if (column == "cluster") {
  //   Bin.findByIdAndUpdate(id, { Cluster: value }).then(data => {
  //     if (data) {
  //       res.json({ result: data });
  //     }
  //   });
  // }
  try{
    const id = req.params.id;
    const bin = req.body;
    const { ...updateData } = bin
    const updateBin = await Bin.findByIdAndUpdate(id, updateData, {new: true});
    return res.send(updateBin)

  }catch(err){
    throw res.send(err)
  }
};

module.exports.removeBin = (req, res) => {
  const id = req.params.id;
  Bin.findByIdAndRemove(id).then(data => {
    if (data) {
      res.json({ message: "removed" });
    }
  });
};
