const cp = require('child_process');
const mysqldump = require('mysqldump');
const config = require(`${process.cwd()}/config.json`);
const state = config.autodelete;
console.log("------------------------------------------\nServer Mysql Back UP\nVer 2.0.0\nPower By SmallDevil\n------------------------------------------\n");
backup();
setInterval(() => {
    backup();
}, 3600000);
function backup() {
        var today=new Date();
        var month = today.getMonth()+1
        var date = today.getDate()
        var hour = today.getHours()
        var min = today.getMinutes()
        var time = `${today.getFullYear()}${padStart(month)}${padStart(date)}_${padStart(hour)}${padStart(min)}`
        if(state){
        console.log("Start Remove A Days Ago File\n")
        cp.exec(`forfiles /p "db_backup" /d -1 /s /m *.* /c "cmd /c del @path"`)
        console.log("Remove Done\n")
        }
        console.log("Start BackUP SQL\n")
        mysqldump({
            connection: {
                host: config.host,
                user: config.dbaccount,
                password: config.dbpassword,
                database: config.dbname,
            },
            dumpToFile: `${process.cwd()}/db_backup/${time}.sql`,
        });
        console.log(`BackUP Done(${time}.sql)\n`)
        console.log(`Next Time BackUp : ${today.getFullYear()}/${padStart(month)}/${padStart(date)}  ${padStart(hour+1)}:${padStart(min)}\n`);
}
function padStart(num){
    return num < 10 ? '0' + num : num
}