const { exec } = require("child_process");
const os = require("os");

// Получение локального IP-адреса
const interfaces = os.networkInterfaces();
const localIp = Object.values(interfaces)
  .flat()
  .filter((iface) => iface && !iface.internal && iface.family === "IPv4")
  .map((iface) => iface.address)[0];

// Запуск Parcel с реальным адресом
const parcelCommand = `npx parcel src/index.html --host 0.0.0.0 --no-source-maps`;
console.log(`Server running at http://${localIp}:1234`);

exec(parcelCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Ошибка запуска Parcel: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Ошибка: ${stderr}`);
    return;
  }
  console.log(stdout);
});
