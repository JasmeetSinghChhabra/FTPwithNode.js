const FtpSrv = require("ftp-srv");
const host = "0.0.0.0";
const port = 4000;
const ftpServer = new FtpSrv({
  url: "ftp://" + host + ":" + port,
  //tls: true,
});

ftpServer.on("login", (data, resolve, reject) => {
  if (data.username == "test" && data.password == "test123") {
    console.log("Connected");
    data.connection.on("STOR", (error, fileName) => {
      if (error) {
        console.error(
          `FTP server error: could not receive file ${fileName} for upload ${error}`
        );
      }
      console.info(`FTP server: upload successfully received - ${fileName}`);
    });
    data.connection.on("RETR", (error, fileName) => {
      if (error) {
        console.error(
          `FTP server error: could not get file ${fileName} for download ${error}`
        );
      }
      console.info(`FTP server: file successfully downloaded - ${fileName}`);
    });
    data.connection.on("RNTO", (error, fileName) => {
      if (error) {
        console.error(
          `FTP server error: could not get file ${fileName} for rename ${error}`
        );
      }
      console.info(`FTP server: upload successfully renamed - ${fileName}`);
    });
  } else {
    reject(
      new Error(
        "Unable to authenticate with FTP server: bad username or password"
      )
    );
  }
  resolve({ root: "files/" });
});
ftpServer.on("client-error", ({ context, error }) => {
  console.error(
    `FTP server error: error interfacing with client ${context} ${error} on ftp://${host}:${port} ${JSON.stringify(
      error
    )}`
  );
});

ftpServer.listen().then(() => {
  console.log("FTP Server Listening on : " + "ftps://" + host + ":" + port);
});
