const express = require('express');
const summarizeText = require('./summarize.js');

const app = express();
const port = 3000;

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static('public'));

// "/summarize"that will accept post reqest that contain a "text" to summarize

app.post('/summarize',(req,res)=>{
  // console.log(req.body);
  //get the text
   const text = req.body.text_to_summarize;
  // function call
  summarizeText(text) 
    .then(response => {
      // Send the summary text back to the client
       res.send(response); 
    })
    .catch(error => {
      console.log(error.message);
    });
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
