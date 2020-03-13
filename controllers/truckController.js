const Truck = require("../models/TruckModel");

module.exports.addTruck = (req, res) => {
  const newTruck = Truck({
    Carberon: req.body.Carberon,
    Capacity: req.body.Capacity,
    MaxTime: req.body.MaxTime,
    MaxTourTime: req.body.MaxTourTime,
    Driver: req.body.Driver
  });
  newTruck.save().then(data => {
    res.json({ data: data });
  });
};

module.exports.deleteTruck = (req, res) => {
  const id = req.params.id;
  Truck.findByIdAndRemove(id).then(data => {
    if (data) {
      res.json({ message: "removed" });
    }
  });
};

module.exports.getAllTrucks = (req, res) => {
  Truck.find()
    .populate("User")
    .then(data => {
      res.json({ data: data });
    });
};
