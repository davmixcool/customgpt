const { body_request, url_request } =  require("./request");

const base_url = "http://localhost:3000/";

const CustomGPTResponse = function(response) {
	this.err = response[0];
	this.response = response[1];
}

const CustomGPT = function({ host=base_url, key=null } = {}) {
  this.host = host;
  this.apiKey = key;
}

CustomGPT.prototype.create_collection = async function(name) {
	let url = `${this.host}v1/collection/create`;
	return new CustomGPTResponse(await body_request(url,{ name: name },this.apiKey,'POST'));
}

CustomGPT.prototype.delete_collection = async function(id) {
	let url = `${this.host}v1/collection/delete?collection_id=${id}`;
	return new CustomGPTResponse(await body_request(url,null,this.apiKey,'DELETE'));
}

CustomGPT.prototype.start_training = async function(payload) {
	let url = `${this.host}v1/document/create`;
	return new CustomGPTResponse(await body_request(url,payload,this.apiKey,'POST'));
}

CustomGPT.prototype.update_training = async function(payload) {
	let url = `${this.host}v1/document/update`;
	return new CustomGPTResponse(await body_request(url,payload,this.apiKey,'PUT'));
}

CustomGPT.prototype.get_training = async function(id) {
	let url = `${this.host}v1/document/fetch?document_id=${id}`;
	return new CustomGPTResponse(await url_request(url,null,this.apiKey));
}

CustomGPT.prototype.delete_training = async function(id) {
	let url = `${this.host}v1/document/delete?document_id=${id}`;
	return new CustomGPTResponse(await body_request(url,null,this.apiKey,'DELETE'));
}

CustomGPT.prototype.search = async function(payload) {
	let url = `${this.host}v1/collection/search`;
	return new CustomGPTResponse(await body_request(url,payload,this.apiKey,'POST'));
}

CustomGPT.prototype.chat = async function(payload) {
	let url = `${this.host}v1/collection/chat`;
	return new CustomGPTResponse(await body_request(url,payload,this.apiKey,'POST'));
}

module.exports = { 
    CustomGPT
}