const axios = require('axios');

const saveChat = (token, chat) => {
  var config = {
    headers: { Authorization: 'bearer ' + token }
  };

  var bodyParameters = {
    ...chat
  };

  axios
    .post('http://localhost:3002/chats', bodyParameters, config)
    .then(response => {
      //console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = { saveChat };
