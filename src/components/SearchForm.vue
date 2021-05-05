<template>
    <div id="searchbox">
        <v-select 
            v-model="selected"
            label="並べ替え"
            :items="options"
            item-text="label"
            item-value="code"
        >
        </v-select>
        <v-text-field v-model="text">
            <template v-slot:append-outer>
                <v-btn color="accent" @click="search">検索</v-btn>
            </template>
        </v-text-field>
    </div>
</template>
<script>
export default {
    data(){
        return{
            text:'',
            selected:'',
            options:[
                {label:'評価が高い',code:'reviewAverage'},
                {label:'発売日(新しい)',code:'-releaseDate'},
                {label:'発売日(古い)',code:'+releaseDate'},
                {label:'価格が安い',code:'+itemPrice'},
                {label:'価格が高い',code:'-itemPrice'},
            ]
        }
    },
    methods:{
        search(){
            if(this.text===''){
                this.text = null;
            }
            if(this.selected===''){
                this.selected = 'standard';
            }
            this.$emit('update:items',this.text,this.selected)
        },
    }
}
</script>
<style scoped>
#searchbox{
    margin-bottom:20px;
}
.v-text-field{
    width: 400px;
}
</style>