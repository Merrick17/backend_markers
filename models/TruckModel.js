const mongoose = require("mongoose");
/**
 * @swagger
 *  components:
 *    schemas:
 *      Truck:
 *        type: object
 *        required:
 *          - Carberon
 *          - Capacity
 *        properties:
 *          Carberon:
 *            type: integer
 *          Capacity:
 *            type: integer
 *          MaxTime:
 *            type: string
 *          MaxTourTime:
 *            type: string
 *          Driver:
 *            type: string
 */
const TruckSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  Carberon: Number,
  Capacity: Number,
  MaxTime: String,
  MaxTourTime:String,
  Driver: {type:mongoose.Schema.Types.ObjectId,ref:'User'}
});

module.exports = mongoose.model("Truck", TruckSchema);
