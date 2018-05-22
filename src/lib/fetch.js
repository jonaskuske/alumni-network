import mocks from "./mocks";

export const fetchEvents = () => {
  return fetch("https://data.jonaskuske.com/api/events?n=10")
    .then(res => (res.ok && res.status === 200 ? res.json() : mocks.events))
    .catch(() => mocks.events);
};

export const fetchPosts = () => {
  return fetch("https://data.jonaskuske.com/api/posts?n=10")
    .then(res => (res.ok && res.status === 200 ? res.json() : mocks.posts))
    .catch(() => mocks.posts);
};

export const fetchUsers = () => {
  return fetch("https://data.jonaskuske.com/api/users?q=all")
    .then(res => (res.ok && res.status === 200 ? res.json() : mocks.users))
    .catch(() => mocks.users);
};
