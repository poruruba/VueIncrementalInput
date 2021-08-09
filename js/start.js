'use strict';

//const vConsole = new VConsole();
//window.datgui = new dat.GUI();

var vue_options = {
    el: "#top",
    mixins: [mixins_bootstrap],
    data: {
        target: 0,
        selected: "",
        list: ['init_1_1', 'init_1_2', 'init_2_1', 'init_2_2'],
    },
    computed: {
    },
    methods: {
        do_delete: function(){
            this.$refs.test.call_item_delete(1);
        },
        do_add: function () {
            this.$refs.test.call_item_add("test_" + this.target);
            this.target++;
        },
    },
    created: function(){
    },
    mounted: function(){
        proc_load();

    }
};
vue_add_data(vue_options, { progress_title: '' }); // for progress-dialog
vue_add_global_components(components_bootstrap);
vue_add_global_components(components_utils);

/*
 * add additional components
 */
//import comp_history from './comp_history.js';
//vue_add_component(vue_options, "comp_history", comp_history);
vue_add_global_component("comp_history", comp_history);

window.vue = new Vue( vue_options );
