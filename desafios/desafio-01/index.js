const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

function checkIdExists(req, res, next) {
  var achou = false;
  projects.some(function (element, index){
    if (element.id == req.params.id){
      achou = true;
      req.indice = index;
      return true;
    }
  });

  if (!achou){
    return res.status(400).json({error: 'Id does not exists'});
  }
  
  return next();
};

server.use((req, res, next) => {

  console.count('Número de requisições');

  next();
});

server.post('/projects', (req, res) => {

  const project = {
    id: req.body.id, 
    title: req.body.title, 
    tasks: req.body.tasks,
  }

  projects.push(project);

  return res.json(projects);
});

server.get('/projects', (req, res) => {

  return res.json(projects);
});

server.put('/projects/:id', checkIdExists, (req, res) => {

  projects[req.indice].title = req.body.title;

  return res.json(projects);
});

server.delete('/projects/:id', checkIdExists, (req, res) => {

  projects.splice(req.indice, 1);
  
  return res.send();
});

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
  const task = req.body.title;

  projects[req.indice].tasks.push(task);

  return res.json(projects);
})

server.listen(3000);