// Presented by BrilliantPy

function doGet() {
    var spreadsheetId = '1V04kDoU85sSIUEzd6Vy_1RPOxeb4QjTiNVB0aQ8A0hw';
    var sheetName = 'ส่งเมล์แจ้ง';
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    
    var nameRangeValues = sheet.getRange('A2:V2').getValues();
    var headers = nameRangeValues[0]; // ดึงเฉพาะแถวแรกเพื่อเป็นหัวข้อ

    var values = sheet.getRange('A3:V').getDisplayValues();
    values = values.filter(row => row[0] !== ""); // ตรวจสอบว่าคอลัมน์ A ไม่ว่างเปล่า

    var data = [];
    values.forEach(row => {
        var obj = {};
        row.forEach((cell, index) => {
            obj[headers[index]] = cell;
        });
        data.push(obj);
    });

    var result = JSON.stringify(data);
    Logger.log(result); // แสดงผลลัพธ์ใน Log ของ Google Apps Script
    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}


  // let result = values.map(([a,b,c,d,e,f,g,h,i]) => {
  //   return ({unix:a,date:b,symbol:c,open:d,high:e,low:f,close:g,vol_btc:h,vol_usdt:i});
  // })

  // let data = JSON.stringify(result);
  // console.log('data:',data);
  // return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON);

// var dataRange = sheet.getRange('A2:A');
// var dataValues = dataRange.getValues();

// var count = dataValues.reduce(function (acc, row) {
//   return acc + (row[0] !== '' ? 1 : 0);
// }, 0);

// console.log(dataRange)