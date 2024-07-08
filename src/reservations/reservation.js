const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../../modules/dbconect');
const { ObjectId } = require('mongodb');

router.get('/:idcard', async (req, res) => {
    const { idcard } = req.params;
    const db = await connectToDatabase();
    const ConsultReservation = db.collection("reservations");
    const result = await ConsultReservation.find({cardclient: idcard}).toArray();
    if(result.length){  
        res.status(201).json(result);
    }else{
        res.status(404).json("No reservations available")
    }
});

router.post('/', async (req, res) => {
    try {
        const {idcard, date, hour } = req.body;

        const db = await connectToDatabase();
        const InsertReservation = db.collection("reservations");
        const body = { 
            cardclient: idcard,
            date: date,
            hour: hour,
        }
        const result = await InsertReservation.insertOne(body);
        res.status(201).json("Reservation assigned");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:code', async (req, res) => {
    const { code } = req.params;
    try {
        const db = await connectToDatabase();
        const DeleteReservation = db.collection("reservations");
        const deleteR = await DeleteReservation.deleteOne({_id: new ObjectId(code)});
        if(deleteR.deletedCount === 1){
            res.status(201).json("Reservation deleted");
        }else{
            res.status(404).json("Error deleting reservation");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;