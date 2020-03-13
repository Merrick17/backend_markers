const express = require("express");
const router = express.Router();
const ClusterController = require("../controllers/clusterController");
const verifToken = require("../config/verifToken");
/**
 * @swagger
 * tags:
 *   name: Cluster
 *   description: Cluster management
 */

 /**
 * @swagger
 * path:
 *  /cluster/add:
 *    post:
 *      summary: Create a new Cluster
 *      description: ""
 *      consumes:
 *      - application/json
 *      produces:
 *       - application/json
 *      tags: [Cluster]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Cluster'
 *      responses:
 *        "200":
 *          description: A cluster schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Cluster'
 */
router.post("/add",verifToken, ClusterController.addCluster);

/**
 * @swagger
 * /cluster/update/{id}:
 *   put:
 *     summary: Update Existing Cluster
 *     description: ""
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     operationId: updateCluster
 *     tags: [Cluster]
 *     parameters:
 *      - name: id
 *        in: "path"
 *        description: "cluster id that need to be updated"
 *        required: true
 *        type: "string"
 *      - in: body
 *        name: body
 *        description: Cluster object that needed to be modified
 *        required: true
 *        schema:
 *          $ref: '#/components/schemas/Cluster'
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cluster'
 *       '400':
 *         description: Invalid cluster ID
 *       '404':
 *         description: Not Found
 *       '405':
 *         description: Invalid data
 */
router.put("/update/:id",verifToken, ClusterController.updateCluster);

/**
 * @swagger
 * /cluster/delete/{id}:
 *   delete:
 *     summary: Delete a Cluster
 *     description: ""
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     operationId: removeCluster
 *     tags: [Cluster]
 *     parameters:
 *      - in: path
 *        name: id
 *        description: Cluster object that needed to be deleted
 *        required: true
 *     responses:
 *       '200':
 *         description: successful operation
 *       '400':
 *         description: Invalid cluster ID
 *       '404':
 *         description: Not Found
 */
router.delete("/delete/:id",verifToken, ClusterController.removeCluster);

/**
 * @swagger
 * /cluster:
 *   get:
 *     summary: Get clusters by type
 *     description: return cluster by type
 *     produces:
 *      - application/json
 *     operationId: getAllClusters
 *     tags: [Cluster]
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cluster'
 *       '400':
 *         description: Invalid cluster Type
 *       '404':
 *         description: Not Found
 */
router.get("/",verifToken, ClusterController.getAllClusters);

module.exports = router;
