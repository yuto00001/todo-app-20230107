<template>
  <div class="signIn">
    <h1>This is an signIn page</h1>
    <div class="signInAndloginArea">
      <div>
        name
        <form action="">
          <input type="text">
        </form>
      </div>
      <div>
        email
        <form action="">
          <input type="text">
        </form>
      </div>
      <div>
        password
        <form action="">
          <input type="text">
        </form>
      </div>
      <div>
        <button>signIn</button><br/>
        <router-link to="/googleSignIn">Google ログイン</router-link><br/>
        <router-link to="/login">既に登録済みの方はこちら</router-link>
      </div>
    </div>
  </div>
</template>
<style>
</style>
