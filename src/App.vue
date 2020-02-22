<template>
    <div id="app">
        <div id="nav">
            <div>
                <router-link to="/">NoTextTilt</router-link> |
                <router-link to="/text-tilt">TextTilt</router-link>
            </div>
            <div>
                <strong>Image:</strong>
                <button @click="setImage('mountain')"
                    :class="{active: currentImageName === 'mountain'}">Mountains</button>
                <button @click="setImage('subway')"
                    :class="{active: currentImageName === 'subway'}">Subway</button>
                <button @click="setImage('controller')"
                    :class="{active: currentImageName === 'controller'}">Controller</button>
                <button @click="setImage('boarder')"
                    :class="{active: currentImageName === 'boarder'}">Boarder</button>
                <button @click="setImage('shelf')"
                    :class="{active: currentImageName === 'shelf'}">Shelf</button>
                <div style="margin-left: 20px; display: inline-block;">
                    <strong>Image XYShift:</strong> <button @click="$store.dispatch('xymove', true)"
                        :class="{active: isXYMove}">On</button> | <button
                        @click="$store.dispatch('xymove', false)"
                        :class="{active: !isXYMove}">Off</button>
                </div>
                <div style="margin-left: 20px; display: inline-block;">
                    <strong>Sensitivity:</strong> <span
                        style="font-size: 12px; padding-right: 5px">(lower number = more
                        sensitive)</span>
                    <input :value="sensitivity"
                        @input="(e) => {$store.dispatch('sensitivity', e.target.value)}"
                        style="max-width: 30px">
                </div>
            </div>
        </div>

        <router-view current-image="subway" />
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            currentImageName: 'subway'
        }
    },
    computed: {
        isXYMove() {
            return this.$store.state.xymove;
        },
        sensitivity() {
            return this.$store.state.sensitivity
        }
    },
    methods: {
        setImage(name) {
            this.currentImageName = name;
            this.$store.dispatch('setImage', name)
        }
    }
}
</script>

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
    display: flex;
    justify-content: space-between;
    padding: 16px 30px;
    background: #333;
    color: #fff;
    a {
        font-weight: bold;
        color: #fff;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
    .active {
        background: #42b983;
    }
    button {
        padding: 5px 10px;
        display: inline-block;
        border-radius: 3px;
        border: none;
        background: #ccc;
        font-size: 12px;
        font-weight: bold;
        color: #333;
        margin-left: 4px;
        margin-right: 4px;
        cursor: pointer;
        &:hover {
            background: rgb(39, 212, 172);
        }
        &.btn--active {
            background: rgb(92, 255, 217);
            &:hover {
                background: rgb(39, 212, 172);
            }
        }
    }
}
</style>
