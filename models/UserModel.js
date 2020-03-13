const mongoose = require("mongoose");
/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - first_name
 *          - auth_id
 *          - password
 *          - role
 *        properties:
 *          name:
 *            type: string
 *          first_name:
 *            type: string
 *          auth_id:
 *            type: string
 *          password:
 *            type: string
 *          role:
 *            type: number
 *          cluster:
 *            type: string
 */
const UserSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  first_name: String,
  auth_id: String,
  password: String,
  role: Number,
  assignedCluster:{type:mongoose.Schema.Types.ObjectId,ref:'Cluster'}
});

module.exports = mongoose.model("User", UserSchema);
