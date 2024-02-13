var express = require('express');
var router = express.Router();
const ClickCount = require("../models/count");
const { exec } = require('child_process');
const mongoose = require("mongoose");

router.get('/', async function (req, res, next) {

    const clickCount = await ClickCount.findOne();

    res.render('transaction', { title: 'Transaction', clickCount: clickCount ? clickCount.count : 0 });

});

router.post('/handleButtonModifyClick', async (req, res) => {


    let clickCount = await ClickCount.findOneAndUpdate({},
        {
            $inc: { count: 1 }
        }, {
        new: true,
        upsert: true 
    });


    res.json({ clickCount: clickCount.count });


});

router.post('/handleButtonTrasactionClick', async (req, res) => {

    const session = await mongoose.startSession();

    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' }
    };

    try {
        const transactionResults = await session.withTransaction(async () => {


            let clickCount = await ClickCount.findOneAndUpdate({},
                {
                    $inc: { count: 1 }
                }, {
                new: true,
                upsert: true // Make this update into an upsert
            });

            return clickCount;

        }, transactionOptions);

        if (transactionResults) {

            console.log("The transaction was successful.");
            res.json({ clickCount: transactionResults.count });
            
        } else {
            console.log("The transaction was intentionally aborted.");
            res.status(500).json({ error: 'Transaction aborted' });
        }
    } catch (e) {
        console.error("The transaction was aborted due to an unexpected error:", e);
        res.status(500).json({ error: 'Unexpected error' });
    } finally {
        console.log('End the session');
        await session.endSession();
    }

});

router.post('/handleShModifyClick', async (req, res) => {
    exec('sh ./bin/concurrent_test_2.sh', async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing shell script: ${error}`);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log(`Shell script output: ${stdout}`);
        var clickCount = await ClickCount.findOne();
        res.json({ clickCount: clickCount.count });
    });
});



router.post('/handleShClick', async (req, res) => {
    exec('sh ./bin/concurrent_test_3.sh', async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing shell script: ${error}`);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log(`Shell script output: ${stdout}`);
        var clickCount = await ClickCount.findOne();
        res.json({ clickCount: clickCount.count });
    });
});


module.exports = router;
