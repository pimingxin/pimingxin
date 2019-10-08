//2nd
// var http = require("http"), fs = require("fs");

// var methods = Object.create(null);

// http.createServer(function(request, response) {
//   function respond(code, body, type) {
//     if (!type) type = "text/plain";
//     response.writeHead(code, {"Content-Type": type});
//     if (body && body.pipe)
//       body.pipe(response);
//     else
//       response.end(body);
//   }
//   if (request.method in methods)
//     methods[request.method](urlToPath(request.url),
//                             respond, request);
//   else
//     respond(405, "Method " + request.method +
//             " not allowed.");
// }).listen(8000);

// function urlToPath(url) {
//   var path = require("url").parse(url).pathname;
//   return "." + decodeURIComponent(path);
// }

// methods.GET = function(path, respond) {
//   fs.stat(path, function(error, stats) {
//     if (error && error.code == "ENOENT")
//       respond(404, "File not found");
//     else if (error)
//       respond(500, error.toString());
//     else if (stats.isDirectory())
//       fs.readdir(path, function(error, files) {
//         if (error)
//           respond(500, error.toString());
//         else
//           respond(200, files.join("\n"));
//       });
//     else
//       respond(200, fs.createReadStream(path),
//               require("mime").lookup(path));
//   });
// };

// methods.DELETE = function(path, respond) {
//   fs.stat(path, function(error, stats) {
//     if (error && error.code == "ENOENT")
//       respond(204);
//     else if (error)
//       respond(500, error.toString());
//     else if (stats.isDirectory())
//       fs.rmdir(path, respondErrorOrNothing(respond));
//     else
//       fs.unlink(path, respondErrorOrNothing(respond));
//   });
// };

// function respondErrorOrNothing(respond) {
//   return function(error) {
//     if (error)
//       respond(500, error.toString());
//     else
//       respond(204);
//   };
// }

// methods.PUT = function(path, respond, request) {
//   var outStream = fs.createWriteStream(path);
//   outStream.on("error", function(error) {
//     respond(500, error.toString());
//   });
//   outStream.on("finish", function() {
//     respond(204);
//   });
//   request.pipe(outStream);
// };






//3th
const {createServer} = require("http");

const methods = Object.create(null);

createServer((request, response) => {
  let handler = methods[request.method] || notAllowed;
  handler(request)
    .catch(error => {
      if (error.status != null) return error;
      return {body: String(error), status: 500};
    })
    .then(({body, status = 200, type = "text/plain"}) => {
       response.writeHead(status, {
         "Content-Type": type,
         "Access-Control-Allow-Origin" : '*',
         "Access-Control-Allow-Methods" :'DELETE,MKCOL,PUT'
        });
       if (body && body.pipe) body.pipe(response);
       else response.end(body);
    });
}).listen(8000);

async function notAllowed(request) {
  return {
    status: 405,
    body: `
    Method ${request.method} not allowed.
    `
  };
}

var {parse} = require("url");
var {resolve, sep} = require("path");

var baseDirectory = process.cwd();

function urlPath(url) {
  let {pathname} = parse(url);
  let path = resolve(decodeURIComponent(pathname).slice(1));
  if (path != baseDirectory &&
      !path.startsWith(baseDirectory + sep)) {
    throw {status: 403, body: "Forbidden"};
  }
  return path;
}

const {createReadStream} = require("fs");
const {stat, readdir} = require("fs").promises;
const mime = require("mime");

methods.GET = async function(request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    else return {status: 404, body: "File not found"};
  }
  if (stats.isDirectory()) {
    return {body: (await readdir(path,{withFileTypes:true})).map(entry => {
      if (entry.isFile()){
        return entry.name
      }else{
        return entry.name + '/'
      }
    }).join("\n")};
  } else {
    return {body: createReadStream(path),
            type: mime.getType(path)};
  }
};

const {rmdir, unlink} = require("fs").promises;

methods.DELETE = async function(request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    else return {status: 204};
  }
  if (stats.isDirectory()) await rmdir(path);
  else await unlink(path);
  return {status: 204};
};

const {createWriteStream} = require("fs");

function pipeStream(from, to) {
  return new Promise((resolve, reject) => {
    from.on("error", reject);
    to.on("error", reject);
    to.on("finish", resolve);
    from.pipe(to);
  });
}

methods.PUT = async function(request) {
  let path = urlPath(request.url);
  await pipeStream(request, createWriteStream(path));
  return {status: 204};
};

const {mkdir} = require("fs").promises;

methods.MKCOL = async function(request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    await mkdir(path);
    return {status: 204};
  }
  if (stats.isDirectory()) return {status: 204};
  else return {status: 400, body: "Not a directory"};
};

methods.OPTIONS = async function(request){
  return {
    status:200,
  }
}