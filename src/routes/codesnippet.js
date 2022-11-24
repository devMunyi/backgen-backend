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
  getCodeArchives,
  adminGetCodeSnippets,
} = require('../controllers/codesnippet'); // require codesnippet controller to avail its featured methods
const router = require('express').Router(); // require router to define expected client request

//////---------------------------begin imported custom middlewares
const {
  codesnippetAddValidation,
  codesnippetEditValidation,
} = require('../../middlewares/codesnippet'); //avail code add/edit validation middlewares
//////------------------------End imported custom middlewares

////-----------------------Begin routes definition
router.post('/add-codesnippet', codesnippetAddValidation, addCodeSnippet);
router.get('/codesnippets', getCodeSnippets);
router.get('/admin-codesnippets', adminGetCodeSnippets);
router.get('/codesnippet', getCodeSnippetByCodeSnippetId);
router.put('/edit-codesnippet', codesnippetEditValidation, updateCodeSnippet);
router.delete('/del-codesnippet', deleteCodeSnippet);
router.get('/search-codesnippet', searchCodesnippet);
router.get('/related-solns', getRelatedSolns);
router.put('/reactivate-codesnippet', reactivateCode);
router.get('/codearchives', getCodeArchives);
////-----------------------End routes definations

module.exports = router; //make the module available for imports
