let taskList = [];

const addTask = (text) => {
  taskList.push(text);
};

const getMyTasks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(taskList);
    }, 1000);
  });
};

module.exports = { taskList, addTask, getMyTasks };
