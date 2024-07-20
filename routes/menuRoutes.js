const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');

/**
 * @swagger
 * /menu/get-menu:
 *   get:
 *     summary: Get all dishes
 *     description: Retrieve a list of dishes
 *     responses:
 *       200:
 *         description: A list of dishes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   dishName:
 *                     type: string
 *                   price: 
 *                     type: number
 *                   description:
 *                     type: string
 *                   dishType: 
 *                     type: string
 *       400:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

router.get('/get-menu', async (req, res) => {
    try {
        const data = await Menu.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: "Something went wrong", error: error.message });
    }
});

/**
 * @swagger
 * /menu/add-menu:
 *   post:
 *     summary: Add a new dish
 *     description: Add a new dish to the menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dishName:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               dishType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Dish added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 dish:
 *                   type: object
 *                   properties:
 *                     dishName:
 *                       type: string
 *                     price:
 *                       type: number
 *                     description:
 *                       type: string
 *                     dishType:
 *                       type: string
 *       400:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

router.post('/add-menu', async (req, res) => {
    const { dishName, price, description, dishType } = req.body;

    // Create a new menu item
    const newDish = new Menu({
        dishName,
        price,
        description,
        dishType
    });
    console.log(newDish)
    try {
        // Save the new menu item to the database
        const savedDish = await newDish.save();
        res.status(201).json({ message: "Dish added successfully", dish: savedDish });
    } catch (error) {
        res.status(400).json({ message: "Something went wrong", error: error.message });
    }
});

module.exports = router;
