const URL = "http://localhost:3001/tasks";
const headers = {
  "Content-Type": "application/json",
};

const handleResponse = (res) => {
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
};

const serverAPI = {
  getAll: async (signal) => {
    return await fetch(URL, { signal }).then(handleResponse);
  },

  getById: async (id, signal) => {
    return fetch(`${URL}/${id}`, { signal }).then(handleResponse);
  },

  add: async (task, signal) => {
    return await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(task),
      signal,
    }).then(handleResponse);
  },

  delete: async (id, signal) => {
    const res = await fetch(`${URL}/${id}`, {
      method: "DELETE",
      signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  },

  deleteAll: async (tasks = [], signal) => {
    const results = await Promise.allSettled(
      tasks.map(async ({ id }) => {
        await serverAPI.delete(id, signal);
        return id;
      }),
    );

    const deletedIds = results
      .filter((r) => r.status === "fulfilled")
      .map((r) => r.value);

    const failedCount = results.length - deletedIds.length;

    return { deletedIds, failedCount };
  },

  toggleComplete: async (id, isCompleted, signal) => {
    return await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isCompleted }),
      signal,
    }).then(handleResponse);
  },
};

export default serverAPI;
