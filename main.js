var http_json = "https://script.google.com/macros/s/AKfycbwxfC-72vgbRgA_yZ3erIaYlOVTVCMODCCoDVQZuu8yTGHnIz3i35t9rHhWXcdU2tWtTw/exec"

function getDataFromAPI() { // On : https://script.google.com/
  try{
    var url = http_json; // แทน XXXXXXXXX ด้วยรหัส ID ของ Web App ของคุณ
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());
    // ดำเนินการกับข้อมูลที่ได้รับต่อไป
    console.log(data)
  } catch (error) {
    getDataFromAPI2()
  }

}


async function getDataFromAPI2() { // On : VS Code
  const axios = require('axios');
    try {
        const url = http_json;
        const response = await axios.get(url);
        // บันทึกข้อมูลลงในไฟล์ file.json
        fs.writeFileSync('data.json', JSON.stringify(data));

        console.log(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        // getDataFromAPI()
    }
}

getDataFromAPI();



