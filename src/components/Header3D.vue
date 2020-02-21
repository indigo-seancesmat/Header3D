<template>
    <div class="Header3D-full"
        @mousemove="handleMouseMove"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        ref="card">
        <div class="Header3D-full__inner"
            :style="{'border-radius': `${borderRadius}px`}">
            <div class="Header3D-full__bg">
                <Still3d v-if="!xymove"
                    :bg-image="bgImage"
                    :depth-map="depthMap"
                    :x="mouseX"
                    :y="mouseY"
                    :sensitivity="sensitivity" />
                <Still3dXYMove v-if="xymove"
                    :bg-image="bgImage"
                    :depth-map="depthMap"
                    :x="mouseX"
                    :y="mouseY"
                    :sensitivity="sensitivity" />
            </div>
            <div class="Header3D-full__info"
                :style="[textTilt ? cardStyle : '', currentTextPosition]">
                <slot name="header"></slot>
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import Still3d from "@/components/Still3d";
import Still3dXYMove from "@/components/Still3dXYMove";

export default {
    name: "Header3DFull",
    components: {
        Still3d,
        Still3dXYMove
    },
    props: {
        bgImage: {
            type: String,
            required: true
        },
        depthMap: {
            default: String,
            required: true
        },
        sensitivity: Number,
        xymove: {
            type: Boolean,
            default: false
        },
        borderRadius: {
            type: Number,
            default: 0
        },
        textPosition: {
            type: String,
            default: 'center'
        },
        textTilt: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        width: 0,
        height: 0,
        mouseX: 0,
        mouseY: 0,
        mouseXEnter: 0,
        mouseYEnter: 0,
        mouseLeaveDelay: null
    }),
    computed: {
        mousePX() {
            return this.mouseX / this.width;
        },
        mousePY() {
            let mousePY;
            if (this.textPosition === 'top') {
                mousePY = (this.mouseY / this.height) - this.height;
            } else if (this.textPosition === 'center') {
                mousePY = this.mouseY / this.height;
            } else if (this.textPosition === 'bottom') {
                mousePY = (this.mouseY / this.height) + this.height;
            }
            return mousePY;
        },
        cardStyle() {
            if (this.textTilt === false) {
                return
            }
            const rX = this.mousePX * 3;
            const rY = this.mousePY * -3;
            return {
                transform: `rotateY(${rX}deg) rotateX(${rY}deg) translateZ(75px)`
            };
        },
        currentTextPosition() {
            let style;
            if (this.textPosition === 'top') {
                style = { 'justify-content': 'flex-start', 'margin-top': '100px' }
            } else if (this.textPosition === 'center') {
                style = { 'justify-content': 'center' }
            } else if (this.textPosition === 'bottom') {
                style = { 'justify-content': 'flex-end', 'margin-top': '-100px' }
            }
            return style;
        }
    },
    watch: {
        mouseXEnter: function (newVal, oldVal) {
            if (oldVal === 0) {
                this.$anime({
                    targets: this.$data,
                    easing: "linear",
                    duration: 150,
                    mouseX: newVal,
                    complete: () => {
                        this.mouseXEnter = 0;
                    }
                });
            }
        },
        mouseYEnter: function (newVal, oldVal) {
            if (oldVal === 0) {
                this.$anime({
                    targets: this.$data,
                    easing: "linear",
                    duration: 150,
                    mouseY: newVal,
                    complete: () => {
                        this.mouseYEnter = 0;
                    }
                });
            }
        }
    },
    mounted() {
        this.width = this.$refs.card.offsetWidth;
        this.height = this.$refs.card.offsetHeight;
    },
    methods: {
        handleMouseMove(e) {
            if (this.mouseXEnter === 0) {
                this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
                this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
            }
        },
        handleMouseEnter(e) {
            this.mouseXEnter = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
            this.mouseYEnter = e.pageY - this.$refs.card.offsetTop - this.height / 2;
            clearTimeout(this.mouseLeaveDelay);
        },
        handleMouseLeave() {
            this.mouseLeaveDelay = setTimeout(() => {
                this.$anime({
                    targets: this.$data,
                    easing: "linear",
                    duration: 150,
                    mouseX: 0,
                    mouseY: 0
                });
            }, 100);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);
.Header3D-full {
    display: inline-block;
    width: 100%;
    transform: perspective(400px);
    transform-style: preserve-3d;
    // background-color: #fff;

    // &:hover {
    //     .Header3D-full__info {
    //         transform: translateY(0);
    //     }
    //     .Header3D-full__info p {
    //         opacity: 1;
    //     }
    //     .Header3D-full__info,
    //     .Header3D-full__info p {
    //         transition: 0.6s $hoverEasing;
    //     }
    //     .Header3D-full__info:after {
    //         transition: 1s $hoverEasing;
    //         opacity: 1;
    //         transform: translateY(0);
    //     }
    //     .Header3D-full__bg {
    //         transition: 0.6s $hoverEasing, opacity 1s $hoverEasing;
    //         opacity: 0.8;
    //     }
    //     .Header3D-full__inner {
    //         transition: 0.6s $hoverEasing, box-shadow 2s $hoverEasing;
    //         box-shadow: rgba(white, 0.2) 0 0 40px 5px, rgba(white, 1) 0 0 0 1px,
    //             rgba(0, 0, 0, 0.66) 0 14px 30px 0, inset #333 0 0 0 5px,
    //             inset white 0 0 0 6px;
    //     }
    // }

    &__inner {
        position: relative;
        flex: 0 0 240px;
        width: 100%;
        min-height: 600px;
        background-color: #333;
        overflow: hidden;
        transition: 1s $returnEasing;
    }

    &__bg {
        opacity: 0.6;
        position: absolute;
        top: -20px;
        left: -20px;
        width: 100%;
        height: 100%;
        padding: 20px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        transition: 1s $returnEasing, opacity 1s 0.15s $returnEasing;
        pointer-events: none;
    }

    &__info {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        height: 100%;
        color: #fff;
        // transition: 0.6s 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
        width: calc(100% - 40px);

        p {
            margin: 0;
            font-size: 25px;
            text-shadow: rgba(black, 1) 0 2px 3px;
        }

        * {
            position: relative;
            z-index: 1;
        }

        h1 {
            font-size: 62px;
            font-weight: 700;
            margin: 0;
            text-shadow: rgba(black, 0.5) 0 10px 10px;
        }
    }
}
</style>