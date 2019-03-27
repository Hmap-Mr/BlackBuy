<template>
<div>
    <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
    </div>
    <div class="section">
        <div class="wrapper">
            <div class="wrap-box">
                <div class="left-220" style="margin: 0px;">
                    <div class="banner-nav">
                        <ul>
                            <li v-for="(item,index) in catelist" :key="index">
                                <h3>
                                    <i class="iconfont icon-arrow-right"></i>
                                    <span>{{ item.title }}</span>
                                    <p>
                                        <span v-for="(it,index) in item.subcates" :key="index">
                                            {{ it.title }}&nbsp;
                                        </span>
                                    </p>
                                </h3>
                                <div class="item-box">
                                    <dl>
                                        <dt>
                                            <a href="/goods/40.html">{{ item.title }}</a>
                                        </dt>
                                        <dd>
                                            <a href="/goods/43.html" v-for="(it,index) in item.subcates" :key="index">{{ it.title }}</a>
                                        </dd>
                                    </dl>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--幻灯片-->
                <div class="left-705">
                    <div class="banner-img">
                        <div id="focus-box" class="focus-box">
                            <ul class="slides">
                                <li class="" style="width: 100%;height:100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;">
                                    <a href="/goods.html">
                                        <img style="width: 100%;height:100%;" src="http://39.108.135.214:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg" draggable="false">
                                    </a>
                                </li>
                                <li style="width: 100%;height:100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;" class="flex-active-slide">
                                    <a href="/goods.html">
                                        <img style="width: 100%;height:100%;" src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200314272543.jpg" draggable="false">
                                    </a>
                                </li>
                            </ul>
                            <ol class="flex-control-nav flex-control-paging">
                                <li>
                                    <a class="">1</a>
                                </li>
                                <li>
                                    <a class="flex-active">2</a>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <!--/幻灯片-->
                <div class="left-220">
                    <ul class="side-img-list">
                        <li v-for='(item,index) in toplist' :key="index">
                            <div class="img-box">
                                <label>{{ index+1 }}</label>
                                <img :src="item.img_url">
                            </div>
                            <div class="txt-box">
                                <a href="/goods/show-98.html"> {{ item.title }} </a>
                                <span>{{ item.add_time | formatTime}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="section" v-for="(item,index) in goodslist" :key="index">
        <div class="main-tit">
            <h2>{{ item.catetitle }}</h2>
            <p>
                <a href="/goods/43.html" v-for="(it,index) in item.level2catelist" :key="index">{{ it.subcatetitle }}</a>
                <a href="/goods/40.html">更多
                    <i>+</i>
                </a>
            </p>
        </div>
        <div class="wrapper clearfix">
            <div class="wrap-box">
                <ul class="img-list">
                    <li v-for="(it,index) in item.datas" :key="index">
                        <!-- <a href="#/site/goodsinfo/87" class=""> -->
                        <router-link :to="'/detail/'+it.artID" >
                            <div class="img-box">
                                <img :src="it.img_url">
                            </div>
                            <div class="info">
                                <h3>{{ it.artTitle }}</h3>
                                <p class="price">
                                    <b>{{ it.sell_price }}</b>元</p>
                                <p>
                                    <strong>库存 {{ it.stock_quantity }}</strong>
                                    <span>市场价：
                                        <s>{{ it.market_price }}</s>
                                    </span>
                                </p>
                            </div>
                        </router-link>
                        <!-- </a> -->
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// 导入axios
// import axios from 'axios';
// 导入moment
import moment from 'moment';
export default {
    name:"index",
    data(){
        return {
            // 分类数据
            catelist:[],
            // 轮播图数据
            sliderlist:[],
            // 热卖数据
            toplist:[],
            // 底部 分类数据
            goodslist:[],
        }
    },
    filters:{
        formatTime(value){
           return moment(value).format('YYYY-MM-DD');
        },
    },
    created() {
        this.$axios.get("http://111.230.232.110:8899/site/goods/gettopdata/goods")
             .then((res)=>{
                //  console.log(res);
                 this.catelist = res.data.message.catelist;
                 this.sliderlist = res.data.message.sliderlist;
                 this.toplist = res.data.message.toplist;
             })
        this.$axios.get("http://111.230.232.110:8899/site/goods/getgoodsgroup")
             .then((res)=>{
                //  console.log(res);
                 this.goodslist = res.data.message;
             })
    },
}
</script>

<style>

</style>
