<template>
    <div>
        <Header3D :key="currentBG"
            :bg-image="currentBG"
            :depth-map="currentDepth"
            :sensitivity="sensitivity"
            :xymove="xymove">
            <h1 slot="header">Mountains</h1>
            <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
        </Header3D>
    </div>
</template>

<script>
import Header3D from '@/components/Header3D.vue'

export default {
    name: 'NoTextTilt',
    components: {
        Header3D
    },
    computed: {
        currentBG() {
            return this.$store.state.currentBG;
        },
        currentDepth() {
            return this.$store.state.currentDepth;
        },
        xymove() {
            return this.$store.state.xymove
        },
        sensitivity() {
            return this.$store.state.sensitivity
        }
    }
}
</script>
