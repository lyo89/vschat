var firebaseConfig = {
  apiKey: "AIzaSyAupIl4Y7lxJ9D5xKExMoOfOl64pLwfUCU",
  authDomain: "vschat-5e6b5.firebaseapp.com",
  databaseURL: "https://vschat-5e6b5.firebaseio.com",
  projectId: "vschat-5e6b5",
  storageBucket: "vschat-5e6b5.appspot.com",
  messagingSenderId: "578493728088",
  appId: "1:578493728088:web:cbcf561538d4239627912d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  
  const database = firebase.firestore();


  database.settings({
   timestampsInSnapshots: true
  });

  const collection = database.collection('chat');

  

  var app = new Vue({
    el:　'#app',
    data:{
      msg: '',
      chat:{}
    },
    created(){
      collection.orderBy('created').onSnapshot(querySnapshot =>{
        const obj = {}
        querySnapshot.forEach(doc=>{
          obj[doc.id]= doc.data()
        })
        this.chat = obj
        })
    },


    methods: {


     addchat(){
      if(this.msg === ""){
        alert("メッセージを入力してください");
        return}
      collection.add({
        name: this.msg,
        created: firebase.firestore.FieldValue.serverTimestamp()
      });
      this.msg = '';
      

      
    },
    deletechat: function(key){
      if(confirm('削除してもよろしいですか？')){
      collection.doc(key).delete();
      }
    },
    scrollToEnd(){
      const container = document.querySelector('.scroll');
      const scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    }
  },

    updated(){
      this.scrollToEnd();
    }
  });