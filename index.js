const prompt = require("prompt");
var fs = require("fs");
const { exec } = require("child_process");
async function question(input) {
  prompt.start();
  return new Promise((res, rej) => {
    prompt.get([input], function (err, result) {
      if (err || result === null) {
        return rej(err);
      } else res(result[input]);
    });
  });
}

async function execcmd(input) {
  return new Promise((res, rej) => {
    exec(input, (error, stdout, stderr) => {
      if (error) {
        return rej(error);
      }
      if (stderr) {
        return rej(stderr);
      }
      res(stdout);
    });
  });
}

async function options(arr) {
  let arr2 = [];
  arr.forEach((z, idx) => arr2.push({ id: idx + 1, listing: z }));
  arr2.forEach((item, i) => {
    console.log(item.id + ": " + item.listing);
  });
  let name = await question("selection?");
  name = parseInt(name);
  name = name - 1;
  return arr[name];
}

async function main() {
  let awsprofiles = fs.readFileSync("/home/mithun/.aws/config", {
    encoding: "utf8",
  });
  console.log("Select the AWS profile");
  awsprofiles = awsprofiles
    .split("\n")
    .filter((z) => z.indexOf("[") > -1)
    .map(
      (z) => (z = z.replace("[", "").replace("]", "").replace("profile ", ""))
    );
  let opt = await options(awsprofiles);

  let test = JSON.parse(
    await execcmd("aws lambda list-functions --profile " + opt)
  );
  test = test.Functions.map((z) => (z = z.FunctionName));

  console.log("Select the lambda");
  let lambdachoice = await options(test);
  let whattodo = await options([
    "Get lambda into this dir",
    "Send this dir into a lambda",
  ]);
  if (whattodo === "Get lambda into this dir") {
    let c = JSON.parse(await execcmd("aws lambda get-function --profile " + opt +" --function-name "+lambdachoice)).Code.Location
    // console.log(c)
    try {

      let w = await execcmd("wget \""+c+"\" -O lambda.zip; unzip lambda.zip; rm lambda.zip;")
    } catch (e) {}
    console.log("Done")
  } else if (whattodo === "Send this dir into a lambda") {
    try {

      let w = await execcmd("zip -r lambda.zip *; aws lambda update-function-code --profile " + opt +" --function-name "+lambdachoice+ " --zip-file fileb://lambda.zip; rm lambda.zip")
    } catch (e) {}
    console.log("Done")
  }

  // let wd = process.cwd();
  // console.log(wd);
}
main();
// fs.readFileSync( path, options )
// prompt.get(["username"], function (err, result) {
//   if (err) {
//     return onErr(err);
//   }
//   console.log("Command-line input received:");
//   console.log("  Username: " + result.username);
//   console.log("  Email: " + result.email);
// });
