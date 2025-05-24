const express = require("express");
const router = express.Router();

const getController = require("./getControllers/getControllers");
const postController = require("./postControllers/postControllers");
const putController = require("./putControllers/putControllers");
const deleteController = require("./deleteControllers/deleteControllers");

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - amount
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the transaction
 *         amount:
 *           type: number
 *           description: Credit, repayment, or other amount
 *         type:
 *           type: string
 *           description: Type of transaction, e.g., Credit, Debit, Repayment, Misc.
 *         notes:
 *           type: string
 *           description: Short description of the transaction
 *         created_at:
 *           type: date
 *           description: Date when transaction was created
 *       example:
 *         type: "Credit"
 *         amount: 100.00
 *         notes: "Sales Credit"
 *         created_at: "2024-08-23T06:56:37.120Z"
 *
 */

/**
 * @swagger
 * /api/v1/transactions:
 *   get:
 *     summary: Retrieve a list of transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: A list of transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 */
router.get("/", getController.getAllTransactions);

/**
 * @swagger
 * /api/v1/transactions/{name}:
 *   get:
 *     summary: Retrieve transactions based on clients
 *     tags: [Transactions]
 *     parameters:
 *          - in: path
 *            name: name
 *
 *     responses:
 *       200:
 *         description: Client's transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:
 *                      type: "Credit"
 *                      amount: 100.00
 *                      notes: "Sales Credit"
 *                      created_at: "2024-08-23T06:56:37.120Z"
 *
 *       400:
 *          description: Transaction for the client not found!
 */
router.get("/:name", getController.getTransactionsByName);

/**
 * @swagger
 * /api/v1/transactions/total-credit/{name}:
 *   get:
 *     summary: Retrieve the current state of transaction (What we owe or what they owe)
 *     tags: [Transactions]
 *     parameters:
 *          - in: path
 *            name: name
 *
 *     responses:
 *       200:
 *         description: Transaction state.
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               example: 42
 *       400:
 *          description: Transaction for the client not found!
 */
router.get("/total-credit/:name", getController.totalRemainingCredit);

/**
 * @swagger
 * /api/v1/transactions/{id}/limit/{limit}:
 *   get:
 *     summary: Retrieve the last N transactions.
 *     tags: [Transactions]
 *     parameters:
 *          - in: path
 *            name: id
 *          - in: path
 *            name: limit
 *
 *     responses:
 *       200:
 *         description: Last N transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:
 *                      type: "Credit"
 *                      amount: 100.00
 *                      notes: "Sales Credit"
 *                      created_at: "2024-08-23T06:56:37.120Z"
 *       400:
 *          description: Transaction for the client not found!
 */
router.get("/:id/limit/:limit", getController.showLastNTransaction);

/**
 * @swagger
 * /api/v1/transactions/{name}:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     parameters:
 *          - in: path
 *            name: name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of transaction (e.g., Credit, Debit, Repayment, Misc.)
 *               amount:
 *                 type: number
 *                 description: The amount for the transaction
 *               notes:
 *                 type: string
 *                 description: Short description of the transaction
 *             required:
 *               - type
 *               - amount
 *           example:
 *             type: "Credit"
 *             amount: 65000
 *             notes: "Oil"
 *     responses:
 *       201:
 *         description: Transaction created successfully.
 *
 *
 */

router.post("/:name", postController.addTransactionByName);

/**
 * @swagger
 * /api/v1/transactions/amount/{id}:
 *   put:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     parameters:
 *          - in: path
 *            name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount for the transaction
 *             required:
 *               - amount
 *           example:
 *             amount: 65000
 *     responses:
 *       200:
 *         description: Transaction updated successfully.
 *
 *
 */
router.put("/amount/:id", putController.editAmountById);

/**
 * @swagger
 * /api/v1/transactions/type/{id}:
 *   put:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     parameters:
 *          - in: path
 *            name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of the transaction.
 *             required:
 *               - type
 *           example:
 *             type: Credit
 *     responses:
 *       200:
 *         description: Transaction updated successfully.
 *
 *
 */
router.put("/type/:id", putController.editTypeById);

/**
 * @swagger
 * /api/v1/transactions/notes/{id}:
 *   put:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     parameters:
 *          - in: path
 *            name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *                 description: The notes for the transaction.
 *             required:
 *               - notes
 *           example:
 *             notes: "Repayment by cash"
 *     responses:
 *       200:
 *         description: Transaction updated successfully.
 *
 *
 */
router.put("/notes/:id", putController.editNotesById);

/**
 * @swagger
 * /api/v1/transactions/created-at/{id}:
 *   put:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     parameters:
 *          - in: path
 *            name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               created_at:
 *                 type: date
 *                 description: The date and time of the transaction
 *             required:
 *               - created_at
 *           example:
 *             created_at: "2024-08-29 22:05:45.293877+05:30"
 *     responses:
 *       200:
 *         description: Transaction updated successfully.
 *
 *
 */
router.put("/created-at/:id", putController.editCreatedAtById);

router.delete("/:id", deleteController.deleteTransactionById);

router.get("/total/credit", getController.totalCredit);

router.get("/highest/creditor", getController.highestCreditors);

router.get("/detail/:id", getController.getTransactionsDetailById);

module.exports = router;
