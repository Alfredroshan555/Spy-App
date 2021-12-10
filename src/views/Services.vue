<template>
  <div class="section">
    <!-- <h1>Services provided</h1>
    <div class="cards">
      <div class="card">
        <h5 class="card-header">Featured</h5>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>

      <div class="card">
        <h5 class="card-header">Featured</h5>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>

      <div class="card">
        <h5 class="card-header">Featured</h5>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div> -->
    <div class="products">
      <div v-if="!paidFor">
        <h1>Get this Service- $0</h1>

        <p>{{ product.description }}</p>

        <h3></h3>

        <button @click="payPal">Pay</button>
      </div>

      <div v-if="paidFor">
        <h1>You have successfully applied for this service!!</h1>
      </div>

      <div v-if="!paidFor">
        <h1>Get this Service- $0</h1>

        <p>{{ product.description }}</p>

        <!-- <img
          width="400"
          src="https://images-na.ssl-images-amazon.com/images/I/61yZD4-mKjL._SX425_.jpg"
        /> -->

        <button @click="payPal">Pay</button>
      </div>

      <div v-if="paidFor">
        <h1>You have successfully applied for this service!!</h1>
      </div>
    </div>

    <div ref="paypal" class="paypal" v-if="!paidFor"></div>
  </div>
</template>

<script>
export default {
  name: "Services",
  data: function() {
    return {
      loaded: false,
      paidFor: false,
      product: {
        price: 777.77,
        description: "Law firms and services",
        img: "",
      },
    };
  },
  mounted() {
    // const script = document.createElement("script");
    // script.src =
    //   "https://www.paypal.com/sdk/js?client-id=ARNRNvgJTH0oaRUrQUC-p-MgCXzIOl5T6um6YqdW7U9mkwzV-ZkfCtp9c0QH6dRWArJY85Yh3rLCT5Vu";
    // script.addEventListener("load", this.setLoaded);
    // document.body.appendChild(script);
  },
  methods: {
    payPal() {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=ARNRNvgJTH0oaRUrQUC-p-MgCXzIOl5T6um6YqdW7U9mkwzV-ZkfCtp9c0QH6dRWArJY85Yh3rLCT5Vu";
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);
    },
    setLoaded() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: "USD",
                    value: this.product.price,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.data;
            this.paidFor = true;
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },
  },
};
</script>

<style lang="scss" scoped>
// .cards {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   vertical-align: top;
// }
// h3 {
//   margin: 40px 0 0;
// }
// ul {
//   list-style-type: none;
//   padding: 0;
// }
// li {
//   display: inline-block;
//   margin: 0 10px;
// }
// a {
//   color: #42b983;
// }
.paypal {
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: top;
  padding-top: 50px;
}
.products {
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: top;
  padding-top: 50px;
}
</style>
