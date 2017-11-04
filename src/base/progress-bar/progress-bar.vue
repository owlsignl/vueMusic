<template>
    <div class="progress-bar">
        <div class="inner">
            <div class="progress"></div>
            <div class="btn-warper">
                <span class="move"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            percentage: {
                type: Number,
                default: 0
            }
        },
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
