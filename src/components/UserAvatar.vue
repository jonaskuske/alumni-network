<script>
import userAvatar from '@/assets/images/userAvatar.svg'

const noop = () => {}

export default {
  functional: true,
  render(createElement, { props, data, listeners }) {
    return createElement('div', {
      attrs: {
        class: ['avatar-thumb', data.class, data.staticClass].join(' '),
        title: props.name,
        alt: '',
        style: `background-image: url(${props.image || userAvatar})`,
      },
      on: {
        click: listeners.click || noop,
      },
    })
  },
}
</script>


<style>
.avatar-thumb {
  width: 100%;
  border-radius: 50%;
  background: url() center / cover no-repeat;
}
.avatar-thumb::before {
  content: '';
  display: block;
  padding-top: 100%;
}
</style>
