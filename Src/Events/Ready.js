module.exports =
{
    Name: "ready",
    Once: true,
    run: async (Client) =>
    {
        console.log(`${Client.user.username} is on!`);
    }
}