<template>
    <section class="card mb-3 text-dark bg-light">
        <header class='card-header'>
            联系我们
        </header>
        <article class="card-body">
            <h4 class="card-title">
                联系我们
            </h4>
            <router-link :to="{name:'phoneLink'}">电话</router-link> 
            <router-link :to="{name:'emailLink'}">邮箱</router-link>
            <router-view></router-view>
        </article>
        
    </section>
</template>

<style scoped>
    .card {
        margin-top: 8px;
    }
    .card-body a {
       margin-right: 2px;
    }
</style>


