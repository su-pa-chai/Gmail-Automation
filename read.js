const fs = require('fs');
const path = require('path');

// ระบุเส้นทางไฟล์ JSON
const filePath = path.join(__dirname, 'data.json');

// อ่านไฟล์ JSON
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('เกิดข้อผิดพลาดในการอ่านไฟล์:', err);
    return;
  }

  try {
    // แปลงข้อมูล JSON เป็น JavaScript object
    const jsonData = JSON.parse(data);
    console.log('ข้อมูล:', jsonData);
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการแปลงข้อมูล JSON:', error);
  }
});
