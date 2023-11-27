const textArea = document.getElementById("text_to_summarize");

const submitButton = document.getElementById("submit-button");

const summarizedTextArea = document.getElementById("summary");


submitButton.disabled = true;

function verifyTextLength(e) {
const textarea = e.target;
//check the length of the text in the input textarea is between 200 and 100,000 characters. Anything shorter than 200 characters is difficult to make a summary of, and longer than 100,000 is too big for the summarization model to handle.
  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    // we enable the submit button.
    submitButton.disabled = false;
  } else {
    // If it is not,
    submitButton.disabled = true;
  }
}

// function to get summarized text
function submitData(e) {

  // This is used to add animation to the submit button
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };


/* just use a relative path to “/summarize” because we will be calling the API from our Replit! */
  
  fetch('/summarize', requestOptions)
    .then(response => response.text()) 
    .then(summary => {
      summarizedTextArea.value = summary;
      submitButton.classList.remove("submit-button--loading");

    })
    .catch(error => {
      console.log(error.message);
    });
}


textArea.addEventListener("input", verifyTextLength);

submitButton.addEventListener("click", submitData);