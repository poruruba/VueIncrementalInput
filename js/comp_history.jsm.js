var comp_history = {
//  mixins: [mixins_bootstrap],
  props: ['value', 'list'],
  template: `
<div class="dropdown input-group">
  <input class="form-control dropdown-toggle" type="text" data-bs-toggle="dropdown" v-model="input_text" v-on:input="input_change">
  <ul class="dropdown-menu">
    <li v-for="(item, index) in item_list" value="item" v-on:click="item_select(index)">
      <a class="dropdown-item" style="padding-right: 0px;">{{item}} <span class="float-end" v-on:click.stop="call_item_delete(index)">&nbsp;&nbsp;&nbsp; × &nbsp;&nbsp;</span></a>
    </li>
  </ul>
  <span class="input-group-text" v-on:click="input_clear">×</span>
</div>
`,
  data: function(){
    return {
      input_text: this.value,
      all_list: [],
      item_list: [],
    }
  },
  methods: {
    call_list_add: function (list) {
      this.list_add(list);
      this.$emit('update:list', this.all_list);
      this.input_change();
    },
    call_item_add: function (item) {
      this.item_add(item);
      this.$emit('update:list', this.all_list);
      this.input_change();
    },
    call_list_clear: function () {
      this.all_list = [];
      this.$emit('update:list', this.all_list);
      this.input_change();
    },
    call_item_delete: function (index) {
      this.all_list.splice(index, 1);
      this.$emit('update:list', this.all_list);
      this.input_change();
    },

    list_add: function (list) {
      list.forEach(item => {
        this.item_add(item);
      });
    },
    input_clear: function () {
      this.input_text = "";
      this.input_change();
    },
    item_add: function (value) {
      var item = this.all_list.find(item => (item == value));
      if (!item)
        this.all_list.push(value);
    },
    item_select: function (index) {
      this.input_text = this.item_list[index];
      this.input_change();
    },
    input_change: function () {
      if (!this.input_text) {
        this.item_list = this.all_list;
      } else {
        var list = [];
        this.all_list.forEach(item =>{
          if (item.startsWith(this.input_text))
            list.push(item);
        });
        this.item_list = list;
      }

      this.$emit('input', this.input_text);
    },
  },
  mounted: function () {
    if (this.list)
      this.list_add(this.list);
    this.input_change();
  }
};

export default comp_history;