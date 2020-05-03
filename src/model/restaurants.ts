// const fs = require('fs');
// const papa = require('papaparse');
// const file = fs.createReadStream('restaurants.csv');
// var count = 0; 
// var res_data:any;
// papa.parse(file, {
//     headers:true,
//     skipEmptyLines: true,
//     worker: true, // Don't bog down the main thread if its a big file
//     step: function (result) {
//         // do stuff with result
//         console.log('res in step',result)
//     },
//     complete: function (results, file) {
//         res_data=results
//         console.log('tresult in comp',results)
//         console.log('parsing complete read', results, 'records.');
//     }
// });
// export default res_data;

// Papa.parse(files[0], {
//     header: true,
//     skipEmptyLines: true,
//     complete: (result,file) => {
//       console.log(result);
//       this.dataList = result.data;
//     }
//   });