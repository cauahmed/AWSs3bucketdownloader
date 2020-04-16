//aws-sdk mock test
//All files downloaded with their content set as "mock response"

var AWSMock = require("aws-sdk-mock");
AWS = require("aws-sdk");
var tools = require("./downloads3final");
var assert = require("assert");
AWSMock.setSDKInstance(AWS);
AWSMock.mock("S3", "getObject", { Body: "mock response" }); //get object called on s3 bucket and a mock is created 

tools.main();