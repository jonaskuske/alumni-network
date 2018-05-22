<script>
import userAvatar from "@/assets/images/userAvatar.svg";

export default {
  functional: true,
  render(createElement, { props, data }) {
    return createElement("div", {
      attrs: {
        class: ["avatar-thumb", data.class, data.staticClass].join(" "),
        title: props.name,
        alt: "",
        style: `background-image: url(${props.image || userAvatar})`
      }
    });
  }
};
</script>


<style>
.avatar-thumb {
  width: 100%;
  border-radius: 50%;
  background: url() center / cover no-repeat;
}
.avatar-thumb::before {
  content: "";
  display: block;
  padding-top: 100%;
}
</style>
