const express = require("express");
const router = express.Router();
const verifToken = require("../config/verifToken");
const binController = require("../controllers/binController");
/**
 * @swagger
 * tags:
 *   name: Bin
 *   description: Bin management
 */

/**
 * @swagger
 * path:
 *  /bin/add:
 *    post:
 *      summary: Create a new Bin
 *      description: ""
 *      consumes:
 *      - application/json
 *      produces:
 *       - application/json
 *      tags: [Bin]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Bin'
 *      responses:
 *        "200":
 *          description: A bin schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Bin'
 */
router.post("/add", binController.addBin);
/**
 * @swagger
 * /bin:
 *   get:
 *     summary: Get all bins
 *     description: return all bins
 *     produces:
 *      - application/json
 *     tags: [Bin]
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               $ref: '#/components/schemas/Bin'
 */
router.get("/",verifToken, binController.getAllBins);

/**
 * @swagger
 * /bin/{clusterid}:
 *   get:
 *     summary: Get bin by cluster ID
 *     description: return bin by id
 *     produces:
 *      - application/json
 *     operationId: getBinsByCluster
 *     tags: [Bin]
 *     parameters:
 *     - name: clusterid
 *       in: "path"
 *       description: "bin with id cluster"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bin'
 *       '400':
 *         description: Invalid cluster ID
 *       '404':
 *         description: Not Found
 */
router.get("/:clusterid",verifToken, binController.getBinsByCluster);
/**
 * @swagger
 * /bin/{id}:
 *   put:
 *     summary: Update Existing Bin
 *     description: ""
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     operationId: updateBin
 *     tags: [Bin]
 *     parameters:
 *      - name: id
 *        in: "path"
 *        description: "Bin id that need to be updated"
 *        required: true
 *        type: "string"
 *      - in: "body"
 *        name: body
 *        description: bin object that needed to be modified
 *        required: true
 *        schema:
 *          $ref: '#/components/schemas/Bin'
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               $ref: '#/components/schemas/Bin'
 *       '400':
 *         description: Invalid cluster ID
 *       '404':
 *         description: Not Found
 *       '405':
 *         description: Invalid data
 */
router.put("/:id",verifToken, binController.updateBin);
/**
 * @swagger
 * /bin/{id}:
 *   delete:
 *     summary: Delete a bin
 *     description: ""
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     operationId: removeBin
 *     tags: [Bin]
 *     parameters:
 *      - in: path
 *        name: id
 *        description: bin object that needed to be deleted
 *        required: true
 *     responses:
 *       '200':
 *         description: successful operation
 *       '400':
 *         description: Invalid cluster ID
 *       '404':
 *         description: Not Found
 */
router.delete("/:id",verifToken, binController.removeBin);

module.exports = router;
