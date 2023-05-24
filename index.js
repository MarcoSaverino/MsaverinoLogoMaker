
const inquirer = require("inquirer");


const fs = require("fs");


const { Triangle, Square, Circle } = require("./lib/shapes");

// Function writes the SVG file using user answers from inquirer prompts
function writeToFile(fileName, answers) {

  let svgString = "";

  svgString =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';

  svgString += "<g>";

  svgString += `${answers.shape}`;
  
  // Conditional check takes users input from choices array and then adds polygon properties and shape color to SVG string
  let logoShape;
  if (answers.shape === "Triangle") {
    logoShape = new Triangle();
    svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
  } else if (answers.shape === "Square") {
    logoShape = new Square();
    svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeColor}"/>`;
  } else {
    logoShape = new Circle();
    svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeColor}"/>`;
  }


  svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;

  svgString += "</g>";

  svgString += "</svg>";


  fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}

// Here is where you are asked to pick the logo criteria
function promptUser() {
  inquirer
    .prompt([

      {
        type: "input",
        message:
          "Hey friend what do you want your logo name to be? (Enter up to three characters)",
        name: "text",
      },

      {
        type: "input",
        message:
          "Now pick a text color (Enter color keyword OR a hexadecimal number)",
        name: "textColor",
      },

      {
        type: "list",
        message: "What shape would you like the logo to be?",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
      },

      {
        type: "input",
        message:
          "Choose shapes color (Enter color keyword OR a hexadecimal number)",
        name: "shapeColor",
      },
    ])
    .then((answers) => {
      // Error Msg
      if (answers.text.length > 3) {
        console.log("Must enter a value of no more than 3 characters");
        promptUser();
      } else {

        writeToFile("logo.svg", answers);
      }
    });
}


promptUser();