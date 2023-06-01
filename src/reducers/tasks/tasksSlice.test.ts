import { v1 } from "uuid";
import { tasksReducer, tasksThunks, TasksType } from "./tasksSlice";
import { todolistThunks, TodoListType } from "../todolist/todolistSlice";
import { TaskStatuses } from "../../api/api";

const todoListId1 = v1();
const todoListId2 = v1();
const taskId = v1();

let tasks: TasksType = {};

beforeEach(() => {
  tasks = {
    [todoListId1]: [
      {
        id: "1",
        title: "HTML&CSS",
        completed: true,
        status: 1,
        todoListId: todoListId1,
        deadline: "",
        description: "",
        priority: 0,
        order: 2,
        startDate: "",
        addedDate: "",
      },
      {
        id: v1(),
        title: "JS",
        completed: true,
        status: 1,
        todoListId: todoListId1,
        deadline: "",
        description: "",
        priority: 0,
        order: 2,
        startDate: "",
        addedDate: "",
      },
      {
        id: v1(),
        title: "ReactJS",
        completed: false,
        status: 1,
        todoListId: todoListId1,
        deadline: "",
        description: "",
        priority: 0,
        order: 2,
        startDate: "",
        addedDate: "",
      },
      {
        id: v1(),
        title: "Rest API",
        completed: false,
        status: 1,
        todoListId: todoListId1,
        deadline: "",
        description: "",
        priority: 0,
        order: 2,
        startDate: "",
        addedDate: "",
      },
      {
        id: v1(),
        title: "GraphQL",
        completed: false,
        status: 1,
        todoListId: todoListId1,
        deadline: "",
        description: "",
        priority: 0,
        order: 2,
        startDate: "",
        addedDate: "",
      },
    ],
    [todoListId2]: [
      {
        id: v1(),
        title: "Milk",
        completed: true,
        status: 1,
        todoListId: todoListId1,
        deadline: "",
        description: "",
        priority: 0,
        order: 2,
        startDate: "",
        addedDate: "",
      },
      {
        id: v1(),
        title: "Bred",
        completed: false,
        status: 1,
        todoListId: todoListId1,
        deadline: "",
        description: "",
        priority: 0,
        order: 2,
        startDate: "",
        addedDate: "",
      },
    ],
  };
});

test("task should be removed from tasks", () => {
  const taskId = tasks[todoListId1][0].id;

  const action = tasksThunks.deleteTask.fulfilled(
    { taskID: taskId, todolistID: todoListId1 },
    "requestId",
    { taskID: taskId, todolistID: todoListId1 }
  );

  const newTasks = tasksReducer(tasks, action);

  expect(newTasks[todoListId1].length).toBe(4);
  expect(newTasks[todoListId1][0].title).toBe("JS");
});

test("task should be added to todolist", () => {
  const taskID = v1();

  const newTask = {
    id: taskID,
    title: "new task",
    completed: false,
    todoListId: todoListId1,
    status: 1,
    startDate: "",
    order: 0,
    priority: 0,
    description: "",
    deadline: "",
    addedDate: "",
  };

  const action = tasksThunks.addTask.fulfilled(
    {
      task: newTask,
    },
    "requestId",
    { todolistID: todoListId1, taskTitle: "new task" }
  );

  const newTasks = tasksReducer(tasks, action);

  expect(newTasks[todoListId1].length).toBe(6);
  expect(newTasks[todoListId1][0].title).toBe("new task");
});

test("checked value should be changed to opposite", () => {
  const args = {
    todolistID: todoListId1,
    taskID: "1",
    taskModel: { status: TaskStatuses.New },
  };
  const action = tasksThunks.editTask.fulfilled(args, "requestId", args);

  const newTasks = tasksReducer(tasks, action);

  expect(newTasks[todoListId1].length).toBe(5);
  expect(newTasks[todoListId1][0].status).toBe(TaskStatuses.New);
});

test("title value of task should be edited", () => {
  const taskId = tasks[todoListId1][1].id;
  const args = {
    todolistID: todoListId1,
    taskID: taskId,
    taskModel: { title: "new title" },
  };
  const action = tasksThunks.editTask.fulfilled(args, "requestId", args);

  const newTasks = tasksReducer(tasks, action);

  expect(newTasks[todoListId1][1].title).toBe("new title");
  expect(newTasks[todoListId1].length).toBe(5);
});

test("todolist should be removed", () => {
  const action = todolistThunks.removeTodolist.fulfilled(
    { todolistID: todoListId2 },
    "requestId",
    { todolistID: todoListId2 }
  );

  const newTasks = tasksReducer(tasks, action);

  expect(newTasks[todoListId2]).toBeUndefined();
  expect(newTasks[todoListId1].length).toBe(5);
});

test("todolist should be added", () => {
  const newTodolist: TodoListType = {
    id: v1(),
    title: "new todolist",
    filter: "all",
    order: 0,
    addedDate: "",
    entityStatus: "idle",
  };

  const action = todolistThunks.createTodolist.fulfilled(
    { todolist: newTodolist },
    "requestId",
    todoListId1
  );

  const newTasks = tasksReducer(tasks, action);

  const keys = Object.keys(newTasks);
  const newKey = keys.find(
    (item) => item !== todoListId1 && item !== todoListId2
  );
  if (!newKey) throw Error("new key should be added");

  expect(newTasks[newKey]).toEqual([]);
});

test("get tasks", () => {
  const tasks1 = [
    {
      id: v1(),
      title: "Milk",
      completed: true,
      status: 1,
      todoListId: todoListId1,
      deadline: "",
      description: "",
      priority: 0,
      order: 2,
      startDate: "",
      addedDate: "",
    },
  ];

  const action = tasksThunks.fetchTasks.fulfilled(
    { tasks: tasks1, todolistID: todoListId1 },
    "requestId",
    todoListId1
  );
  const newTasks: TasksType = tasksReducer(tasks, action);

  expect(newTasks[todoListId1].length).toBe(1);
  expect(newTasks[todoListId1][0].title).toBe("Milk");
});

test("empty arrays should be added when we set todolists", () => {
  const todolists = [
    {
      id: todoListId1,
      title: "string",
      addedDate: "string",
      order: 1,
    },
  ];

  const action = todolistThunks.getTodolists.fulfilled(
    { todolists },
    "requestId"
  );

  const newTasks: TasksType = tasksReducer(tasks, action);

  expect(newTasks[todoListId1]).toStrictEqual([]);
});

test("task should be edited", () => {
  const tasks: TasksType = {
    [todoListId1]: [
      {
        id: taskId,
        title: "Milk",
        completed: true,
        status: 1,
        todoListId: todoListId1,
        deadline: "",
        description: "",
        priority: 0,
        order: 2,
        startDate: "",
        addedDate: "",
      },
    ],
  };

  const args = {
    todolistID: todoListId1,
    taskID: taskId,
    taskModel: { title: "hello" },
  };
  const action = tasksThunks.editTask.fulfilled(args, "requestId", args);

  const newTasks: TasksType = tasksReducer(tasks, action);

  expect(newTasks[todoListId1][0].title).toBe("hello");
  expect(newTasks[todoListId1].length).toBe(1);
});
