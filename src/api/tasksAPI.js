const URL = "http://localhost:3001/tasks";
const headers = {
  "Content-Type": "application/json",
};

const tasksAPI = {
  getAll: async (signal) => {
    const res = await fetch(URL, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  },

  add: async (task, signal) => {
    const res = await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(task),
      signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    return await res.json();
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
        await tasksAPI.delete(id, signal);
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
    const res = await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isCompleted }),
      signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    return res.json();
  },
};

export default tasksAPI;
