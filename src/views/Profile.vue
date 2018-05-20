<template>
  <with-hero-image :image="HeroImage" :transition="true" :fixed="true">
    <main>
      <p class="title-label">Mein Profil</p>
      <h1 class="title">Jonas Kuske</h1>
      <user-avatar :image="ProfilePicture" class="my-profile__avatar" />
      <p class="title-label">Forum</p>
      <h2 class="subtitle">Meine Beiträge</h2>
      <p class="title-label">Events</p>
      <h2 class="subtitle">Meine Beiträge</h2>
    </main>
  </with-hero-image>
</template>

<script>
import HeroImage from "@/assets/images/profile-header.jpg";
import ProfilePicture from "@/assets/images/jonas.jpg";
import UserAvatar from "@/components/UserAvatar";
import WithHeroImage from "@/components/WithHeroImage";

export default {
  name: "Profile",
  data: () => ({ HeroImage, ProfilePicture }),
  components: {
    WithHeroImage,
    UserAvatar
  }
};
</script>

<style>
.my-profile__avatar {
  width: 200px;
}
</style>
