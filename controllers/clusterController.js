const Cluster = require("../models/ClusterModel");

module.exports.addCluster = (req, res) => {
  const name = req.body.name;
  const nbr = req.body.nbrBin;
  const newCluster = Cluster({
    name: name,
    totalBinNmbr: nbr
  });
  newCluster.save().then(result => {
    res.json({ result: result });
  });
};

module.exports.getAllClusters = (req, res) => {
  Cluster.find().then(data => {
    res.json({ result: data });
  });
};

module.exports.updateCluster = async(req, res) => {
  // const id = req.params.id;
  // const name = req.body.name;
  // const nbr = req.body.nbr;
  // if (name != undefined && nbr == undefined) {
  //   Cluster.findByIdAndUpdate(id, { name: name }).then(data => {
  //     if (data) {
  //       res.json({ message: "updated" });
  //     }
  //   });
  // } else if (name == undefined && nbr != undefined) {
  //   Cluster.findByIdAndUpdate(id, { totalBinNmbr: nbr }).then(data => {
  //     if (data) {
  //       res.json({ message: "updated" });
  //     }
  //   });
  // } else {
  //   Cluster.findByIdAndUpdate(id, { totalBinNmbr: nbr, name: name }).then(
  //     data => {
  //       if (data) {
  //         res.json({ message: "updated" });
  //       }
  //     }
  //   );
  // }
  try{
    const id = req.params.id;
    const cluster = req.body;
    const { ...updateData } = cluster
    const updateCluster = await Cluster.findByIdAndUpdate(id, updateData, {new: true});
    return res.send(updateCluster)

  }catch(err){
    throw res.send(err)
  }
};

module.exports.removeCluster = (req, res) => {
  const id = req.params.id;
  Cluster.findByIdAndRemove(id).then(data => {
    if (data) {
      res.json({ message: "removed" });
    }
  });
};
