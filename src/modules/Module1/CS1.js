export default {
  data () {
    return {
      msg: this.getRes('csres'),
      componentName:"CustomComponent1"
    }
  },
  mounted() {
    console.log('CS1jssssss')
  },
  methods:{
    gologin(){
      this.$router.push("/");
    }
  }
}