var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        res.json([]);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {
        res.json([{ _id: '1234', __v: 0, text: 'an item' }]);
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        res.json([]);
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
