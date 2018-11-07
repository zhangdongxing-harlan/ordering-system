
<template>
    <div id="menu" class='row'>
        <!-- 菜单 -->
        <div class="col-sm-12 col-md-8">
            <table class="table">
                <thead class="thead-default">
                    <tr>
                        <th>品种</th>
                        <th>尺寸</th>
                        <th>价格</th>
                        <th>加入</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in pizzaDatas" :key="item.objectId">
                        <td><strong>{{item.name}}</strong></td>
                        <td>{{item.size}}</td>
                        <td>{{item.price}}</td>
                        <td><button type="button" @click="addToBaskets(item)" class='btn btn-sm btn-outline-success'>+</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-sm-12 col-md-4">
            <div v-if="baskets.length > 0">
                <table class="table">
                    <thead class="thead-default">
                        <tr>
                            <th>数量</th>
                            <th>品种</th>
                            <th>价格</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in baskets" :key="item.id">
                            <td>
                                <button class="primary" type="button" @click="decreaseQuantity(item)">-</button>
                                <span>{{item.quantity}}</span>
                                <button class="primary" type="button" @click="increaseQuantity(item)">+</button>
                            </td>
                            <td>{{item.name+item.size}}</td>
                            <td>{{item.price * item.quantity}}</td>
                        </tr>
                    </tbody>
                </table>
                <p>总价{{total}}</p>
                <button class="btn btn-success btn-block">提交</button>
            </div>
            <p v-else>购物车没有商品</p>
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
      baskets: []
    };
  },
  computed: {
    pizzaDatas() {
      return this.$store.state.menuItems;
    },
    total() {
      let money = 0;
      for (let item of this.baskets) {
        money += item.price * item.quantity;
      }
      return money;
    }
  },
  methods: {
    addToBaskets(item) {
      let basket = {
        name: item.name,
        price: item.price,
        size: item.size,
        quantity: 1,
        id: item.objectId
      };
      if (this.baskets.length > 0) {
        let result = this.baskets.filter(value => {
          return value.name == basket.name && value.price == basket.price;
        });
        if (result != null && result.length > 0) {
          result[0].quantity++;
        } else {
          this.baskets.push(basket);
        }
      } else {
        this.baskets.push(basket);
      }
    },
    decreaseQuantity(item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.baskets.splice(this.baskets.indexOf(item), 1);
      }
    },
    increaseQuantity(item) {
      item.quantity++;
    }
  },
  created() {
    const query = Bmob.Query("Pizza");
    query.find().then(res => {
      this.$store.commit('setMenuItems',res);
    });
  }
};
</script>
<style scoped>
.primary {
  background-color: inherit;
  outline: none;
  border: 0;
  cursor: pointer;
}
</style>
