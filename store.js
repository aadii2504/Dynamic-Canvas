const store = {
  todos: [
    {
      id: "1",
      title: "Complete Task A",
      completed: false,
    },
    {
      id: "2",
      title: "Read Book",
      completed: true,
    },
    {
      id: "3",
      title: "Complete Project",
      completed: true,
    },
  ],
};

const storeHandler = {
  get(tragert, property) {
    console.log("ohh you are trying to access ", property);

    return tragert[property];
  },
  set(target, property, value) {
    console.log("ohh you are trying to set ", property);
    target[property] = value;
    if (property == "todos") {
      window.dispatchEvent(new Event("todoschange"));
    }
    localStorage.setItem("store", JSON.stringify(store));
    return true;
  },
};

const storeProxy = new Proxy(store, storeHandler);

function addTodo(newTodo) {
  storeProxy.todos = [...storeProxy.todos, newTodo];
}

function deleteTodo(id) {
  storeProxy.todos = storeProxy.todos.filter((todo) => todo.id !== id);
}

function toggleCompleted(id, completed) {
  storeProxy.todos = storeProxy.todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: completed };
    } else {
      return todo;
    }
  });
}

export { addTodo, deleteTodo, toggleCompleted };

export default storeProxy;
