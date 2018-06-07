<template>
  <with-hero-image :image="currentUser.headerImage" :transition="true" :fixed="!mobileLayout">
    <main>
      <title-bar :title="currentUser.name" label="Mein Profil">
        <template v-if="editMode">
          <button class="button-main button--danger" @click="editMode = false; newImage = ''">Abbrechen</button>
          <button class="button-main" @click="save">Profil speichern</button>
        </template>
        <button v-else class="button-main" @click="editMode = true">Profil bearbeiten</button>
        <button v-if="mobileLayout && !editMode" class="button-main button--danger" @click="logout">Logout</button>
      </title-bar>
      <user-avatar
        v-if="editMode"
        :image="newImage || currentUser.profilePicture"
        class="my-profile__avatar my-profile__avatar--edit"
        @click="$refs.picture.click()"
      />
      <user-avatar v-else :image="currentUser.profilePicture" class="my-profile__avatar" />
      <p class="title-label">Forum</p>
      <h2 id="posts" class="subtitle">Meine Beiträge</h2>
      <div class="thumbnail-grid">
        <post-thumbnail
          v-for="post in postsByUsername[currentUser.username]"
          :key="post.id"
          :id="post.id"
          :post="post"
        />
        <p v-if="!postsByUsername[currentUser.username] || !postsByUsername[currentUser.username].length">
          Keine Beiträge erstellt.
        </p>
      </div>
      <p class="title-label">Events</p>
      <h2 id="events" class="subtitle">Meine Veranstaltungen</h2>
      <div class="thumbnail-grid">
        <event-thumbnail
          v-for="event in eventsByUsername[currentUser.username]"
          :key="event.id"
          :id="event.id"
          :event="event"
        />
        <p v-if="!eventsByUsername[currentUser.username] || !eventsByUsername[currentUser.username].length">
          Keine Events erstellt.
        </p>
      </div>
      <input 
        ref="picture" 
        type="file" 
        accept="image/*" 
        class="hide" 
        @change="storeProfilePic">
    </main>
  </with-hero-image>
</template>

<script>
import * as auth from '@/lib/auth'
import { readImageFromInput } from '@/lib/helpers'
import { SET_PROFILE_PICTURE } from '@/store/modules/user/types'
import { mapGetters, mapState, mapActions } from 'vuex'
import UserAvatar from '@/components/UserAvatar'
import WithHeroImage from '@/components/WithHeroImage'
import EventThumbnail from '@/components/EventThumbnail'
import PostThumbnail from '@/components/PostThumbnail'
import TitleBar from '@/components/TitleBar'
export default {
  name: 'Profile',
  components: {
    WithHeroImage,
    UserAvatar,
    EventThumbnail,
    PostThumbnail,
    TitleBar,
  },
  data: () => ({ editMode: false, newImage: '' }),
  computed: {
    ...mapState(['mobileLayout']),
    ...mapGetters('userStore', ['currentUser']),
    ...mapGetters('eventStore', ['eventsByUsername']),
    ...mapGetters('forumStore', ['postsByUsername']),
  },
  methods: {
    ...mapActions('userStore', { setProfilePicture: SET_PROFILE_PICTURE }),
    logout() {
      auth.logout()
      this.$router.push('/login')
    },
    async storeProfilePic(evt) {
      const image = await readImageFromInput(evt)
      this.newImage = image
      this.$refs.picture.value = ''
    },
    save() {
      this.editMode = false
      const picture = this.newImage
      if (!picture) return

      this.setProfilePicture({ picture })
    },
  },
}
</script>

<style>
.my-profile__avatar {
  width: 200px;
  position: relative;
}
.my-profile__avatar::after {
  content: '';
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6) center / 30% no-repeat;
  background-image: url(~@/assets/icons/edit-bright.svg);
  opacity: 0;
  transition: opacity 350ms ease-out;
}
.my-profile__avatar--edit {
  cursor: pointer;
}
.my-profile__avatar--edit::after {
  opacity: 1;
}
</style>
