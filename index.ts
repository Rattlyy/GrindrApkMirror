import express from "express";
import fetch from "node-fetch";
import { getFinalDownloadUrl } from "./mirror-dl";
const app = express();

app.get("/download", async (req, res) => {
  const { ver } = req.query;

  let finalDlUrl = "";
  switch (ver) {
    case "25.3.0":
      finalDlUrl =
        "https://www.apkmirror.com/apk/grindr-llc/grindr-gay-chat-meet-date/grindr-gay-dating-chat-25-3-0-release/grindr-gay-dating-chat-25-3-0-android-apk-download/";
  }

  if (finalDlUrl === "") {
    res.status(404).send("Not found");
    return;
  }

  const fetchResponse = await fetch(await getFinalDownloadUrl(finalDlUrl));
  if (fetchResponse.body === null) {
    res.status(404).send("Not found");
    return;
  }

  res.status(200);
  res.header("Content-Type", "application/vnd.android.package-archive");
  res.header("Content-Disposition", "attachment; filename=grindr.apk");
  res.header("Content-Length", fetchResponse.headers.get("Content-Length") as string)

  fetchResponse.body.pipe(res);
});

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});
