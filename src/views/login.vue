<template>
  <div class="login">
    <h1>This is an login page</h1>
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
        <button>login</button><br/>
        <button>Google ログイン</button><br/>
        <button>パスワードを忘れた</button><br/>
        <router-link to="/signIn">まだ登録がお済みでない方はこちら</router-link>
      </div>
    </div>
  </div>
</template>
<style>

</style>
