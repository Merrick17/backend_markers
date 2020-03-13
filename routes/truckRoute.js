const express = require("express");
const router = express.Router();
const truckController = require("../controllers/truckController");
const verifToken = require("../config/verifToken");

/**
 * @swagger
 * tags:
 *   name: Truck
 *   description: Truck management
 */

/**
 * @swagger
 * path:
 *  /truck/add:
 *    post:
 *      summary: Create a new Truck
 *      description: ""
 *      consumes:
 *      - application/json
 *      produces:
 *       - application/json
 *      tags: [Truck]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Truck'
 *      responses:
 *        "200":
 *          description: A Truck schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Truck'
 */
router.post("/add", truckController.addTruck);

/**
 * @swagger
 * /truck/delete/{id}:
 *   delete:
 *     summary: Delete a Truck
 *     description: ""
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     operationId: deleteTruck
 *     tags: [Truck]
 *     parameters:
 *      - in: path
 *        name: id
 *        description: Truck object that needed to be deleted
 *        required: true
 *     responses:
 *       '200':
 *         description: successful operation
 *       '400':
 *         description: Invalid Truck ID
 *       '404':
 *         description: Not Found
 */
router.delete("/delete/:id", truckController.deleteTruck);

/**
 * @swagger
 * /truck/all:
 *   get:
 *     summary: Get all Trucks
 *     description: return all Trucks
 *     produces:
 *      - application/json
 *     tags: [Truck]
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               $ref: '#/components/schemas/Truck'
 */
router.get("/all", truckController.getAllTrucks);

module.exports = router;
