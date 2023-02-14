<template>
    <div>
        <img src="http://image.sinajs.cn/newchart/daily/n/sh600586.gif"/>
        <chooseStock></chooseStock>
    </div>
</template>

<script>

import chooseStock from '../utils/chooseStock';

export default {
    name: "Atricle",
    data() {
        return {
            
        }
    },
    created() {
    },

    components: {
        chooseStock
    },
}
</script>

<style>

</style>