module.exports =
{
    name: "ErrorReports",
    Custom: true,
    run: async () =>
    {
        process.on("unhandledRejection", error =>  console.log(error));
        process.on("uncaughtException", error =>  console.log(error));
    }
}