const express = require('express');
const router = express.Router();
const Persons = require('../models/persons');
const { generateToken, jwtAuthMiddleware } = require('../jwt');



router.post('/signup', async (req, res) => {
    const data = req.body
    try {
        const newPerson = new Persons(data)
        const response = await newPerson.save()
        const payload = {
            id: response?.id,
            email: response?.email
        }
        const token = generateToken(payload)
        res.status(200).json({ response, token })
    } catch (error) {
        // res.status(400).json("------", error)
        res.status(400).json({ message: "Something went wrong", error: error.message });

    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Persons.findOne({ email: email })
        if (!user || !(await user.comparePassword(password))) {
            res.status(401).json({ message: "Invalid username or password" });
        }
        const payload = {
            id: user?.id,
            email: user?.email
        }
        const token = generateToken(payload)
        res.status(200).json({ token: token })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something went wrong" });
    }
})

router.get('/get-persons', jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Persons.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ message: "Something went wrong", error: error.message });
    }
})

router.get('/get-person-by-Id', async (req, res) => {
    const { email } = req?.query;
    console.log(req)
    if (!email) {
        res.status(400).json({ message: "Email is require" })
    }
    try {
        const data = await Persons.findOne({ email: email })
        if (!data) {
            res.status(404).json({ message: "Email is not found" })
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ message: "Something went wrong", error: error.message });

    }
})

router.get('/get-persons/:work', async (req, res) => {
    const work = req.params?.work
    try {
        if ((['manager', 'chefs', 'waiters']).includes(work)) {
            const data = await Persons.find({ work: work })
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: "Invalid work type" });
        }
    } catch (error) {
        res.status(400).json({ message: "Something went wrong", error: error.message })
    }

})

router.put('/update-person', async (req, res) => {
    const data = req.body
    const { email, ...updateData } = data;
    if (!email) {
        return res.status(400).json({ message: "EmailId is required" });
    }
    try {
        const updatePerson = await Persons.findOneAndUpdate(
            { email: email },
            updateData,
            {
                new: true,
                runValidators: true
            }
        )
        if (!updatePerson) {
            return res.status(404).json({ message: "Person not found" });
        }
        res.status(200).json(updatePerson);

    } catch (error) {
        res.status(400).json({ message: "Something went wrong", error: error.message });

    }
})

router.delete('/delete-person', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "EmailId is required" });
    }
    try {
        const deletePerson = await Persons.findOneAndDelete({ email: email })
        if (!deletePerson) {
            return res.status(404).json({ message: "Person not found" });
        }
        res.status(200).json({ message: "Person deleted successfully", person: deletePerson });

    } catch (error) {
        res.status(400).json({ message: "Something went wrong", error: error.message });

    }
})

module.exports = router