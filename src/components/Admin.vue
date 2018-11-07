<template>
    <div class="row">
        <div class="col-sm-12 col-md-8">
            <h2>添加新的Pizza</h2>
            <div class="form-group row">
                <label class="col-sm-1">品种</label>
                <input type="text" class="col-sm-11 form-control" v-model="pizza.name">
            </div>
            <div class="form-group row">
                <label class="col-sm-1">描述</label>
                <textarea cols="30" rows="5" class="col-sm-11 form-control" v-model="pizza.description"></textarea>
            </div>
            <div class="form-group row">
                <label class="col-sm-1">尺寸</label>
                <input type="text" class="col-sm-11 form-control" v-model="pizza.size">
            </div>
            <div class="form-group row">
                <label class="col-sm-1">价格</label>
                <input type="text" class="col-sm-11 form-control" v-model="pizza.price">
            </div>
            <button type="button" class="btn btn-success" @click="addPizzaData">提交</button>

        </div>
        <div class="col-sm-12 col-md-4">
            <h2 class="text-muted">Menu:</h2>
            <table class="table">
                <thead class=" table table-default">
                    <tr>
                        <th>品种</th>
                        <th>删除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for=" item in pizzaDatas" :key="item.objectId">
                        <td>{{item.size+item.name}}</td>
                        <td><button type="button" class="btn btn-outline-danger btn-sm" @click="deletePizza(item)">&times;</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Bmon from "hydrogen-js-sdk";
Bmob.initialize(
  "a2d4e5085b301996b25a43c1fe5b47b5",
  "010535e63b33f7a56c1e466ef69fe09a"
);
export default {
  data() {
    return {
      pizza: {
        name: "",
        size: "",
        description: "",
        price: ""
      }
    };
  },
  computed:{
      pizzaDatas(){
          return this.$store.state.menuItems;
      }
  },
  methods: {
    addPizzaData() {
      const query = Bmob.Query("Pizza");
      query.set("name", this.pizza.name);
      query.set("size", this.pizza.size);
      query.set("price", this.pizza.price);
      query.set("description", this.pizza.description);
      query.save().then(res => {
        this.getPizzaData();
      });
    },
    deletePizza(item) {
      const query = Bmob.Query("Pizza");
      query.destroy(item.objectId).then(res => {
        this.getPizzaData();
      });
    },
    getPizzaData() {
      const query = Bmob.Query("Pizza");
      query.find().then(res => {
          this.$store.commit('setMenuItems',res);
      });
    }
  },
  created() {
      this.getPizzaData();
  }
};
</script>
<style scoped>
.form-group label {
  line-height: 38px;
  margin-bottom: 0;
}
.form-group textarea {
  resize: none;
}
.row .col-md-8 button {
  float: right;
  margin-right: -13px;
}
.row h2 {
  margin: 43.794px 0;
}
</style>
