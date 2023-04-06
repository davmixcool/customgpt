# CustomGPT

CustomGPT client library for nodejs. You need the customgpt service running to use this library. You can reach out to me privately at (hello@davidoti.com) to purchase a licence.

## Features
* Train CustomGPT with your data
* Supports Clip vision (Can detect image links in your content)

## Install

`npm install @davmixcool/customgpt`


## Quick Start

Use it in your project:

```javascript
const { CustomGPT } = require("@davmixcool/customgpt")

const customgpt = new CustomGPT("http://localhost:3000/");
```

## Train CustomGPT with your data

Here is a basic example that trains CustomGPT with your data. It assumes the CustomGPT service is running at localhost:3000. 

We create a collection to segment our data

```javascript

//Supply the collection name to be created
let collection = await customgpt.create_collection("articles");
if (collection.err) {
    console.error(collection.err);
} else {
    console.log(collection.response);
    // {
    // "id": "aaff97d6-e9a5-11ec-91ba-d954177814f8"
    // }
}

```

Next we train customGPT with our data.


```javascript

let payload = {
    collection_id: "aaff97d6-e9a5-11ec-91ba-d954177814f8",
    content: `My quest for a good SEO meta tag implementation in Laravel drove me tech mad to write a package that will add standard SEO meta tags to my application with ease. However, I had to go the extra mile to research important meta tags and the role they play when it comes to SEO and how they can be used to improve SEO, So literally I had to do most of the heavy lifting. Lets quickly take a detour to what meta tags are and how they can improve SEO before we unveil the package.`,
    tags: ['SEO'] //An array of tags used to categorise the document
}
let training = await customgpt.start_training(payload);
if (training.err) {
    console.error(training.err);
} else {
    console.log(training.response);
    //A document id is returned used to update and manange training
    //
    // {
    // "id": "c26b16b4-d394-11ed-b5a3-33d8a09a24e3"
    // }
}

```

We can also update a training with it's document id

```javascript

let payload = {
    document_id: "c26b16b4-d394-11ed-b5a3-33d8a09a24e3",
    content: `My quest for a good SEO meta tag implementation in Laravel drove me tech mad to write a package that will add standard SEO meta tags to my application with ease. However, I had to go the extra mile to research important meta tags and the role they play when it comes to SEO and how they can be used to improve SEO, So literally I had to do most of the heavy lifting. Lets quickly take a detour to what meta tags are and how they can improve SEO before we unveil the package. Why do meta tags matter? As previously mentioned, meta tags offer more details about your site to search engines and website visitors who encounter your site in the SERP. They can be optimized to highlight the most important elements of your content and make your website stand out in search results. Search engines increasingly value good user experience, and that includes making sure that your site satisfies a user’s query as best as it possibly can. Meta tags help with this by making sure that the information searchers need to know about your site is displayed upfront in a concise and useful fashion.`,
    tags: ['SEO',"Meta"] //An array of tags used to categorise the document
}
let training = await customgpt.update_training(payload);
if (training.err) {
    console.error(training.err);
} else {
    console.log(training.response);
    // {
    // "id": "c26b16b4-d394-11ed-b5a3-33d8a09a24e3"
    // }
}

```


We can then chat with our trained data


```javascript

let payload = {
    collection_id: "aaff97d6-e9a5-11ec-91ba-d954177814f8",//The collection to chat
    message: "What are meta tags?", //The chat message
    document_ids: ["c26b16b4-d394-11ed-b5a3-33d8a09a24e3"], //An optional array of document ids to chat. Will chat the whole collection if not provided
    tags: ["SEO"], //An optional array of tags to filter by
    top: 10, //The number of vector embeddings used to form a context. A lower number between 5 - 10 gives a more specific answer. Defaults to 5.
    instruction: "You are an AI assistant, a creative business assistant that completes requests and always formats his responses in HTML. You are my friendly business AI assistant that is very informative & creative and can provide advice or complete creative tasks that I request. You use the information in the knowledge base as context if relevant. When you respond to me, your answer must be formatted in HTML so it is easier to read with paragraph tags, line breaks, heading and bold for titles, and use lists or tables when applicable." //An instruction to tell the AI how to reply
}
let chat = await customgpt.chat(payload);
if (chat.err) {
    console.error(chat.err);
} else {
    console.log(chat.response);
    // {
    //     "reply": "The reply goes here.",
    //     "meta": [
    //         {
    //             "document_id": "c26b16b4-d394-11ed-b5a3-33d8a09a24e3",
    //             "tags": [
    //                 "SEO",
    //                 "Meta"
    //             ]
    //         }
    //     ],
    //     "usage": {
    //         "prompt_tokens": 763,
    //         "completion_tokens": 86,
    //         "total_tokens": 849
    //     }
    // }
}

```


## Delete a Collection

```javascript

//Supply the collection id to delete
let collection = await customgpt.delete_collection("aaff97d6-e9a5-11ec-91ba-d954177814f8");

if (collection.err) {
    console.error(collection.err);
} else {
    console.log(collection.response);
    // {
    // "message": "Deleted succcessfully"
    // }
}

```


## Delete a Training

```javascript

//Supply the document id to delete
let training = await customgpt.delete_training("c26b16b4-d394-11ed-b5a3-33d8a09a24e3");

if (training.err) {
    console.error(training.err);
} else {
    console.log(training.response);
    // {
    // "message": "Deleted succcessfully"
    // }
}

```


## Conventions

All methods must be awaited, and return a CustomGPTResponse object - which only has two properties: `err` and `response`.

Always check for presence of `err`.  If `err` is not null, then the response might not be valid.


## Methods

With a customgpt object, just await one of the following methods to interact with the CustomGPT serivce:


### `create_collection(collection_name)`

Creates a new collection with `collection_name`


### `chat(payload)`

Chat your trained data with a `payload`

```js
let payload = {
    collection_id: "",//The collection to chat
    message: "", //The chat message
    document_ids: [""], //An optional array of document ids to chat. Will chat the whole collection if not provided
    tags: [""], //An optional array of tags to filter by
    top: 10, //The number of top vector embeddings used to form a context. A lower number between 5 - 10 gives a more specific answer. Defaults to 5.
    instruction: "" //An instruction to tell the AI how to reply
}
```


### `search(payload)`

Search your trained data with a `payload`

```js
let payload = {
    collection_id: "",//The collection to search
    keyword: "", //The search keywords
    document_ids: [""], //An optional array of document ids to search. Will search the whole collection if not provided
    tags: [""], //An optional array of tags to filter by
    top: 20, //The number of top vector embeddings to return.
}
```


### `delete_collection(collection_id)`

Deletes a collection and all its trained data with the `collection_id`


### `start_training(payload)`

Trains CustomGPT with your data

```js
let payload = {
    collection_id: "",//The collection to create the document in
    content: "", //The content to train CustomGPT on
    tags: [""], //An optional array of tags used to categorise your document source
}
```

### `update_training(payload)`

Updates training source

```js
let payload = {
    document_id: "",//The document source to update
    content: "", //The content to train CustomGPT on
    tags: [""], //An optional array of tags used to categorise your document source
}
```


### `get_training(document_id)`

Gets the embeddings of a training with the `document_id`



### `delete_training(document_id)`

Deletes a training with the `document_id`


### Maintainers

This package is maintained by [David Oti](http://github.com/davmixcool)!


### License

This package is licensed under the [Apache license](https://github.com/davmixcool/customgpt/blob/master/LICENSE).
