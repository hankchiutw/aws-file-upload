'use strict';

/**
 * Dependencies
 */

const config = require("config/config.js");

const request = require("lib/_supertest");
const HOST_API_URL = config.publicApiUrl+'/';

describe("File", function(){
    it("should upload a file and create db record", create);
});

/////////

function create(done){
    this.timeout(10000);
    var mock = {
    };
    request(HOST_API_URL, "post", "file", mock, done)
}

