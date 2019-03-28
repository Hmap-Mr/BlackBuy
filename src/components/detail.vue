<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box pic-box-warp">
                                <el-carousel>
                                    <el-carousel-item v-for="(item,index) in imglist" :key="index">
                                       <img :src="item.thumb_path" class="pic_img">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                            <div class="goods-spec">
                                <h1>{{ goodsinfo.title }}</h1>
                                <p class="subtitle">{{ goodsinfo.sub_title }}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{ goodsinfo.good_no }}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{ goodsinfo.market_price }}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{ goodsinfo.sell_price }}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="num" @change="handleChange" :min="0" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{ goodsinfo.stock_quantity }}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a @click="index=1" :class="{selected:index==1}" href="javascript:;">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="index=2" :class="{selected:index==2}" href="javascript:;">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <div v-show="index==1" class="tab-content" :class="{entry:index==1}" style="display: block;" v-html="goodsinfo.content">
                                内容
                            </div>
                            <div v-show="index==2" class="tab-content" :class="{entry:index==2}" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model="comment" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="postComment" @keyup.enter="postComment">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="commentlist.lenth==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item,index) in commentlist" :key="index">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{ item.user_name }}</span>
                                                    <span>{{ item.add_time | formatTime("YYYY-MM-DDTHH:mm:ss") }}</span>
                                                    <span> ip : {{ item.user_ip.substr(7) }}</span>
                                                </div>
                                                <p>{{ item.content }}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <el-pagination
                                          @size-change="handleSizeChange"
                                          @current-change="handleCurrentChange"
                                          :current-page="pageIndex"
                                          :page-sizes="[5, 10, 15, 20]"
                                          :page-size="pageSize"
                                          layout="total, sizes, prev, pager, next, jumper"
                                          :total="totalcount">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item,index) in hotgoodslist" :key="index">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class="">{{ item.title }}</a> -->
                                            <router-link :to="'/detail/'+item.id">{{ item.title }}</router-link>
                                            <span>{{ item.add_time | formatTime("YYYY年MM月DD日") }}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'

// 导入moment
// import moment from 'moment';
export default {
    name:"detail",
    data(){
        return {
            goodsinfo:{},
            index:1,
            hotgoodslist:[],
            num:0,
            imglist:[],
            comment:"",
            pageIndex:1,
            pageSize:10,
            totalcount:0,
            commentlist:[],

        }
    },
    methods: {
        getDetail(){
            this.$axios.get(`/site/goods/getgoodsinfo/${this.$route.params.id}`)
                 .then((res)=>{
                    //  console.log(res);
                     this.goodsinfo = res.data.message.goodsinfo;
                     this.hotgoodslist = res.data.message.hotgoodslist;
                     this.imglist = res.data.message.imglist;
                 });
        },
        handleChange(value){
            // console.log(value);
        },
        postComment(){
            if(this.comment === ""){
                this.$message.error("哥们,写点什么吧~!");
            }else{
                this.$axios
                    .post(`/site/validate/comment/post/goods/${this.$route.params.id}`,{
                        commenttxt:this.comment
                    })
                    .then((res)=>{
                        if(res.data.status === 0){
                            this.$message.success(res.data.message);
                            this.comment = "";
                            this.pageIndex = 1;
                            this.getComment();
                        }
                    })
            }
        },
        getComment(){
            this.$axios.get(`/site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
                       .then(res=>{
                        //    console.log(res);
                           this.totalcount = res.data.totalcount;
                           this.commentlist = res.data.message;
                       })
        },
        handleSizeChange(size){
            this.pageSize = size;
            this.getComment();
        },
        handleCurrentChange(current){
            this.pageIndex = current;
            this.getComment();
        },

    },
    created() {
        this.getDetail();
        this.getComment();
    },
    watch: {
        $route(value,oldValue){
            this.getDetail();
            this.getComment();
        }
    },
}
</script>

<style>
    .pic-box-warp{
        width: 370px;
        height: 300px;
    }
    .pic_img{
        width: 370px;
        height: 300px;
    }
</style>
