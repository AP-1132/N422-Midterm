const BASE = "/api";

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error || "Unknown error");
  }
  return res.status === 204 ? null : res.json();
}

export const getEntries = () => request("/entries");

export const createEntry = (data) =>
  request("/entries", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const updateEntry = (id, data) =>
  request(`/entries/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteEntry = (id) =>
  request(`/entries/${id}`, {
    method: "DELETE",
  });
