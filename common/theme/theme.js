import store from '@/store/index.js'
import {
    mapState,
    mapGetters
} from 'vuex'

export default {
    install(Vue) {
        Vue.mixin({
            computed: {
                ...mapGetters(['userTheme'])
            },
            methods: {
                setTabbarLanguage(){
                    setTimeout(()=>{
                        uni.setTabBarItem({
                            index: 0,
                            text: this.$t('tab.home')
                        });
                        uni.setTabBarItem({
                            index: 1,
                            text: this.$t('tab.quote')
                        });
                        uni.setTabBarItem({
                            index: 2,
                            text: this.$t('tab.trade')
                        });
                        uni.setTabBarItem({
                            index: 3,
                            text: this.$t('tab.contract')
                        });
                        uni.setTabBarItem({
                            index: 4,
                            text: this.$t('tab.assets')
                        });
						if (this.userTheme == 'light') {
							uni.setTabBarStyle({
								backgroundColor: '#ffffff',
								color: '#898989',
								selectedColor: '#1f1f1f'
							});
						} else {
							uni.setTabBarStyle({
								backgroundColor: '#111111',
								color: '#898989',
								selectedColor: '#ffffff'
							});
						}
                    },200);
                },
                toggleUserTheme(data) {
                    store.commit('updateTheme', data)
                    // var data = {
                    //     color: color,
                    //     index: index
                    // };
                    store.commit('updateTheme', data);
                    // uni.hideLoading();
                    // if (color == "light") {
                    //     return "1"
                    // } else if (color == "dark") {
                    //     return "2"
                    // } else {
                    //     return "1"
                    // }
                },
                favStatus(cm_id,cid){
                    let list ;
                    if(cm_id === 1){
                        list = uni.getStorageSync('select-trade');
                    }
                    if(cm_id === 2){
                        list = uni.getStorageSync('select-contract');
                    }
                    if(typeof list !='object' || list === ''){
                        return false;
                    }
                    return list.filter(item => parseInt(item.id) === parseInt(cid)).length > 0;
                },
                addFav(cm_id,coin){
                    console.log("add fav run");
                    let list = [];
                    if(cm_id === 1){
                        list = uni.getStorageSync('select-trade');
                    }
                    if(cm_id === 2){
                        list = uni.getStorageSync('select-contract');
                    }
                    if(list){
                        list = list.filter(item => item.id !== coin.id);
                        list.push(coin);
                    }else{
                        list = [coin];
                    }
                    if(cm_id === 1){
                        uni.setStorageSync('select-trade', list);
                    }
                    if(cm_id === 2){
                        uni.setStorageSync('select-contract', list);
                    }
                    uni.setStorageSync('load', 1);
                    uni.$emit('addSelect');
                    uni.showToast({
                        title:this.$t('trade.ts1'),
                        icon:'none'
                    })
                },
                remFav(cm_id,cid){
                    console.log("rem fav run");
                    let list;
                    if(cm_id === 1){
                        list = uni.getStorageSync('select-trade');
                    }
                    if(cm_id === 2){
                        list = uni.getStorageSync('select-contract');
                    }
                    if(list){
                        list = list.filter(item => parseInt(item.id) !== parseInt(cid));
                        let key;
                        if(cm_id === 1){
                            key = 'select-trade';
                        }
                        if(cm_id === 2){
                            key = 'select-contract';
                        }
                        uni.setStorageSync(key, list);
                        if(list.length <= 0){
                            uni.removeStorageSync(key);
                        }
                        console.log(list);
                        uni.setStorageSync('load', 1);
                        uni.$emit('addSelect');
                        uni.showToast({
                            title:this.$t('trade.ts2'),
                            icon:'none'
                        })
                    }
                }
            },
        })
    }
}
