import fs from "fs";
import {createServer} from "https";
import path from "path";
import {fileURLToPath, parse} from "url";

import next from "next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dev = process.env["NODE_ENV"] !== "production";
const hostname = "localhost";
const port = 3001;

const app = next({dev, hostname, port});
const handle = app.getRequestHandler();

const certPath = path.join(__dirname, "localhost-cert.pem");
const keyPath = path.join(__dirname, "localhost-key.pem");

if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
  console.error(
    "❌ SSL certificates not found!",
    "\nPlease run: mkcert -install && mkcert localhost",
    "\nThis will create localhost-cert.pem and localhost-key.pem in this directory",
  );
  process.exit(1);
}

const httpsOptions = {
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath),
};

app.prepare().then(() => {
  createServer(httpsOptions, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);

      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);

      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;

    console.log(`> Ready on https://${hostname}:${port}`);
  });
});
