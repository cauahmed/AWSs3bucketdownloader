var AWSMock = require("aws-sdk-mock");
AWS = require("aws-sdk");
var tools = require("./downloads3final");
var assert = require("assert");
AWSMock.setSDKInstance(AWS);
AWSMock.mock("S3", "getObject", { Body: "mock response" });

tools.main();