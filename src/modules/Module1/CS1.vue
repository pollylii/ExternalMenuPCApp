<template>
  <div class="hello">
    <h2>{{msg}}</h2>

    The following component is a standard component:
   
    <component v-bind:is="componentName"></component>
    <BR /><BR />
    <button v-on:click="gologin">Continue Login</button>
  </div>
</template>

<!--<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: this.getRes('csres'),
      componentName:"CustomComponent1"
    }
  },
  methods:{
    gologin(){
      this.$router.push("/");
    }
  }
}
</script>
-->

<script>
    import cs1Js from './CS1.js';

    export default cs1Js;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
