<template>
    <div class="Header3D"
        :class="{'Header3D--info-popup': infoPopup}"
        @mousemove="handleMouseMove"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        ref="card">
        <div class="Header3D__inner"
            :style="{'border-radius': `${borderRadius}px`}">
            <div class="
            Header3D__bg">
                <Still3d :bg-image="bgImage"
                    :depth-map="depthMap"
                    :x="mouseX"
                    :y="mouseY"
                    :sensitivity="sensitivity" />
            </div>
            <div class="Header3D__info">
                <slot name="header"></slot>
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import Still3d from "@/components/Still3d";

export default {
    name: "Header3D",
    components: {
        Still3d
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
        borderRadius: {
            type: Number,
            default: 0
        },
        infoPopup: {
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
.Header3D {
    display: inline-block;
    margin: 10px;
    transform: perspective(400px);
    transform-style: preserve-3d;
    cursor: pointer;
    width: 100%;

    &:hover {
        // .Header3D__info {
        //     transform: translateY(0);
        // }
        // .Header3D__info p {
        //     opacity: 1;
        // }
        // .Header3D__info,
        // .Header3D__info p {
        //     transition: 0.6s $hoverEasing;
        // }
        // .Header3D__info:after {
        //     transition: 1s $hoverEasing;
        //     opacity: 1;
        //     transform: translateY(0);
        // }
        .Header3D__bg {
            transition: 0.6s $hoverEasing, opacity 1s $hoverEasing;
            opacity: 0.8;
        }
        .Header3D__inner {
            transition: 0.6s $hoverEasing, box-shadow 2s $hoverEasing;
            box-shadow: rgba(0, 0, 0, 0.66) 0 14px 30px 0;
        }
    }

    &__inner {
        position: relative;
        flex: 0 0 240px;
        width: 100%;
        background-color: #333;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.66) 0 14px 30px 0;
        transition: 1s $returnEasing;
    }

    &__bg {
        opacity: 0.6;
        position: relative;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 340px;
        padding: 0px;
        transition: 1s $returnEasing, opacity 1s 0.15s $returnEasing;
        pointer-events: none;
    }

    &__info {
        padding: 20px;
        position: relative;
        bottom: 0;
        margin-left: -1px;
        background: #fff;
        color: #111;
        transition: 0.6s 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
        width: calc(100% - 38px);

        * {
            position: relative;
            z-index: 1;
        }
        h1 {
            font-size: 36px;
            font-weight: 700;
            // text-shadow: rgba(black, 0.5) 0 10px 10px;
            margin: 0px;
        }
    }

    &--info-popup {
        &:hover {
            .Header3D__info {
                transform: translateY(0);
                transition: 0.6s $hoverEasing;
            }
        }

        .Header3D__info {
            position: absolute;
            transform: translateY(100%);
            background: rgba(255, 255, 255, 0.75);
        }
    }
}
</style>