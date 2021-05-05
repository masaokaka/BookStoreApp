<template>
<v-container>
  <h2>このサイトについて</h2>
  <p>
    このサイトでは、本を探す・お気に入りに登録したりすることができるサイトです<br>
    今後実装予定の機能は以下です。<br>
    ※実装済みの機能は取り消し線が入っています。
  </p>
  <ul>
    <li v-for="todo,index in todos" :key="index">
      <del v-if="todo.done">{{todo.title}}</del>
      <span v-else>{{todo.title}}</span>
    </li>
  </ul>
</v-container>
</template>

<script>
export default {
  name: 'About',
  data(){
    return{
      todos:[
        {title:'Googleログイン、ログアウト機能',done:true},
        {title:'楽天API連携',done:true},
        {title:'お気に入り登録機能',done:true},
        {title:'重複アイテムを弾く機能',done:true},
        {title:'ページング機能',done:true},
        {title:'プロフィール設定機能',done:true},
        {title:'プロフィール更新機能',done:true},
        {title:'プロフィール表示機能',done:true},
    ]
    }
  },
}
</script>
