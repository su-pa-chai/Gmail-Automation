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
            var cellFormat = sheet.getRange(index + 3, index + 1).getNumberFormat(); // ดึงรูปแบบของเซลล์
            var cellAlignment = sheet.getRange(index + 3, index + 1).getHorizontalAlignment(); // ดึงการจัดวางของเซลล์
            var cellbackgrounds = sheet.getRange(index + 3, index + 1).getBackgrounds(); 
            var cellfontColors = sheet.getRange(index + 3, index + 1).getFontColors(); 

            obj[headers[index]] = {
                value: cell,
                format: cellFormat,
                alignment: cellAlignment,
                backgrounds:cellbackgrounds,
                fontColors:cellfontColors
            };
        });
        data.push(obj);
    });

    var result = JSON.stringify(data);
    Logger.log(result); // แสดงผลลัพธ์ใน Log ของ Google Apps Script
    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}


