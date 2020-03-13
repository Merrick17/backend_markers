const mongoose = require("mongoose");
/**
 * @swagger
 *  components:
 *    schemas:
 *      Cluster:
 *        type: object
 *        required:
 *          - name
 *          - totalBinNmbr
 *        properties:
 *          name:
 *            type: string
 *          totalBinNmbr:
 *            type: integer
 *            description: How many bins in cluster
 */
const ClusterSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  totalBinNmbr: Number
});

module.exports = mongoose.model("Cluster", ClusterSchema);
