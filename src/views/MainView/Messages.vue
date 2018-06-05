<template>
  <main class="messages">
    <title-bar title="Letzte Chats" label="Nachrichten">
      <button class="button-main">Alle als gelesen markieren</button>
    </title-bar>
  </main>
</template>

<script>
import TitleBar from "@/components/TitleBar";

export default {
  name: "Messages",
  components: { TitleBar }
};
</script>

<style>
.messages {
  width: 100%;
}
</style>
