window.onload = function() {

  // Network with 3 inputs, 3 hidden nodes and 2 outputs
  let network = new Network(3, 3, 2, 0.5);

  let selection; // Holds value of selected font
  let prediction; // Holds value of predicted font

  let inputs; // Holds value of input font
  let targets; // Holds value of target for training

  let bg = document.getElementById('bg'); // The background div

  let roboto= document.getElementById("fh");
  let montserrat = document.getElementById("sh");
  let label_montserrat = document.getElementById('selected2'); // Label for montserrat
  let label_roboto= document.getElementById('selected'); // Label for roboto

  bg.addEventListener('click', function() {

    // On click select random R,G and B values
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    // Change background to random color
    bg.style.backgroundColor =  'rgb(' + r + ',' + g + ',' + b + ')';

    // Display font labels based on selection
    let prediction = fontPredictor(r,g,b);

    network.train(inputs, targets);

    // Change label position based on prediction
    if (prediction == "roboto") {
        label_roboto.style.display = "block";
        label_montserrat.style.display = "none";
      } else if(prediction == "montserrat") {
        label_roboto.style.display = "none";
        label_montserrat.style.display = "block";
    }

  });

  roboto.addEventListener('click', function() {
    selection = "roboto"; // Change selection to roboto
    targets = [1,0]; // Sets target for learning
    bg.click(); // Simulate click to fire click event for background
  });

  montserrat.addEventListener('click', function() {
    selection = "montserrat"; // Change selection to roboto
    targets = [0,1]; // Sets target for learning
    bg.click(); // Simulate click to fire click event for background
  });


  function fontPredictor (r, g, b) {
    inputs = [r/255,g/255,b/255]; // Change inputs to network
    let outputs = network.feedforward(inputs); // Get outputs
    console.log(outputs);

    // Returning font based on probability
    if(outputs[0] > outputs[1]) {
      return "roboto";
    } else {
      return "montserrat";
    }
  }




}
