it("should respond with DAMN!", function(done) {
	request("http://localhost:9000/translate?damn+you", function(error, response, body) {
		expect(body).toEqual("DAMN!+you");
		done();
	}); 
});