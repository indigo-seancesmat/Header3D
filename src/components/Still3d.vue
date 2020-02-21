<template>
    <div ref="still3d"
        class="still3d">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
import * as PIXI from "pixi.js";
import debounce from "lodash/debounce";

export default {
    name: "Still3d",
    props: {
        depthMap: {
            type: String,
            required: true
        },
        bgImage: {
            type: String,
            required: true
        },
        sensitivity: {
            type: Number,
            default: 40
        },
        x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            app: null,
            width: 0,
            height: 0
        };
    },
    beforeDestroy() {
        if (this.ticker) {
            this.ticker.stop();
        }
    },
    mounted() {
        this.width = this.$refs.still3d.offsetWidth;
        this.height = this.$refs.still3d.offsetHeight;

        this.renderer = new PIXI.Renderer({
            view: this.$refs.canvas,
            width: this.width,
            height: this.height,
            resolution: window.devicePixelRatio,
            autoDensity: true
        });
        this.stage = new PIXI.Container();
        // this.$refs.still3d.appendChild(this.app.view);

        this.imgTexture = PIXI.Texture.from(this.bgImage);
        this.img = new PIXI.Sprite(this.imgTexture);
        this.imgTexture.baseTexture.on("loaded", () => {
            this.setScale();
        });
        this.img.anchor.x = 0.5;
        this.img.anchor.y = 0.5;
        this.stage.addChild(this.img);

        this.depthMapCont = new PIXI.Sprite.from(this.depthMap);
        this.depthMapCont.anchor.x = 0.5;
        this.depthMapCont.anchor.y = 0.5;
        this.stage.addChild(this.depthMapCont);

        window.addEventListener("resize", debounce(this.handleResize, 100));

        this.displacementFilter = new PIXI.filters.DisplacementFilter(
            this.depthMapCont
        );
        this.stage.filters = [this.displacementFilter];


        this.ticker = new PIXI.Ticker();
        this.ticker.add(() => {
            this.displacementFilter.scale.x =
                (this.width / 2 - this.x) / this.sensitivity;
            this.displacementFilter.scale.y =
                (this.height / 2 - this.y) / this.sensitivity;
            // console.log((this.width / 2 - this.x) / this.sensitivity)
            this.renderer.render(this.stage);
        });
        this.setScale();
        this.ticker.start();
    },
    methods: {
        setScale() {
            this.containerRatio = this.width / this.height;
            this.imageRatio = this.imgTexture.width / this.imgTexture.height;

            // this is to prevent it from scaling on initial load if the image hasn't loaded yet
            // if this isn't here it throws off the calculations once the image does load
            if (
                this.width / this.img.width > 10 ||
                this.height / this.img.height > 10
            ) {
                return;
            }

            console.log(
                "here",
                this.width,
                this.img.width,
                this.height,
                this.img.height
            );
            if (this.containerRatio > this.imageRatio) {
                this.scale = this.width / this.imgTexture.width;
            } else {
                this.scale = this.height / this.imgTexture.height;
            }

            this.setWidthHeight();
        },
        setWidthHeight() {
            this.img.x = this.renderer.screen.width / 2;
            this.img.y = this.renderer.screen.height / 2;
            this.img.scale.x = this.scale;
            this.img.scale.y = this.scale;
            this.depthMapCont.x = this.renderer.screen.width / 2;
            this.depthMapCont.y = this.renderer.screen.height / 2;
            this.depthMapCont.scale.x = this.scale;
            this.depthMapCont.scale.y = this.scale;
        },
        handleResize() {
            if (this.$refs.still3d) {
                this.width = this.$refs.still3d.offsetWidth;
                this.height = this.$refs.still3d.offsetHeight;
                this.setScale();
                this.renderer.resize(this.width, this.height);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.still3d {
    height: 100%;
    width: 100%;
    h1 {
        color: blue;
    }
    canvas {
        margin-left: -1px;
    }
}
</style>
