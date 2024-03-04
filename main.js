var http_json = "https://script.google.com/macros/s/AKfycbwxfC-72vgbRgA_yZ3erIaYlOVTVCMODCCoDVQZuu8yTGHnIz3i35t9rHhWXcdU2tWtTw/exec"

function getDataFromAPI() { // On : https://script.google.com/
  try{
    var url = http_json; // แทน XXXXXXXXX ด้วยรหัส ID ของ Web App ของคุณ
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());
    // ดำเนินการกับข้อมูลที่ได้รับต่อไป
    // console.log(data)
    getDataAndSendEmail(data)
  } catch (error) {
    getDataFromAPI2()
  }

}


async function getDataFromAPI2() { // On : VS Code
  var fs = require('fs');
  const axios = require('axios');
  try {
    const url = http_json;
    const response = await axios.get(url);
    // บันทึกข้อมูลลงในไฟล์ file.json
    fs.writeFileSync('data.json', JSON.stringify(response.data));

    console.log(response.data);
} catch (error) {
    console.error('Error fetching data:', error.message);
    // getDataFromAPI()
}
}

// getDataFromAPI2();



function getDataAndSendEmail(data_json) {
  var jsonData = data_json; // JSON ของคุณที่นี่
  
  // 1. วนลูปผ่านข้อมูล JSON เพื่อสร้าง HTML สำหรับตาราง
  var tableHTML = '<table border="1"><tr>';
  var headers = Object.keys(jsonData[0]); // หัวตาราง
  for (var i = 0; i < headers.length; i++) {
    tableHTML += '<th>' + headers[i] + '</th>';
  }
  tableHTML += '</tr>';
  
  for (var j = 0; j < jsonData.length; j++) {
    tableHTML += '<tr>';
    for (var k = 0; k < headers.length; k++) {
      var key = headers[k];
      if (typeof jsonData[j][key] === 'object') {
        // ในกรณีที่ค่าเป็นอ็อบเจ็กต์
        for (var prop in jsonData[j][key]) {
          tableHTML += '<td>' + jsonData[j][key][prop] + '</td>'; // ดึงค่าทั้งหมดในอ็อบเจ็กต์
        }
      } else {
        tableHTML += '<td>' + jsonData[j][key] + '</td>';
      }
    }
    tableHTML += '</tr>';
  }
  tableHTML += '</table>';

  // 4. เขียน HTML สำหรับเนื้อหาอีเมล์
  var emailBodyHTML = '<p>ตารางข้อมูล:</p>' + tableHTML;

  var recipient = "Supachai_r@muangthai.co.th"; // อีเมล์ผู้รับ
  var subject = 'ข้อมูลจาก JSON'; // หัวข้ออีเมล์
  var body = 'ดูข้อมูลจากไฟล์แนบ'; // เนื้อหาข้อความอีเมล์
  MailApp.sendEmail(recipient, subject, body, {htmlBody: emailBodyHTML}); // ส่งอีเมล์พร้อมตาราง HTML
}

