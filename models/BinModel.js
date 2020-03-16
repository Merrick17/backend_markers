const mongoose = require("mongoose");
/**
 * @swagger
 *  components:
 *    schemas:
 *      Bin:
 *        type: object
 *        required:
 *          - NumberInposition
 *          - Cluster
 *          - lat
 *          - lng
 *          - type
 *          - serviceTime
 *        properties:
 *          type:
 *            type: integer
 *          serviceTime:
 *            type: string
 *            description: How much the bin works
 *          NumberInposition:
 *            type: string
 *          clusterid:
 *            type: string
 *          lat:
 *            type: number
 *          lng:
 *            type: number
 */
const BinSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  type: Number,
  serviceTime: String,
  NumberInposition: String,
  Cluster: {type:mongoose.Schema.Types.ObjectId,ref:'Cluster'},
  lat:Number,
  lng:Number

});

module.exports = mongoose.model("Bin", BinSchema);
