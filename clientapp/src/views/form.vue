<template>
    <div class="qform-view container w-50">
        <h1 class="text-center m-5 text-white">{{form_title}}</h1>

        <div v-for="q_item in q_items" :key="q_item.id">

            <TextForm        v-if="q_item.type === NodeTypes.QUESTION_TEXT" :item="q_item"></TextForm>
            <ChooseForm v-else-if="q_item.type === NodeTypes.QUESTION_CHOISE" @selectChanged="selectChanged" :item="q_item"></ChooseForm>
            <TextBForm   v-else-if="q_item.type === NodeTypes.TEXT" :item="q_item"></TextBForm>
            <div        v-else-if="q_item.type === NodeTypes.END" class="px-3">
                <button @click="complete_form" class="btn btn-dark btn-lg btn-block ">Complete form</button>
            </div>

            <h5 class="text-white" v-else>else</h5>
        </div>
        <p class="fixed-bottom text-center text-muted">LogicForms</p>
    </div>
</template>

<script>
    import TextForm from '@/components/TextForm.vue';
    import ChooseForm from '@/components/ChoseForm.vue';
    import TextBForm from '@/components/TextBForm.vue';
    import { api } from '@/plugins/axios';
    import { NodeTypes } from '@/config.js';
    export default {
        components: {
            TextForm,
            TextBForm,
            ChooseForm
        },
        data() {
            return {
                NodeTypes,
                form_title: null,
                q_items: [],
                api_items: []
            }
        },



        async created() {
            var form_id = this.$route.params.pathMatch;

            var response = null;
            try {
                response = await api.get('/forms/' + form_id);
                console.log(response);
            } catch (error) {
                console.error(error);
            }

            console.log('data: ');
            this.form_title = response.data.title;
            this.api_items = JSON.parse(response.data.questionsData);
            console.log(this.api_items);

            
            this.q_items = this.generateFromApi();
        },
        methods: {
            getItem(item_id) {
                console.log('get ' + item_id);
                return this.api_items.filter(i => i.id === item_id)[0];
            },
            selectChanged(itemData) {
                this.getItem(itemData.item.id).next_id = itemData.selectedItem.next_id;
                this.q_items = this.generateFromApi();
            },

            generateFromApi() {
                var items = [];
                var first_id = this.api_items.filter(i => i.type === this.NodeTypes.START)[0].next_id;
                var first_item = this.getItem(first_id);

                items.push(first_item);

                for (var q = first_item; q.next_id;) {
                    q = this.getItem(q.next_id);
                    items.push(q);
                }
                return items;
            },
            complete_form() {
                //validate
            }
        }

        
        
    };
</script>

<style>
    body {
        background: #0F2027;
        background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);  
        background: linear-gradient(to right, #2C5364, #203A43, #0F2027); 
    }
</style>