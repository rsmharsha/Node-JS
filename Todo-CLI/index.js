const { program } = require("commander");
const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "todos.json");


function loadTodos() {
  // check if file exists
  if (fs.existsSync(DATA_FILE) === true) {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } else {
    return [];
  }
}

function saveTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), "utf8");
}

function genId(todos) {
  let id;
  do {
    id = Math.floor(100 + Math.random() * 900); // 100–999
  } while (todos.some(t => t.id === id));
  return id;
}

program
  .command("list")
  .description("List all todos")
  .action(() => {
    const todos = loadTodos();
    if (!todos.length) return console.log("No todos yet.");
    todos.forEach(t =>
      console.log(`${t.id} [${t.done ? "x" : " "}] ${t.text}`)
    );
  });

program
  .command("add <text...>")
  .description("Add a new todo")
  .action((textParts) => {
    const todos = loadTodos();
    const todo = {
      id: genId(todos),
      text: textParts.join(" "),
      done: false,
    };
    todos.push(todo);
    saveTodos(todos);
    console.log(`Added: ${todo.id} "${todo.text}"`);
  });

program
  .command("done <id>")
  .description("Mark todo as done")
  .action((id) => {
    const todos = loadTodos();
    const todo = todos.find(t => t.id == id);
    if (!todo) return console.log("Todo not found.");
    todo.done = true;
    saveTodos(todos);
    console.log(`Marked ${id} done.`);
  });

program
  .command("rm <id>")
  .description("Remove a todo")
  .action((id) => {
    let todos = loadTodos();
    const newTodos = todos.filter(t => t.id != id);
    if (todos.length === newTodos.length) return console.log("Todo not found.");
    saveTodos(newTodos);
    console.log(`Removed ${id}.`);
  });


program.parse(process.argv);

