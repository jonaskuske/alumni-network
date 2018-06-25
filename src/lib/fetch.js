import store from '@/store'
import { ADD_EVENTS } from '@/store/modules/events/types'
import { ADD_POSTS } from '@/store/modules/forum/types'
import { ADD_USERS } from '@/store/modules/user/types'
import mocks from './mocks'

export const fetchEvents = () => {
  return fetch('https://data.jonaskuske.com/api/events?n=10')
    .then(res => (res.ok && res.status === 200 ? res.json() : mocks.events))
    .catch(() => mocks.events)
}

export const fetchPosts = () => {
  return fetch('https://data.jonaskuske.com/api/posts?n=10')
    .then(res => (res.ok && res.status === 200 ? res.json() : mocks.posts))
    .catch(() => mocks.posts)
}

export const fetchUsers = () => {
  return fetch('https://data.jonaskuske.com/api/users?q=all')
    .then(res => (res.ok && res.status === 200 ? res.json() : mocks.users))
    .catch(() => mocks.users)
}

export const initialFetch = async () => {
  const [events, posts, users] = await Promise.all([
    fetchEvents(),
    fetchPosts(),
    fetchUsers(),
  ])
  store.dispatch('eventStore/' + ADD_EVENTS, events)
  store.dispatch('forumStore/' + ADD_POSTS, posts)
  store.dispatch('userStore/' + ADD_USERS, users)
}
