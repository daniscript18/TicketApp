const fs = require("fs");
const FileScanner = require("node-recursive-directory");

module.exports = async (Client, Path) =>
{
    const ScannedFiles = await FileScanner(`${Path}/Events`);
    ScannedFiles.forEach(File =>
    {
        if(fs.statSync(File).isDirectory()) return;
        const Event = require(File);
        Client.Events.set(Event.Name, Event);

        if(Event.Custom) Event.run(Client, Path);
        else
        {
            if(Event.Once) Client.once(Event.Name, (...args) => Event.run(...args, Client, Path));
            else Client.on(Event.Name, (...args) => Event.run(...args, Client, Path));
        }
    });
}