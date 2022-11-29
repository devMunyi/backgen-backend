const apicache = require('apicache');
// let cache = apicache.middleware;
const {
  addDbms,
  getDbmses,
  getDbmsByDbmsId,
  updateDbms,
  deleteDbms,
  reactivateDbms,
} = require('../controllers/dbms'); //require dbms controller to avail its featured methods
const router = require('express').Router(); //require router to define expected client request

//////--------------------------------begin imported custom middlewares
const {
  dbmsAddValidation,
  dbmsEditValidation,
  validateImg,
} = require('../../middlewares/dbms'); //avail dbms add/edit validation middlewares

//////---------------------------------End imported custom middlewares

////---------------------------------Begin routes defination
router.post('/add-dbms', validateImg, dbmsAddValidation, addDbms);
router.get('/dbmses', getDbmses);
router.get('/dbms', getDbmsByDbmsId);
router.put('/edit-dbms', validateImg, dbmsEditValidation, updateDbms);
router.delete('/del-dbms', deleteDbms);
router.put('/reactivate-dbms', reactivateDbms);
////----------------------------End routes definations

module.exports = router; //make the module available for imports
