<template>
  <svg
    :class="['logo', { 'logo--hamburger': showHamburger }]"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 841.89 595.28"
  >
    <g class="logo__lines">
      <rect
        :height="showHamburger ? '280' : '168.29'"
        x="314.82"
        y="215.64"
        width="39.6"
      />
      <rect
        :height="showHamburger ? '280' : '168.29'"
        x="401.94"
        y="215.64"
        width="39.6"
      />
      <rect
        :height="showHamburger ? '280' : '168.29'"
        x="489.06"
        y="215.64"
        width="39.6"
      />
    </g>
    <path
      class="logo__letter logo__letter--d"
      d="M227.71,81V235.13c-15.37-13.28-35.34-23.24-57.24-23.24a87.7,  87.7,0,0,0,0,175.39c21.9,0,42.08-10.08,57.45-23.36l-.21,20h39.6V81ZM170.47,351.55a52,52,0,1,1,0-103.93c34.32,0,  55.82,23.27,55.82,52S204.54,351.55,170.47,351.55Z"
    />
    <path
      class="logo__letter logo__letter--p"
      d="M615.77,  514.27V364.39c15.37,13.27,35.35,23.23,57.25,23.23,48.43,0,86.09-39.26,86.09-87.69S721.45,212.24,673,  212.24c-21.9,0-42.08,10.08-57.45,23.35l.2-20H576.18V514.27ZM673,248c28.7,0,50.62,20.27,50.62,52,0,28.7-21.92,  52-50.62,52-32.72,0-56-23.26-56-52S638.64,248,673,248Z"
    />
  </svg>
</template>

<script>
export default {
  name: 'DmpLogoSvg',
  props: {
    showHamburger: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
.logo {
  fill: #2c3e50;
  transition: width 220ms 100ms ease-out, fill 180ms ease-in-out;
}
/* Hamburger styling */
.logo__lines {
  transition: transform 150ms ease-out;
  transform-origin: center;
}
.logo__letter {
  transition: opacity 250ms 100ms ease-out, transform 350ms 100ms ease-out;
}
.logo--hamburger .logo__letter {
  transition: opacity 250ms ease-out, transform 300ms 80ms ease-out;
}
.logo--hamburger .logo__lines {
  transform: rotate(90deg);
}
.logo--hamburger .logo__letter {
  opacity: 0;
}
.logo__lines rect {
  transition: height 120ms 100ms ease-out;
}
.logo--hamburger .logo__lines rect {
  transition: height 120ms ease-in;
  height: 280px;
}
.logo--hamburger .logo__letter--d {
  transform: translateY(-120px);
}
.logo--hamburger .logo__letter--p {
  transform: translateY(120px);
}
</style>
