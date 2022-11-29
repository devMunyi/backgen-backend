const apicache = require('apicache');
// let cache = apicache.middleware;
const {
  addFramework,
  getFrameworks,
  getFrameworkByFrameworkId,
  updateFramework,
  deleteFramework,
  reactivateFramework,
} = require('../controllers/framework'); //require framework controller to avail its featured methods
const router = require('express').Router(); //require router to define expected client request

/////----------------------------Begin of imported custom middlewares
const {
  frameworkAddValidation,
  frameworkEditValidation,
  validateImg,
} = require('../../middlewares/framework'); //avail framework add/edit validation middlewares
/////-------------------------End of imported custom middlewares

/////--------------------------Routes definations
router.post(
  '/add-framework',
  validateImg,
  frameworkAddValidation,
  addFramework
);
router.get('/frameworks', getFrameworks);
router.get('/framework', getFrameworkByFrameworkId);
router.put(
  '/edit-framework',
  validateImg,
  frameworkEditValidation,
  updateFramework
);
router.delete('/del-framework', deleteFramework);
router.put('/reactivate-framework', reactivateFramework);
///-----------------------End routes definations

module.exports = router; //make the module available for imports
