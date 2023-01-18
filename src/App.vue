<template>
  <div id="app">
    <nav>
      <router-link to="/myPage">myPage(ログインしたら飛ぶページ)</router-link> <br/>
      <router-link to="/">Home</router-link> |
      <router-link to="/signIn">signIn</router-link> |
      <router-link to="/login">login</router-link> |
      <router-link to="/HomeView">HomeView</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
    <h2>--------------------------------------------------------</h2>
    <div class="todoArea" v-if="loginEmail">
      <button @click="signOut">signOut</button>
      <h2>ようこそ{{loginName}}さん</h2>
        <div v-for="(todo, index) in todos" v-bind:key="index">
          <div v-if="!todo.userEditing" id="aTodo">
            <input type="checkbox" v-model="todo.checkbox"  @keydown.enter="checkTodo(todo)">
            {{ todo.userTodo }}
            <button @click="editTodo(todo)">編集</button>
            <button @click="deleteTodo(todo)">削除</button>
          </div>
          <div v-if="todo.userEditing">
            <input type="text" ref="focusEditInput" v-model="todoEditContent" @keydown.enter="editTodo(todo)">
            <button @click="editTodo(todo)">完了</button>
          </div>
        </div>
        <div v-if="todoEditContent == ''">
          <input type="text" ref="focusAddInput" v-model="todoContent" @keydown.enter="addTodo">
          <button @click="addTodo">追加</button>
        </div>
    </div>
    <h2>--------------------------------------------------------</h2>
    <div class="signInAndloginArea" v-if="!loginEmail">
      <div>
        name
        <form action="">
          <input type="text" v-model="name">
        </form>
      </div>
      <div>
        email
        <form action="">
          <input type="text" v-model="email">
        </form>
      </div>
      <div>
        password
        <form action="">
          <input type="text" v-model="password">
        </form>
      </div>
      <div>
        <button @click="signIn">signIn</button><br/>
        <button @click="login">login</button><br/>
        <button @click="signOut">signOut</button>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.signInAndloginArea {
    height: 25vh;
    border: 1px solid;
    margin: 5% 30%;
    padding: 5% 0;
  }
</style>

<script>
  import firebase from 'firebase/app';
  import { format } from 'date-fns'
  // const db = firebase.firestore()
  import "firebase/firestore"
  const myTimestamp = firebase.firestore.Timestamp.now();
  const myToDated = myTimestamp.toDate();
  const myShaped = format(myToDated, 'yyyyMMddHHmmss');

export default {
  data() {
    return {
      loginName: '',
      loginEmail: '',
      loginUuid: '',
      name: '',
      email: '',
      password: '',
      todoContent: '',
      todoEditContent: '',
      users: [],
      todos: [],
    }
  },
  methods: {
    signIn() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        const uid = userCredential.user.uid
        this.addUser(uid)
        console.log('signIn', userCredential.user)
        alert('signInしました。loginしてください')
      })
      .catch((error) => {
        alert(error.message)
      });
    },
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        alert('loginしました', userCredential.user)
        this.fetchUser()
      })
      .catch((error) => {
        alert(error.message)
      });
    },
    signOut() {
      firebase.auth().signOut()
      .then(() => {
        alert('signOutしました', this.name)
      }).catch((error) => {
        alert(error.message)
      });
    },
    addUser(uid) {
      firebase.firestore().collection("users").add({
        userCreateAt: myShaped,
        userName: this.name,
        userEmail: this.email,
        userPassword: this.password,
        userUuid: uid,
      })
      .then((docRef) => {
        this.name = ''
        this.email = ''
        this.password = ''
        console.log("addUser run", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error.message);
      });
    },
    addTodo() {
      if(this.todoContent === '') {
        return
      } else {
        firebase.firestore().collection("todos").add({
          createAt: myShaped,
          lastEditAt: myShaped,
          userUuid: this.loginUuid,
          userTodo: this.todoContent,
          userEditing: false,
          checkbox: false,
        })
        .then((docRef) => {
          this.todoContent = ''
          console.log("addTodo run", docRef);
          this.fetchTodo()
        })
        .catch((error) => {
          console.error("Error adding document: ", error.message);
        });
      }
    },
    editTodo(todo) {
      console.log('editTodo',todo)
      if(todo.userEditing) {
        firebase.firestore().collection("todos").doc(todo.docUid).update({
          userTodo: this.todoEditContent,
          lastEditAt: myShaped,
          userEditing: false,
        })
        .then(() => {
          this.todoEditContent = ''
          this.fetchTodo()
        })
        .catch((error) => {
          console.error("Error editing document: ", error.message);
        });
      } else {
        firebase.firestore().collection("todos").doc(todo.docUid).update({
          lastEditAt: myShaped,
          userEditing: true,
        })
        .then(() => {
          this.todoEditContent = todo.userTodo
          console.log('editTodo-todoEditContent')
          this.fetchTodo()
        })
        .catch((error) => {
          console.error("Error editing document: ", error.message);
        });
      }
    },
    deleteTodo(todo) {
      console.log('deleteTodo run', 'これから削除します', todo);
      firebase.firestore().collection("todos").doc(todo.docUid).delete()
      .then(() => {
        console.log('deleteTodo run', 'アイテムを削除しました');
        this.fetchTodo()
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    },
    checkTodo(todo) {
      if(!todo.checkbox) {
        return
      } else {
          // todo クラスのつけ外しによってスタイルを変更させたい。
      }
    },
    fetchUser() {
      this.users = []
      firebase.firestore().collection("users").where('userUuid', "==", this.loginUuid).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.users.push(doc.data())
          this.loginName = doc.data().userName
          this.name = ''
          this.email = ''
          this.password = ''
          console.log('fetchUser run', doc.id, " => ", doc.data())
        });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    },
    fetchTodo() {
      this.todos = []
      firebase.firestore().collection("todos").where('userUuid', "==", this.loginUuid).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log('fetchtodo run', doc.id, " => ", doc.data());
          const todoData = {
            ...doc.data(),
            docUid: doc.id //firestore にないプロパティを加えて、todosにpushする。
          }
          this.todos.push(todoData)// = で代入すると一つの値しか入れられないが、push にすることで配列として挿入可能
        });
        this.sortTodo()
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    },
    sortTodo() {
      this.todos.sort((a, b) => {
        if (a.createAt > b.createAt) {
          return 1;
        }else if (a.createAt < b.createAt) {
          return -1;
        } else {
          return 0;
        }
      });
    },
    observeUser() {
      firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loginEmail = user.email
        this.loginUuid = user.uid
        this.fetchTodo()
        this.fetchUser()
        console.log('observeUser', user)
        firebase.firestore().collection("users").where('userUuid', "==", user.uid).get()
        .then((querySnapshot) => {
          user = querySnapshot.docs[0].data() // 余計な情報を省く。 //todo なぜ[0]を指定する？
          console.log('observe run get()', user)
        })
        .catch((error) => {
            console.log('todo を get()できませんでした',error);
        });
      } else {
        // User is signed out
        // ...
        this.loginName = ''
        this.loginEmail = ''
        this.loginUuid = ''
        this.users = []
        this.todos = []
      }
    })
    }
  },
  created() {
    this.observeUser()
  }
}
</script>
