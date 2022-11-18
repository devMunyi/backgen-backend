const apicache = require('apicache');
let cache = apicache.middleware;
const {
  addCodeSnippet,
  getCodeSnippetByCodeSnippetId,
  getCodeSnippets,
  updateCodeSnippet,
  deleteCodeSnippet,
  searchCodesnippet,
  getRelatedSolns,
  reactivateCode,
} = require('../controllers/codesnippet'); // require codesnippet controller to avail its featured methods
const router = require('express').Router(); // require router to define expected client request

//////---------------------------begin imported custom middlewares
const {
  codesnippetAddValidation,
  codesnippetEditValidation,
} = require('../../middlewares/codesnippet'); //avail code add/edit validation middlewares
//////------------------------End imported custom middlewares

////-----------------------Begin routes defination
router.post('/add-codesnippet', codesnippetAddValidation, addCodeSnippet);
router.get('/codesnippets', cache('5 minutes'), getCodeSnippets);
router.get('/codesnippet', getCodeSnippetByCodeSnippetId);
router.put('/edit-codesnippet', codesnippetEditValidation, updateCodeSnippet);
router.delete('/del-codesnippet', deleteCodeSnippet);
router.get('/search-codesnippet', searchCodesnippet);
router.get('/related-solns', cache('5 minutes'), getRelatedSolns);
router.put('/reactivate-codesnippet', reactivateCode);
////-----------------------End routes definations

module.exports = router; //make the module available for imports
