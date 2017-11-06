<template>
    <div ref="progressB" class="progress-bar" @click="progressClick">
        <div class="inner">
            <div ref="progress" class="progress"></div>
            <div ref="btn" class="btn-warper"
                @touchstart="onTouchStart"
                @touchmove="onTouchMove"
                @touchend="onTouchEnd">
                <span ref="move" class="move"></span>
            </div>
        </div>
    </div>
</template>

<script>
const MoveWidth = 16;
    export default {
        props:{
            percentage: {
                type: Number,
                default: 0
            }
        },
        created() {
            this. touch = {}
        },
        methods: {
            onTouchStart(e) {
                this.touch.initated = true;
                this.touch.startx = e.touches[0].pageX;
                this.touch.left = this.$refs.progress.clientWidth;
            },
            onTouchMove(e) {
                if(!this.touch.initated) {
                    return 
                }
                let diff = e.touches[0].pageX - this.touch.startx;
                let offsetL = Math.min(this.$refs.progressB.clientWidth - MoveWidth,Math.max(0,diff + this.touch.left));
                this.setOffset(offsetL);
            },
            onTouchEnd() {
                this.touch.initated = false;
                this.triggerPercent();
            },
            progressClick(e) {
                let rect = this.$refs.progressB.getBoundingClientRect();
                let offsetL = e.pageX - rect.left;
                this.setOffset(offsetL);
                this.triggerPercent();
            },
            triggerPercent() {
                let offsetL = this.$refs.progress.clientWidth;
                let percentage = offsetL / (this.$refs.progressB.clientWidth - MoveWidth);
                this.$emit("percentageChange",percentage);
            },
            setOffset(offsetL) {
                this.$refs.progress.style.width = offsetL + 'px';
                this.$refs.btn.style.transform = `translateX(${offsetL}px)`;
            }
        },
        watch: {
            percentage(newPer) {
                if(newPer >= 0 && !this.touch.initated) {
                    let progressB = this.$refs.progressB.clientWidth;
                    let w = (progressB - MoveWidth) * this.percentage;
                    this.setOffset(w);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~common/scss/variable';
    .progress-bar{
        height: 30px;
        .inner{
            position: relative;
            top: 13px;
            height: 4px;
            background-color: rgba(0,0,0,0.3);
            .progress{
                position: absolute;
                height: 4px;
                background-color:$color-theme;
            }
            .btn-warper{
                position: absolute;
                top: -13px;
                left: -8px;
                height: 30px;
                width: 30px;
                .move{
                    position: absolute;
                    top: 7px;
                    left: 7px;
                    box-sizing: border-box;
                    border-radius: 50%;
                    border: 3px solid $color-text;
                    height: 16px;
                    width: 16px;
                    background-color: $color-theme;
                }
            }
        }
    }
</style>
