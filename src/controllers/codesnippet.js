const {
  addCodeSnippet,
  getCodeSnippetByCodeSnippetId,
  getCodeSnippets,
  updateCodeSnippet,
  deleteCodeSnippet,
  searchCodesnippet,
  getRelatedSolns,
  reactivateCode,
  archiveCode,
  getCodeArchives,
  getRowCodeOnly,
} = require('../models/codesnippet'); // avails methods from codesnippet models

const { totalRecords, incrementCounter } = require('../models/common');

const { inputAvailable, parseToInt } = require('../../helpers/common'); // require common helper functions

const { decode } = require('html-entities');

const serverErrorMSG = {
  success: false,
  message: 'Server error. Please try again later',
};

module.exports = {
  addCodeSnippet: async (req, res) => {
    const { body } = req;
    try {
      await addCodeSnippet(body);

      return res.json({
        success: true,
        message:
          'Added Successfully. It will be visible to the public once reviewed',
      });
    } catch (error) {
      console.log(error);
      return res.json(serverErrorMSG);
    }
  },

  updateCodeSnippet: async (req, res) => {
    const { body } = req;
    const { codesnippet_id, title, added_by } = req.body;

    if (!codesnippet_id) {
      return res.json({ success: false, message: 'Not Found' });
    }

    try {
      const { row_code } = await getRowCodeOnly(codesnippet_id);

      // archive old version of the code
      await archiveCode({
        codesnippet_id,
        title,
        archive_row_code: row_code,
        archived_by: added_by,
      });

      // increment archive count
      await incrementCounter({
        uid: codesnippet_id,
        table: 'pr_code_snippets',
        field: 'archive_count',
      });

      // now update the code itself
      const result = await updateCodeSnippet(codesnippet_id, body);

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      // return response
      return res.json({
        success: true,
        message: 'Update successful',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Failed to update code snippet',
      });
    }
  },

  searchCodesnippet: async (req, res) => {
    // initialize an empty object
    let queryObj = {};

    // destructuring req query for the variables
    let { status, search_, rpp, offset, orderby, dir } = req.query;
    status = parseToInt(status);

    let where_ = isFinite(status) ? `c.status = ${status}` : 'c.status >= 0';

    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      where_ += ` AND c.title LIKE '%${search_}%'`;
    }

    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      rpp = 7;
    }

    if (!orderby) {
      orderby = 'c.uid';
    }

    if (!dir) {
      dir = 'DESC';
    }

    // add data to queryObj object
    queryObj.where_ = where_;
    queryObj.offset = parseToInt(offset);
    queryObj.rpp = parseToInt(rpp);
    queryObj.orderby = `${orderby} ${dir}`;

    try {
      const results = await searchCodesnippet(queryObj);

      const { search_totals } = await totalRecords({
        table: 'pr_code_snippets c',
        field: 'c.uid',
        where_,
        desiredName: 'search_totals',
      });

      console.log(search_totals);

      // get all total records
      return res.json({
        success: true,
        search_totals,
        data: results,
      });
    } catch (error) {
      console.log(error);
      return res.json(serverErrorMSG);
    }
  },

  getCodeSnippets: async (req, res) => {
    // initialize an empty object
    let queryObj = {};

    // destructuring req query for the variables
    let {
      status,
      search_,
      func_id,
      subfunc_id,
      language_id,
      framework_id,
      user_impl_type_id,
      orderby,
      dir,
      rpp,
      offset,
    } = req.query;

    let where_ = '';
    status = parseToInt(status);
    if (Number.isFinite(status)) {
      where_ = `c.status = ${status}`;
    } else {
      where_ = `c.status >= 0`;
    }

    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      where_ += ` AND c.title LIKE '%${search_}%'`;
    }

    if (func_id) {
      func_id = parseToInt(func_id);
      where_ += ` AND c.func_id = ${func_id}`;
    }

    if (subfunc_id) {
      subfunc_id = parseToInt(subfunc_id);
      where_ += ` AND c.subfunc_id = ${subfunc_id}`;
    }
    if (language_id) {
      language_id = parseToInt(language_id);
      where_ += ` AND c.language_id = ${language_id}`;
    }
    if (framework_id) {
      framework_id = parseToInt(framework_id);
      where_ += ` AND c.framework_id = ${framework_id}`;
    }

    if (user_impl_type_id) {
      user_impl_type_id = parseToInt(user_impl_type_id);
      where_ += ` AND c.user_impl_type_id = ${user_impl_type_id}`;
    }

    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      rpp = 10;
    }

    if (!orderby) {
      orderby = 'c.uid';
    }

    if (!dir) {
      dir = 'DESC';
    }

    queryObj.where_ = where_;
    queryObj.orderby = `${orderby} ${dir}`;
    queryObj.offset = parseToInt(offset);
    queryObj.rpp = parseToInt(rpp);

    try {
      // get codesnippets
      const result = await getCodeSnippets(queryObj);

      // codesnippets count
      const { all_totals } = await totalRecords({
        table: 'pr_code_snippets c',
        field: 'c.uid',
        where_,
      });

      return res.json({
        success: true,
        all_totals,
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  adminGetCodeSnippets: async (req, res) => {
    // initialize an empty object
    let queryObj = {};

    // destructuring req query for the variables
    let {
      status,
      search_,
      func_id,
      subfunc_id,
      language_id,
      framework_id,
      user_impl_type_id,
      orderby,
      dir,
      rpp,
      offset,
    } = req.query;

    let where_ = 'c.uid > 0';
    if (status >= 0) {
      where_ = `c.status = ${parseToInt(status)}`;
    } else {
      where_ = `c.status >= 0`;
    }

    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      where_ += ` AND c.title LIKE '%${search_}%'`;
    }

    if (func_id >= 0) {
      where_ += ` AND c.func_id = ${parseToInt(func_id)}`;
    }

    if (subfunc_id >= 0) {
      where_ += ` AND c.subfunc_id = ${parseToInt(subfunc_id)}`;
    }

    if (language_id >= 0) {
      where_ += ` AND c.language_id = ${parseToInt(language_id)}`;
    }

    if (framework_id >= 0) {
      where_ += ` AND c.framework_id = ${parseToInt(framework_id)}`;
    }

    if (user_impl_type_id >= 0) {
      where_ += ` AND c.user_impl_type_id = ${parseToInt(user_impl_type_id)}`;
    }

    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      rpp = 10;
    }

    if (!orderby) {
      orderby = 'c.uid';
    }

    if (!dir) {
      dir = 'DESC';
    }

    queryObj.where_ = where_;
    queryObj.orderby = `${orderby} ${dir}`;
    queryObj.offset = parseToInt(offset);
    queryObj.rpp = parseToInt(rpp);

    try {
      const results = await getCodeSnippets(queryObj);

      const { all_totals } = await totalRecords({
        table: 'pr_code_snippets c',
        field: 'c.uid',
        where_,
      });

      // console.log(results);
      return res.json({
        success: true,
        all_totals,
        data: results,
      });
    } catch (error) {
      console.log(error);
      return res.json(serverErrorMSG);
    }
  },

  getCodeSnippetByCodeSnippetId: async (req, res) => {
    // destructure codesnippet_id and status values
    const { codesnippet_id, status } = req.query;

    // ensure codesnippet id is provided
    if (!codesnippet_id) {
      return res.json({
        success: false,
        message: 'Not Found',
      });
    }

    try {
      // increment views for the code by 1
      await incrementCounter({
        table: 'pr_code_snippets',
        field: 'views',
        uid: codesnippet_id,
      });

      // arrange query params
      let where_ = `c.uid = ${codesnippet_id}`;
      if (status) {
        where_ += ` AND c.status = ${status}`;
      } else {
        where_ += ` AND c.status >= 0`;
      }

      // get codesnippet by id
      const result = await getCodeSnippetByCodeSnippetId(where_);

      // decode row_code and title
      result[0].row_code = decode(result[0].row_code);
      result[0].title = decode(result[0].title);

      // return
      return res.json({
        success: true,
        all_totals: 1,
        data: result[0],
      });
    } catch (error) {
      console.log(error);
      return res.json(serverErrorMSG);
    }
  },

  deleteCodeSnippet: async (req, res) => {
    const { codesnippet_id } = req.body;

    if (!codesnippet_id) {
      return res.json({
        success: false,
        message: 'Not found',
      });
    }

    try {
      const result = await deleteCodeSnippet(
        parseToInt(parseToInt(codesnippet_id))
      );

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Code snippet deleted successfully!',
      });
    } catch (error) {
      console.log(error);
      return res.json(serverErrorMSG);
    }
  },

  getRelatedSolns: async (req, res) => {
    let {
      func_id,
      language_id,
      subfunc_id,
      codesnippet_id,
      offset,
      rpp,
      status,
    } = req.query;

    if (!codesnippet_id) {
      return res.json({
        success: false,
        message: 'Codesnippet id is required',
      });
    }

    if (!func_id) {
      return res.json({
        success: false,
        message: 'Function id is required',
      });
    }

    if (!subfunc_id) {
      return res.json({
        success: false,
        message: 'Subfunction id is required',
      });
    }

    if (!language_id) {
      return res.json({
        success: false,
        message: 'Language id is required',
      });
    }

    let where_ = `c.func_id = ${func_id} AND c.subfunc_id = ${subfunc_id} AND c.language_id =${language_id} AND c.uid != ${codesnippet_id}`;
    if (status) {
      where_ += ` AND c.status = ${status}`;
    } else {
      where_ += ` AND c.status >= 0`;
    }

    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      rpp = 25;
    }

    try {
      const results = await getRelatedSolns({ where_, offset, rpp });

      return res.json({
        success: true,
        data: results,
      });
    } catch (error) {
      console.log(error);

      return res.json(serverErrorMSG);
    }
  },

  reactivateCode: async (req, res) => {
    const { codesnippet_id } = req.body;

    try {
      const result = await reactivateCode(parseToInt(codesnippet_id));

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Solution activated successfully',
      });
    } catch (error) {
      console.log(error);
      return res.json(serverErrorMSG);
    }
  },

  // code archieves
  getCodeArchives: async (req, res) => {
    // initialize an empty object
    let queryObj = {};

    // destructuring req query for the variables
    let { codesnippetId, status, search_, orderby, dir, rpp, offset } =
      req.query;
    codesnippetId = parseToInt(codesnippetId);
    status = parseToInt(status);

    let where_ = 'uid > 0';
    if (status >= 0) {
      where_ = `status = ${status}`;
    } else {
      where_ = `status >= 0`;
    }

    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      where_ += ` AND title LIKE '%${search_}%'`;
    }

    if (codesnippetId >= 0) {
      where_ += ` AND codesnippet_id = ${codesnippetId}`;
    }

    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      rpp = 10;
    }

    if (!orderby) {
      orderby = 'uid';
    }

    if (!dir) {
      dir = 'DESC';
    }

    queryObj.where_ = where_;
    queryObj.orderby = `${orderby} ${dir}`;
    queryObj.offset = parseToInt(offset);
    queryObj.rpp = parseToInt(rpp);

    try {
      // get code archives
      const result = await getCodeArchives({
        where_,
        orderby,
        rpp,
        offset,
      });

      // get archives total
      const { archives_total } = await totalRecords({
        table: 'pr_codesnippets_archive',
        field: 'uid',
        where_,
        desiredName: 'archives_total',
      });

      // give a response back
      return res.json({
        success: true,
        archives_total,
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: serverErrorMSG,
      });
    }
  },
};
