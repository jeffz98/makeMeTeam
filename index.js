// included packages needed
const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');
var team = [];


// created an array of questions to prompt user
async function managerQuestions () {
  inquirer.prompt(
 [{
    type: 'input',
    message: "What is the team manager's name?",
    name: 'name',
  },
  {
    type: 'input',
    message: "What is the team manager's id",
    name: 'id',
  },
  {
    type: 'input',
    message: "What is the team manager's email?",
    name: 'email',
  },
  {
    type: 'input',
    message: "What is the team manager's office number?",
    name: 'officeNum',
  },
  {
    type: 'list',
    message: 'Which type of team member would you like to add?',
    name: 'teamType',
    choices: ['Intern', 'Engineer', "I don't want to add any more team members"]
  },
  ]
  ).then((managerAnswers) => {
    const manager = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNum);
    team.push(manager);
    
    if (managerAnswers.teamType === 'Intern') {
      await internQuestions();
    } else if (managerAnswers.teamType === 'Engineer'){
      await engineerQuestions();
    } else {
      buildTeam();
    }
    

  }
  ) 
}

function internQuestions () {
  inquirer.prompt( [ 
    {
      type: 'input',
      message: "What is the intern's name?",
      name: 'name',
    },
    {
      type: 'input',
      message: "What is the intern's id",
      name: 'id',
    },
    {
      type: 'input',
      message: "What is the intern's email?",
      name: 'email',
    },
    {
      type: 'input',
      message: "What is the intern's school?",
      name: 'school',
    },
    {
      type: 'list',
      message: 'Which type of team member would you like to add?',
      name: 'teamType',
      choices: ['Intern', 'Engineer', "I don't want to add any more team members"]
    },
]).then((internAnswers) => {
  const intern = new Intern(internAnswers.name, internAnswers.id, internAnswers.email, internAnswers.school);
  team.push(intern);
  
  if (internAnswers.teamType === 'Intern') {
    internQuestions();
  } else if (internAnswers.teamType === 'Engineer'){
    engineerQuestions();
  } else {
    buildTeam();
  }
  

})
}

function engineerQuestions () {
  inquirer.prompt( [
    {
      type: 'input',
      message: "What is the engineer's name?",
      name: 'name',
    },
    {
      type: 'input',
      message: "What is the engineer's id",
      name: 'id',
    },
    {
      type: 'input',
      message: "What is the engineer's email?",
      name: 'email',
    }, 
    {
      type: 'input',
      message: "What is your engineer's Github username?",
      name: 'githubName',
    },
    {
      type: 'list',
      message: 'Which type of team member would you like to add?',
      name: 'teamType',
      choices: ['Intern', 'Engineer', "I don't want to add any more team members"]
    },
]).then((engineerAnswers) => {
  const engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.githubName);
  team.push(engineer);
  if (engineerAnswers.teamType === 'Intern') {
    internQuestions();
  } else if (engineerAnswers.teamType === 'Engineer'){
    engineerQuestions();
  } else {
    buildTeam();
  }
  

})
}

// function that writes index file
function buildTeam () {
  for (var i = 0; i < team.length; i++) {
    var employee = team[i];
    console.log(employee)
    var lastPropVal = Object.values(employee).pop();
    var lastPropKey = Object.keys(employee).pop();
    // var lastPropVal = lastProp[3]
    // console.log(lastProp)
    var str;
    if (lastPropKey === 'officeNumber') {
      str = "Office number: " + lastPropVal;
    } else if (lastPropKey === 'school') {
      str = "School: " + lastPropVal;
    } else if (lastPropKey === 'github') {
      str = "Github: " + lastPropVal;
    }
   fs.writeFile('./dist/index.html', 
  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Team</title>
  </head>
  <body>
      <h1>My Team</h1>
      <div id = 'team'>
      
      <div class = 'card'>
            <section>
                <h3>${employee.name}</h3>
                <h4>${employee.getRole()} </h4>
            </section>
            <section>
                <p>ID: ${employee.id}</p>
                <p>Email: ${employee.email}</p>
                <p>${str}</p>
            </section>
        </div>
      
      </div>
  
  <script src='../index.js'></script>
  </body>
  </html>
  `, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Success!")
    }
  })
  // await printCards()
  
}

function printCards() {
  // await buildTeam()
  // console.log("hi")
  
    
    
    
    
  }

} 



function init() {
  // used inquirer to prompt the user to answer 
  managerQuestions();
  // writing to file previously written markdown"
  
     
}




init();
printCards();
