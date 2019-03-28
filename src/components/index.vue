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
                        <!-- element-ui 跑马灯 组件 -->
                        <el-carousel height="341px">
                            <el-carousel-item v-for="(item,index) in sliderlist" :key="index">
                                <!-- <h3>{{ item }}</h3> -->
                                <router-link class="slider-a" :to="'/detail'+item.id">
                                    <img class="slider-img" :src="item.img_url" >
                                </router-link>
                            </el-carousel-item>
                        </el-carousel>
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
                                <!-- <a href="/goods/show-98.html"> {{ item.title }} </a> -->
                                <router-link :to="'/detail/'+item.id"> {{ item.title }} </router-link>
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
// import moment from 'moment';
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
    // filters:{
    //     formatTime(value){
    //        return moment(value).format('YYYY-MM-DD');
    //     },
    // },
    created() {
        this.$axios.get("/site/goods/gettopdata/goods")
             .then((res)=>{
                //  console.log(res);
                 this.catelist = res.data.message.catelist;
                 this.sliderlist = res.data.message.sliderlist;
                 this.toplist = res.data.message.toplist;
             })
        this.$axios.get("/site/goods/getgoodsgroup")
             .then((res)=>{
                //  console.log(res);
                 this.goodslist = res.data.message;
             })
    },
}
</script>

<style>
    .slider-a {
        display: block;
        width: 100%;
        height: 100%;
    }
    .slider-img {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>
