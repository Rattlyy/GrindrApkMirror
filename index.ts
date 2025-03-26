import express from "express";
import fetch from "node-fetch";
import { existsSync, createWriteStream } from "fs";
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

  if (existsSync(`./cache/${ver}.apkx`)) {
    res.download(`./cache/${ver}.apkx`);
    return;
  } else {
    const fetchResponse = await fetch(await getFinalDownloadUrl(finalDlUrl));
    if (fetchResponse.body === null) {
      res.status(404).send("Not found");
      return;
    }

    fetchResponse.body.pipe(createWriteStream(`./cache/${ver}.apkx`));
    res.download(`./cache/${ver}.apkx`);
  }
});

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});
