const FtpSrv = require("ftp-srv");
const ftpServer = new FtpSrv({});

ftpServer.on("login", (data, resolve, reject) => {
  if (data.username == "mulamail" && data.password == "mulamail123") {
    //If connected, add a handler to confirm file uploads
    data.connection.on("STOR", (error, fileName) => {
      if (error) {
        console.error(
          `FTP server error: could not receive file ${fileName} for upload ${error}`
        );
      }
      console.info(`FTP server: upload successfully received - ${fileName}`);
    });
  } else {
    reject(
      new Error(
        "Unable to authenticate with FTP server: bad username or password"
      )
    );
  }
  resolve();
});
ftpServer.on("client-error", ({ context, error }) => {
  console.error(
    `FTP server error: error interfacing with client ${context} ${error} on ftp://${host}:${port} ${JSON.stringify(
      error
    )}`
  );
});

ftpServer.listen().then(() => {
  console.log();
});
