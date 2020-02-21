<template>
    <div>
        <Header3D :bg-image="mountain"
            :depth-map="mountainDepth"
            :sensitivity="25"
            text-tilt>
            <h1 slot="header">Mountains</h1>
            <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
        </Header3D>
    </div>
</template>

<script>
import Header3D from '@/components/Header3D.vue'
import subway from "@/assets/subway.jpg";
import subwayDepth from "@/assets/subway-depth.jpg";
import mountain from "@/assets/mountain.jpg";
import mountainDepth from "@/assets/mountain-depth.jpg";
import controller from "@/assets/controller.jpg";
import controllerDepth from "@/assets/controller-depth.jpg";
import boarder from "@/assets/boarder.jpg";
import boarderDepth from "@/assets/boarder-depth.jpg";
import shelf from "@/assets/shelf-blur.jpg";
import shelfDepth from "@/assets/shelf-depth.jpg";
import flowers from "@/assets/flowers.jpg";
import flowersDepth from "@/assets/flowers-depth.jpg";

export default {
    name: 'TextTilt',
    components: {
        Header3D
    },
    data() {
        return {
            subway,
            subwayDepth,
            mountain,
            mountainDepth,
            controller,
            controllerDepth,
            boarder,
            boarderDepth,
            shelf,
            shelfDepth,
            flowers,
            flowersDepth
        };
    }
}
</script>
