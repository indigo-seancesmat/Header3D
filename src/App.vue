<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">NoTextTilt</router-link> |
            <router-link to="/text-tilt">TextTilt</router-link>
        </div>
        <router-view current-image="subway" />
    </div>
</template>

<style lang="scss">
html,
body {
    padding: 0;
    margin: 0;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.row {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
}
h3 {
    color: #41b3a3;
}
#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
