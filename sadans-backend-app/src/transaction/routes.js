const express = require("express");
const router = express.Router();

const controller = require("./controller");

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
router.get("/", controller.getAllTransactions);

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
router.get("/:name", controller.getTransactionsByName);

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
router.get("/total-credit/:name", controller.totalRemainingCredit);

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
router.get("/:id/limit/:limit", controller.showLastNTransaction);

module.exports = router;
