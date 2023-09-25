// index.js
const dbConfig = require('../config/db.config.js');
const { Sequelize, DataTypes } = require('sequelize');

const conn_sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.DIALECT,
    pool: {
      max: dbConfig.POOL.MAX,
      min: dbConfig.POOL.MIN,
      acquire: dbConfig.POOL.ACQUIRE.acquire,
      idle: dbConfig.POOL.IDLE,
    },
    timezone: '+07:00',
    logging: false,
  }
);

const CustomQuery = conn_sequelize.define('CustomQuery', {
  EPDUPC: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

conn_sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

let customQueryResults = [];

function executeCustomQuery() {
  return conn_sequelize
    .query(
      `
      SELECT DISTINCT b.EPDUPC
      FROM DataSupplierStock a
      INNER JOIN MasterProduct b ON a.SKUCODE = b.EPDSKU
      WHERE a.SpCode = '620201'
    `,
    { type: conn_sequelize.QueryTypes.SELECT }
    )
    .then((results) => {
      customQueryResults = results;
      return results; 
    })
    .catch((err) => {
      console.error('Error executing the custom query:', err);
      throw err; 
    });
}
executeCustomQuery()
  .then((results) => {
    // console.log('customQueryResults:', customQueryResults);
  })
  .catch((err) => {
    console.error('Error:', err);
  });



  let barcode_Status = [];

  function getbarcodeStatus() {
    return conn_sequelize
      .query(
        `
        SELECT DISTINCT b.EPDUPC ,b.EPDSTS
        FROM DataSupplierStock a
        INNER JOIN MasterProduct b ON a.SKUCODE = b.EPDSKU
        WHERE a.SpCode = '620201'
      `,
      { type: conn_sequelize.QueryTypes.SELECT }
      )
      .then((results) => {
        barcode_Status = results;
        return results; 
      })
      .catch((err) => {
        console.error('Error executing the custom query:', err);
        throw err; 
      });
  }



  getbarcodeStatus()
  .then((barcode_Status) => {
    // let barcode = {

    //     "sp_code": "620201",
    //     "results": [
    //       {
    //         "barcode": "0000042005513"
    //       },
    //       {
    //         "barcode": "0000042117100"
    //       },
      
    //   ]
    // };

  //   let sp = [];
  //   let A = barcode.results;
  //   let ans = [];
  //   let b = barcode.sp_code
  //   for (const item of A) {
  //     sp = item.barcode;
  //     let filteredResults = barcode_Status.filter((i) => i.EPDUPC === sp);
      
  //     if (filteredResults.length > 0) {
  //       filteredResults.forEach((ansItem) => {
  //         ans.push({ EPDUPC: ansItem.EPDUPC, EPDSTS: ansItem.EPDSTS });
  //       });
  //     }
  //   }
  //   // console.log('xxxx', ans)

  //   console.log('Updated barcode_Status:', ans);

  })
  .catch((error) => {
    console.error('Error:', error);
  });





function getCustomQueryResults() {
  return customQueryResults;
}

let SKURESULT = [];

function getSKURESULT() {
  return executeCustomQuery() // เรียก executeCustomQuery() เพื่อรับ customQueryResults
    .then((customQueryResults) => {
      if (customQueryResults.length > 0) {
        const EPDUPCArray = customQueryResults.map(result => result.EPDUPC);
        // console.log('EPDUPCArray:', EPDUPCArray); 
        const sqlQuery = `
          SELECT EPDUPC, EPDSKU
          FROM MasterProduct
          WHERE EPDUPC IN ('${EPDUPCArray.join("','")}')`;

        return conn_sequelize
          .query(sqlQuery, {
            type: conn_sequelize.QueryTypes.SELECT,
          })
          .then((results) => {
            SKURESULT = results;
            return SKURESULT;
          });
      } else {
        return Promise.resolve([]);
      }
    });
}


getSKURESULT()
  .then((results) => {
    // console.log ('sku:',SKURESULT)
  })
  .catch((err) => {
    console.error('Error:', err);
  });

let data = []

function getDATA() {
  return getSKURESULT()
    .then((SKURESULT) => {
      if (SKURESULT.length > 0) {
        const DataArray = SKURESULT.map(result => result.EPDSKU);
        // console.log('DataArray:', DataArray); 
        const sqlQuery = `
        SELECT SpCode,SkuCode 
        FROM DataSupplierStockUpdate
        WHERE SkuCode IN ('${DataArray.join("','")}')`

        return conn_sequelize
          .query(sqlQuery, {
            type: conn_sequelize.QueryTypes.SELECT,
          })
          .then((results) => {
            data = results;
            return data;
          });
      } else {
        return Promise.resolve([]);
      }
    });
}

getDATA()
  .then((results) => {
    // console.log('data:', data); 
  })
  .catch((err) => {
    console.error('Error:', err);
  });


  let combinedData = [];

  async function getCombinedData() {
    try {
  
      const [skuresultData, dataData] = await Promise.all([getSKURESULT(), getDATA()]);
  
 
      const skuCodeMap = {};
      skuresultData.forEach((result) => {
        skuCodeMap[result.EPDSKU] = { EPDUPC: result.EPDUPC };
      });
  

      dataData.forEach((result) => {
        const skuData = skuCodeMap[result.SkuCode];
        if (skuData) {
          skuData.SpCode = result.SpCode;
          skuData.SkuCode = result.SkuCode; 
        }
      });
  

      combinedData = Object.values(skuCodeMap).map(({ EPDUPC, SpCode, SkuCode }) => ({
        SpCode,
        SkuCode, 
        EPDUPC,
      })).filter(({ EPDUPC, SpCode, SkuCode }) => EPDUPC && SpCode && SkuCode);
  
      return combinedData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  getCombinedData()
    .then((combinedData) => {
      // console.log('Combined Data:', combinedData);
      // const data = {
      //   "sp_code": "620201",
      //   "results": [
      //     {
      //       "barcode": "8855421001059",
      //       "Leadtime": 10
      //     },
      //     {
      //       "barcode": "8855421001028",
      //       "Leadtime": 7
      //     },
      //     {
      //       "barcode": "8855421005217",
      //       "Leadtime": 3
      //     }
      //   ]
      // };
      
      // let ans = [];
      
      // const A = data.results;
      
      // for (const item of A) {
      //   const ep1 = item.barcode; // ใช้ const ในการประกาศตัวแปร
      //   const ep2 = item.Leadtime; // ใช้ const ในการประกาศตัวแปร
      
      //   const foundItems = combinedData.filter((i) => i.EPDUPC === ep1);
      
      //   if (foundItems.length > 0) {
      //     foundItems.forEach((foundItem) => {
      //       foundItem.Leadtime = ep2; // กำหนดค่า Leadtime ให้กับแต่ละอ็อบเจ็กต์ใน foundItems
      //     });
      
      //     ans.push(...foundItems);
      //   }
      // }
      
      // console.log('ans', ans);
      
    
  

//     if (ans.length === 0) {
//       console.log('yes')
  
//     } else {
//       for (let i = 0; i < ans.length; i++) {
       
//         let c = ans[i].Leadtime
//          console.log('sssss', c)
//           }
        
      
//     }
// // }
// t.forEach((foundItem) => {
  // console.log(foundItem.Leadtime);
// });


// let m = t.length
// dataToUpdate = {
//   "sp_code": "620201",
//   "results": [
//     {
//       "barcode": "8855421001059",
//       "qty": 200
//     },
//     {
//       "barcode": "8855421001028",
//       "qty": 100
//     },
//     {
//       "barcode": "8855421005217",
//       "qty": 300
//     }
//   ]
// }


// const A = dataToUpdate.results;
      
//       for (const item of A) {
//         const ep1 = item.barcode
//         const ep2 = item.qty
      
//         const foundItems = combinedData.filter((i) => i.EPDUPC === ep1);
      
//         if (foundItems.length > 0) {
//           foundItems.forEach((foundItem) => {
//             foundItem.qty = ep2
//           });
      
//           ans.push(...foundItems);
//         }
//       }




}

      // console.log('result:',A);
)
    .catch((err) => {
      console.error('Error:', err);
    });
  
   
  module.exports = {
    conn_sequelize,
    CustomQuery,
    getCustomQueryResults,
    customQueryResults,
    getSKURESULT,
    SKURESULT,
    getDATA,
    data,
    getCombinedData,
    combinedData,
    getbarcodeStatus,
    barcode_Status
  };
