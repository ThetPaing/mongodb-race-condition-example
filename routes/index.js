var express = require('express');
var router = express.Router();
const ClickCount = require("../models/count");
const { exec } = require('child_process');
/* GET home page. */
router.get('/', async function (req, res, next) {
    const clickCount = await ClickCount.findOne();

    res.render('index', { title: 'Express', clickCount: clickCount ? clickCount.count : 0 });

});

router.post('/handleButtonClick', async (req, res) => {
    let clickCount = await ClickCount.findOne();

    if (!clickCount) {
        clickCount = new ClickCount();
        clickCount.count = 0;
    }

    clickCount.count += 1;

    await clickCount.save();
    
    res.json({ clickCount: clickCount.count });


});



router.post('/handleShClick', async (req, res) => {
    exec('sh ./bin/concurrent_test.sh', async (error, stdout, stderr) => {
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


router.post('/handleResetClick', async (req, res) => {
    let clickCount = await ClickCount.findOne();

    clickCount.count = 0;

    await clickCount.save();
    res.json({ clickCount: clickCount.count });
});
module.exports = router;
