const { body_request, url_request } =  require("./request");

const base_url = "http://localhost:3000/";

const CustomGPTResponse = function(response) {
	this.err = response[0];
	this.response = response[1];
}

const CustomGPT = function(url){
	this.url = url||base_url;
};


CustomGPT.prototype.create_collection = async function (name) {
	let url = `${this.url}v1/collection/create`;
	return new CustomGPTResponse(await body_request(url,{ name: name },'POST'));
}


CustomGPT.prototype.search_collection = async function (payload) {
	let url = `${this.url}v1/collection/search`;
	return new CustomGPTResponse(await body_request(url,payload,'POST'));
}


CustomGPT.prototype.chat_collection = async function (payload) {
	let url = `${this.url}v1/collection/chat`;
	return new CustomGPTResponse(await body_request(url,payload,'POST'));
}


CustomGPT.prototype.delete_collection = async function (id) {
	let url = `${this.url}v1/collection/delete?collection_id=${id}`;
	return new CustomGPTResponse(await body_request(url,null,'DELETE'));
}


CustomGPT.prototype.create_document = async function (payload) {
	let url = `${this.url}v1/document/create`;
	return new CustomGPTResponse(await body_request(url,payload,'POST'));
}


CustomGPT.prototype.update_document = async function (payload) {
	let url = `${this.url}v1/document/update`;
	return new CustomGPTResponse(await body_request(url,payload,'PUT'));
}


CustomGPT.prototype.get_document = async function (id) {
	let url = `${this.url}v1/document/fetch?document_id=${id}`;
	return new CustomGPTResponse(await url_request(url));
}


CustomGPT.prototype.delete_document = async function (id) {
	let url = `${this.url}v1/document/delete?document_id=${id}`;
	return new CustomGPTResponse(await body_request(url,null,'DELETE'));
}


module.exports = { 
    CustomGPT
}