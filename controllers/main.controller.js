//main.controller.js
const express = require('express');
const router = express.Router();
const { getCustomQueryResults, data } = require('../models/index'); // Import getCustomQueryResults
const {  getSKURESULT } = require('../models/index'); 
const { getCombinedData } = require('../models/index')
const { getbarcodeStatus } = require('../models/index')

const axios = require('axios');


// Get of All_barcode [EPDUPC]
exports.findAllData = (req, res) => {
  const customQueryResults = getCustomQueryResults(); // Get customQueryResults
  
  if (customQueryResults && customQueryResults.length > 0) { 
    res.status(200).json({
      code: 200,
      message: 'OK',
      error: '',
      datetime: getCurrentDatetime(),
      data: customQueryResults, 
    });
  } else {
    res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
      error: 'Custom query results not available',
      datetime: getCurrentDatetime(),
    });
  }
}

function getCurrentDatetime() {
  const currentDate = new Date();
  const timeZoneOffset = currentDate.getTimezoneOffset();
  currentDate.setMinutes(currentDate.getMinutes() - timeZoneOffset);
  const formattedDatetime = currentDate.toISOString().slice(0, 19).replace("T", " ");
  return formattedDatetime;
}

// Get of SKU 
exports.findSKU = async (req, res) => {
  try {
    const SKURESULT = await getSKURESULT(); 
    if (SKURESULT && SKURESULT.length > 0) {
 
      res.status(200).json({
        code: 200,
        message: 'OK',
        error: '',
        datetime: getCurrentDatetime(),
        data: SKURESULT,
      });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Internal Server Error',
        error: 'Custom query results not available',
        datetime: getCurrentDatetime(),
      });
    }
  } catch (error) {

    res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
      error: 'Error fetching SKU results',
      datetime: getCurrentDatetime(),
    });
  }
};

// Update Available
exports.UPDATEAva = async (req, res) => {
  try {
    const { conn_sequelize, DataTypes } = require('../models/index');
    const dataToUpdate = req.body
    

    const combinedData = await getCombinedData();
    let ans = []
    const A = dataToUpdate.results;
      
      for (const item of A) {
        const ep1 = item.barcode
        const ep2 = item.qty
      
        const foundItems = combinedData.filter((i) => i.EPDUPC === ep1);
      
        if (foundItems.length > 0) {
          foundItems.forEach((foundItem) => {
            foundItem.qty = ep2
          });
      
          ans.push(...foundItems);
        }
      }

    if (ans.length === 0) {
      return res.status(404).json({
        code: 404,
        message: 'Not Found',
        error: 'Record not found',
        datetime: getCurrentDatetime(),
      });
    } else {
      for (let i = 0; i < ans.length; i++) {
        await conn_sequelize.query(
          `
          UPDATE DataSupplierStockUpdate
          SET Available = ${ans[i].qty}
          WHERE SpCode = ${ans[i].SpCode} AND SkuCode = ${ans[i].SkuCode}
          `,
          {
            type: conn_sequelize.QueryTypes.UPDATE,
          }
        );
      }

      return res.status(200).json({
        code: 200,
        message: 'OK',
        error: '',
        datetime: getCurrentDatetime(),
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
      error: 'Error updating Available value',
      datetime: getCurrentDatetime(),
    });
  }
};



// Update Leadtime
exports.UPDATELeadtime = async (req, res) => {
  try {
    const { conn_sequelize, DataTypes } = require('../models/index');
    const dataToUpdate = req.body
    

    const combinedData = await getCombinedData();
    let ans = [];
      
      const A = dataToUpdate.results;
      
      for (const item of A) {
        const ep1 = item.barcode
        const ep2 = item.leadtime
      
        const foundItems = combinedData.filter((i) => i.EPDUPC === ep1);
      
        if (foundItems.length > 0) {
          foundItems.forEach((foundItem) => {
            foundItem.Leadtime = ep2
          });
      
          ans.push(...foundItems);
        }
      }

    if (ans.length === 0) {
      return res.status(404).json({
        code: 404,
        message: 'Not Found',
        error: 'Record not found',
        datetime: getCurrentDatetime(),
      });
    } else {
      for (let i = 0; i < ans.length; i++) {
        await conn_sequelize.query(
          `
          UPDATE DataSupplierStockUpdate
          SET Leadtime = ${ans[i].Leadtime}
          WHERE SpCode = ${ans[i].SpCode} AND SkuCode = ${ans[i].SkuCode}
          `,
          {
            type: conn_sequelize.QueryTypes.UPDATE,
          }
        );
      }

      return res.status(200).json({
        code: 200,
        message: 'OK',
        error: '',
        datetime: getCurrentDatetime(),
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
      error: 'Error updating Available value',
      datetime: getCurrentDatetime(),
    });
  }
};

////////////////////////////////////////////////////////////////////

//post barcode [EPDUPC]

exports.BarcodeData = async (req, res) => {
  try {
    const { conn_sequelize, DataTypes } = require('../models/index');
    const barcode = req.body;
    const barcode_Status = await getbarcodeStatus();
    
    let sp = [];
    let A = barcode.results;
    let ans = [];
    let b = barcode.sp_code
    for (const item of A) {
      sp = item.barcode;
      let filteredResults = barcode_Status.filter((i) => i.EPDUPC === sp);
      
      if (filteredResults.length > 0) {
        filteredResults.forEach((ansItem) => {
          ans.push({ barcode: ansItem.EPDUPC, status: ansItem.EPDSTS });
        });
      }
    }
    
    if (ans.length === 0) {
      return res.status(404).json({
        code: 404,
        message: 'Not Found',
        error: 'Record not found',
        datetime: getCurrentDatetime(),
      });
    } else {

      return res.status(200).json({
        sp_code : b,
        results : ans,
        code: 200,
        message: 'OK',
        error: "",
        datetime: getCurrentDatetime(),
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
      error: 'Error updating Available value',
      datetime: getCurrentDatetime(),
    });
  }
}

