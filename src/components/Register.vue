<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <img src="../../public/images/icon.png" alt="" class="mx-auto d-block">
                    <form @submit.prevent="onsubmit">
                        <div class="form-group">
                            <label for="email">邮箱</label>
                            <input type="email" class="form-control" v-model="email">
                        </div>
                         <div class="form-group">
                            <label for="password">密码</label>
                            <input type="password" class="form-control" v-model="password">
                        </div>
                         <div class="form-group">
                            <label for="confirm-password">确认密码</label>
                            <input type="password" class="form-control" v-model="confirmPassword">
                        </div>
                        <button tpye="sumbit" class='btn btn-success btn-block'>提交</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bmon from 'hydrogen-js-sdk'
Bmob.initialize("a2d4e5085b301996b25a43c1fe5b47b5", "010535e63b33f7a56c1e466ef69fe09a");
export default {
    data(){
        return {
            email:'',
            password:'',
            confirmPassword:''
        }
    },
    methods:{
        onsubmit(){
            if(this.password==this.confirmPassword){
                const query =Bmob.Query('Pizza_User');
                    query.set('email',this.email);
                    query.set('password',this.password);
                    query.save().then(res=>this.$router.push({path:'/login'}));
            } else {
                alert('密码不一致');
            }
        }
    }
}
</script>
