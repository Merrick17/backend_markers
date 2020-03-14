const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const verifToken = require("../config/verifToken");
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * path:
 *  /users/adduser:
 *    post:
 *      summary: Create a new User
 *      description: ""
 *      consumes:
 *      - application/json
 *      produces:
 *       - application/json
 *      tags: [User]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post("/adduser",verifToken,  userController.addUser);
//router.get('/map',verifToken,userController.findAllassiggnedBins);

/**
 * @swagger
 * path:
 *  /users/login:
 *    post:
 *      summary: login user system
 *      description: ""
 *      operationId: loginUser
 *      consumes:
 *      - application/json
 *      produces:
 *       - application/json
 *      tags: [User]
 *      parameters:
 *      - name: authid
 *        in: path
 *        description: username for login
 *        required: true
 *        type: string
 *      - name: password
 *        in: path
 *        description: password for login
 *        required: true
 *        type: string
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                $ref: '#/components/schemas/User'
 *              headers:
 *                X-Rate-Limit:
 *                  type: integer
 *                  format: int32
 *                X-Expires-After:
 *                  type: string
 *                  format: date-time
 *        "400":
 *          description: invalid username/password
 */
router.post("/login", userController.loginUser);

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete a User
 *     description: ""
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     operationId: deleteUser
 *     tags: [User]
 *     parameters:
 *      - in: path
 *        name: id
 *        description: User object that needed to be deleted
 *        required: true
 *     responses:
 *       '200':
 *         description: successful operation
 *       '400':
 *         description: Invalid User ID
 *       '404':
 *         description: Not Found
 */
router.delete("/delete/:id",verifToken, userController.deleteUser);4

/**
 * @swagger
 * /users/{type}:
 *   get:
 *     summary: Get users by type
 *     description: return user by type
 *     produces:
 *      - application/json
 *     operationId: findAllByType
 *     tags: [User]
 *     parameters:
 *     - name: UserType
 *       in: type
 *       description: "type of users to return"
 *       required: true
 *       type: "integer"
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid user Type
 *       '404':
 *         description: Not Found
 */
router.get("/:type",verifToken, userController.findAllByType);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update Existing user
 *     description: ""
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     operationId: updateUser
 *     tags: [User]
 *     parameters:
 *      - name: id
 *        in: "path"
 *        description: "user id"
 *        required: true
 *        type: "integer"
 *      - in: "body"
 *        name: body
 *        description: user object that needed to be modified
 *        required: true
 *        schema:
 *          $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid user ID
 *       '404':
 *         description: Not Found
 *       '405':
 *         description: Invalid data
 */
router.put("/:id",verifToken, userController.updateUser);

module.exports = router;
