<template>
  <main class="messages">
    <title-bar title="Letzte Chats" label="Nachrichten">
      <button class="button-main" @click="markAllAsRead">Alle als gelesen markieren</button>
    </title-bar>

    <button v-if="onlyUnread" class="button-secondary notifications__toggle" @click="$router.push({path: $route.path, query: {show: 'all'}})">
      Alle anzeigen
    </button>
    <button v-else class="button-secondary notifications__toggle" @click="$router.push($route.path)">
      Nur ungelesene
    </button>

    <div v-for="(message, i) in displayedMessages" :key="i" class="messages__message-wrapper">
      <p class="messages__message-author">{{ message.from }}</p>
      <p class="messages__message-text">{{ message.text }}</p>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import TitleBar from "@/components/TitleBar";
import { MARK_ALL_AS_READ } from '@/store/modules/messages/types';

export default {
  name: "Messages",
  components: { TitleBar },
  computed: {
    ...mapState("messageStore", ["messages"]),
    ...mapGetters("messageStore", ["unreadMessages"]),
    onlyUnread() {
      return this.$route.query.show !== "all";
    },
    displayedMessages() {
      return this.onlyUnread ? this.unreadMessages : this.messages;
    }
  },
  methods: {
    ...mapActions("messageStore", { markAllAsRead: MARK_ALL_AS_READ })
  }
};
</script>

<style>
.messages {
  width: 100%;
}
.messages__message-wrapper {
  display: flex;
  background: #f0f0f0;
  padding: 1rem;
  margin: 1rem 0;
}
.messages__message-author {
  flex: 2;
  margin: 0;
  padding: 0;
}
.messages__message-text {
  flex: 8;
  margin: 0;
  padding: 0;
}
</style>
