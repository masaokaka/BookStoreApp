<template>
<div id="alertArea">
    <v-alert v-if="alertOn.success" dense type="success">{{$store.state.alerts.text}}</v-alert>
    <v-alert v-else-if="alertOn.error" dense type="error">{{$store.state.alerts.text}}</v-alert>
    <v-alert v-else-if="alertOn.warning" dense type="warning">{{$store.state.alerts.text}}</v-alert>
    <v-alert v-else-if="alertOn.info" dense type="info">{{$store.state.alerts.text}}</v-alert>
</div>
</template>
<script>
export default {
    computed:{
        alertOn(){
            let flags ={
                success:false,
                error:false,
                warning:false,
                info:false,
            };
            if(this.$store.state.alerts.type==='success'){
                flags.success = true
                return flags
            }else if(this.$store.state.alerts.type==='error'){
                flags.error = true
                return flags
            }else if(this.$store.state.alerts.type==='warning'){
                flags.warning = true
                return flags
            }else if(this.$store.state.alerts.type==='info'){
                flags.info = true
                return flags
            }
            return flags
        }
    }
}
</script>
<style>
#alertArea{
    margin-top: 20px;
    position: relative;
    text-align: center;
}
</style>