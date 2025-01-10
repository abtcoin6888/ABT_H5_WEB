<template>
    <view class="store" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     :padding="0"
                     zIndex="999"
                     background="var(--background-primary)"
                     custom
                     @init="navInit">
            <view class="nav-bar">
                <scroll-view class="nav-scroll"
                             show-scrollbar="false"
                             scroll-with-animation="true"
                             :scroll-into-view="`scrollTab${active}`">
                    <view class="item"
                          :id="`scrollTab${index}`"
                          v-for="(item,index) in navTabs" :key="index"
                          @click="active = index">
                        <text class="font-16 font-weight"
                              :class="active == index ? 'color-black' : 'color-gray'">
                            {{ item }}
                        </text>
                    </view>
                </scroll-view>
                <image class="nav-search"
                       @click="$mroute.coinSearch()"
                       :src="`/static/newImage/search-${userTheme}.png`"
                       mode="widthFix">
                </image>
            </view>
        </fui-nav-bar>
        <view class="store-container">
            <swiper class="store-container-swiper"
                    :current="active"
                    :duration="300"
                    :style="`height: ${containerHeight}px`"
                    @change="swiperChange">
                <!--    自选-现货-合约      -->
                <swiper-item class="store-container-swiper-item">
                    <!--   subtabs  -->
                    <view class="sub-tabs"
                          id="subtabs">
                        <scroll-view :scroll-x="true"
                                     class="sub-tabs-scroll">
                            <view class="item"
                                  :class="{'item-active': symbolIndex === index}"
                                  v-for="(item,index) in options" :key="index"
                                  @click="subtabChange(index)">
                                <text class="font-12 font-weight"
                                      :class="symbolIndex === index ? 'color-black' : 'color-gray'">
                                    {{ item }}
                                </text>
                            </view>
                        </scroll-view>
                        <view class="edit-box"
                              @click="$mroute.editMine(this.symbolIndex)">
                            <image class="edit-image"
                                   :src="`/static/newImage/edit-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                    </view>
                    <!--   subswiper  -->
                    <swiper class="sub-swiper"
                            :current="symbolIndex"
                            :duration="subSwiperDuration"
                            :style="`height: ${containerHeight}px`"
                            @change="symbolIndex = $event.detail.current; subSwiperDuration = 300;">
                        <swiper-item class="sub-swiper-item">
                            <scroll-view :scroll-y="true"
                                         :style="`height: ${containerHeight}px`">
                                <!-- checklist -->
                                <template v-if="mList && mList.length === 0">
                                    <view class="checkbox-group-warp">
                                        <view class="checkbox-item bg-gray"
                                              v-for="(item, index) in currency" :key="'lc' + item.id"
                                              @click="item.select = !item.select">
                                            <view class="item-cell">
                                                <text class="font-12 color-gray font-weight"> {{
                                                        item['symbol']
                                                    }}USDT
                                                </text>
                                            </view>
                                            <view class="item-cell">
                                                <text class="font-14 color-black font-bold">
                                                    {{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                                </text>
                                            </view>
                                            <view class="item-cell">
                                                <text class="font-12 color-gray"
                                                      :class="{
                                                        'color-gray': item['change_rate'] == 0,
                                                        'price_down': item['change_rate'] < 0,
                                                        'price_up': item['change_rate'] > 0
                                                    }">
                                                    {{ item['change_rate'] }}%
                                                </text>
                                            </view>
                                            <view class="checkbox">
                                                <fui-checkbox :isCheckMark="true"
                                                              checkMarkColor="#03aac7"
                                                              :checked="!item.select"
                                                              scaleRatio="1.4"
                                                              @change="item.select = !item.select">
                                                </fui-checkbox>
                                            </view>
                                        </view>
                                    </view>
                                    <view class="checkbox-confirm">
                                        <fui-button height="78rpx"
                                                    radius="78rpx"
                                                    color="var(--background-primary)"
                                                    background="var(--content-primary)"
                                                    size="26"
                                                    @click="selectMine()">
                                            {{ $t('index.add_own') }}
                                        </fui-button>
                                    </view>
                                </template>
                                <!-- select currency list -->
                                <template v-else>
                                    <view class="sort">
                                        <view class="sort-left">
                                            <view class="sort-item" v-for="(item,index) in sort.slice(0, 2)"
                                                  :key="item.id"
                                                  @click="switchSort(item.id)">
                                                <text class="font-11 color-gray">{{ item.text }}</text>
                                                <image class="sort-image"
                                                       :src="sort[item.id]['active']"
                                                       mode="widthFix">
                                                </image>
                                            </view>
                                        </view>
                                        <view class="sort-right">
                                            <view class="sort-item" v-for="(item,index) in sort.slice(2, sort.length)"
                                                  :key="item.id"
                                                  @click="switchSort(item.id)">
                                                <text class="font-11 color-gray">{{ item.text }}</text>
                                                <image class="sort-image"
                                                       :src="sort[item.id]['active']"
                                                       mode="widthFix">
                                                </image>
                                            </view>
                                        </view>
                                    </view>
                                    <view class="currency-list">
                                        <view class="list-item"
                                              v-for="(item, index) in mList" :key="'m'+item.id"
                                              @click="toKline(item.id,1)">
                                            <view class="item-left">
                                                <view class="item-column">
                                                    <view class="currency-text">
                                                        <text class="font-14 color-black font-bold"
                                                              v-if="symbolIndex === 0">
                                                            {{ item['symbol'] }}
                                                            <text class="font-12 color-gray text-before">/ USDT</text>
                                                        </text>
                                                        <text class="font-14 color-black font-bold"
                                                              v-if="symbolIndex === 1">
                                                            {{ item['symbol'] }}USDT
                                                        </text>
                                                    </view>
                                                    <text class="font-12 color-gray text-desc">
                                                        {{ $util.bigNumberToString(item['quota']) }}
                                                    </text>
                                                </view>
                                                <view class="item-column">
                                                    <text class="font-14 color-black font-bold">
                                                        {{
                                                            $util.thousandSeparator(item['new_price'], item['decimals'])
                                                        }}
                                                    </text>
                                                    <text class="font-12 color-gray text-desc">
                                                        ≈{{ symbol }}{{
                                                            $util.thousandSeparator(symbol_rate * item['new_price'])
                                                        }}
                                                    </text>
                                                </view>
                                            </view>
                                            <view class="item-rate"
                                                  :class="{
                                                        'bg-gray': item['change_rate'] == 0,
                                                        'bg-green': item['change_rate'] > 0,
                                                        'bg-red': item['change_rate'] < 0
                                                    }">
                                                <text class="font-12 font-weight always-white">
                                                    {{ $util.thousandSeparator(item['change_rate']) }}%
                                                </text>
                                            </view>
                                        </view>
                                    </view>
                                    <empty-view :width="750"
                                                :height="500"
                                                :visible="mList.length === 0"
                                                :title="$t('list.not_data')">
                                    </empty-view>
                                </template>
                            </scroll-view>
                        </swiper-item>
                        <swiper-item class="sub-swiper-item">
                            <!-- checklist -->
                            <template v-if="mList && mList.length === 0">
                                <view class="checkbox-group-warp">
                                    <view class="checkbox-item bg-gray"
                                          v-if="contract.length > 0"
                                          v-for="(item, index) in contract[0]['currency']"
                                          :key="'lc' + item.id"
                                          @click="item.select = !item.select">
                                        <view class="item-cell">
                                            <text class="font-12 color-gray font-weight"> {{
                                                    item['symbol']
                                                }}USDT
                                            </text>
                                        </view>
                                        <view class="item-cell">
                                            <text class="font-14 color-black font-bold">
                                                {{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                            </text>
                                        </view>
                                        <view class="item-cell">
                                            <text class="font-12 color-gray"
                                                  :class="{
                                                        'color-gray': item['change_rate'] == 0,
                                                        'price_down': item['change_rate'] < 0,
                                                        'price_up': item['change_rate'] > 0
                                                    }">
                                                {{ $util.thousandSeparator(item['change_rate']) }}%
                                            </text>
                                        </view>
                                        <view class="checkbox">
                                            <fui-checkbox :isCheckMark="true"
                                                          checkMarkColor="#03aac7"
                                                          :checked="!item.select"
                                                          scaleRatio="1.4"
                                                          @change="item.select = !item.select">
                                            </fui-checkbox>
                                        </view>
                                    </view>
                                </view>
                                <view class="checkbox-confirm">
                                    <fui-button height="78rpx"
                                                radius="78rpx"
                                                color="var(--background-primary)"
                                                background="var(--content-primary)"
                                                size="26"
                                                @click="selectMine()">
                                        {{ $t('index.add_own') }}
                                    </fui-button>
                                </view>
                            </template>
                            <!-- select currency list -->
                            <template v-else>
                                <view class="sort">
                                    <view class="sort-left">
                                        <view class="sort-item" v-for="(item,index) in sort.slice(0, 2)"
                                              :key="item.id"
                                              @click="switchSort(item.id)">
                                            <text class="font-11 color-gray">{{ item.text }}</text>
                                            <image class="sort-image"
                                                   :src="sort[item.id]['active']"
                                                   mode="widthFix">
                                            </image>
                                        </view>
                                    </view>
                                    <view class="sort-right">
                                        <view class="sort-item" v-for="(item,index) in sort.slice(2, sort.length)"
                                              :key="item.id"
                                              @click="switchSort(item.id)">
                                            <text class="font-11 color-gray">{{ item.text }}</text>
                                            <image class="sort-image"
                                                   :src="sort[item.id]['active']"
                                                   mode="widthFix">
                                            </image>
                                        </view>
                                    </view>
                                </view>
                                <view class="currency-list">
                                    <view class="list-item"
                                          v-for="(item, index) in mList" :key="'m'+item.id"
                                          @click="toKline(item.id,1)">
                                        <view class="item-left">
                                            <view class="item-column">
                                                <view class="currency-text">
                                                    <text class="font-14 color-black font-bold"
                                                          v-if="symbolIndex === 0">
                                                        {{ item['symbol'] }}
                                                        <text class="font-12 color-gray text-before">/ USDT</text>
                                                    </text>
                                                    <text class="font-14 color-black font-bold"
                                                          v-if="symbolIndex === 1">
                                                        {{ item['symbol'] }}USDT
                                                    </text>
                                                </view>
                                                <text class="font-12 color-gray text-desc">
                                                    {{ $util.bigNumberToString(item['quota']) }}
                                                </text>
                                            </view>
                                            <view class="item-column">
                                                <text class="font-14 color-black font-bold">
                                                    {{
                                                        $util.thousandSeparator(item['new_price'], item['decimals'])
                                                    }}
                                                </text>
                                                <text class="font-12 color-gray text-desc">
                                                    ≈{{ symbol }}{{
                                                        $util.thousandSeparator(symbol_rate * item['new_price'])
                                                    }}
                                                </text>
                                            </view>
                                        </view>
                                        <view class="item-rate"
                                              :class="{
                                                        'bg-gray': item['change_rate'] == 0,
                                                        'bg-green': item['change_rate'] > 0,
                                                        'bg-red': item['change_rate'] < 0
                                                    }">
                                            <text class="font-12 font-weight always-white">
                                                {{ $util.thousandSeparator(item['change_rate']) }}%
                                            </text>
                                        </view>
                                    </view>
                                </view>
                                <empty-view :width="750"
                                            :height="500"
                                            :visible="mList.length === 0"
                                            :title="$t('list.not_data')">
                                </empty-view>
                            </template>
                        </swiper-item>
                    </swiper>
                </swiper-item>
                <!--    trade      -->
                <swiper-item class="store-container-swiper-item">
                    <scroll-view :scroll-y="true"
                                 :style="`height: ${containerHeight}px`">
                        <view class="sub-tabs"
                              id="subtabs">
                            <scroll-view :scroll-x="true"
                                         class="sub-tabs-scroll">
                                <view class="item"
                                      :class="{'item-active': tradeActive === index}"
                                      v-for="(item,index) in tradeLabel" :key="index"
                                      @click="tradeActive = index">
                                    <text class="font-12 font-weight"
                                          :class="tradeActive === index ? 'color-black' : 'color-gray'">
                                        {{ item }}
                                    </text>
                                </view>
                            </scroll-view>
                        </view>
                        <view class="sort">
                            <view class="sort-left">
                                <view class="sort-item" v-for="(item,index) in sort.slice(0, 2)"
                                      :key="item.id"
                                      @click="switchSort(item.id)">
                                    <text class="font-11 color-gray">{{ item.text }}</text>
                                    <image class="sort-image"
                                           :src="sort[item.id]['active']"
                                           mode="widthFix">
                                    </image>
                                </view>
                            </view>
                            <view class="sort-right">
                                <view class="sort-item" v-for="(item,index) in sort.slice(2, sort.length)"
                                      :key="item.id"
                                      @click="switchSort(item.id)">
                                    <text class="font-11 color-gray">{{ item.text }}</text>
                                    <image class="sort-image"
                                           :src="sort[item.id]['active']"
                                           mode="widthFix">
                                    </image>
                                </view>
                            </view>
                        </view>
                        <view class="currency-list">
                            <view class="list-item"
                                  v-for="(item, index) in currency" :key="'tl' + item.id"
                                  @click="toKline(item.id,1)">
                                <view class="item-left">
                                    <view class="item-column">
                                        <view class="currency-text">
                                            <text class="font-14 color-black font-bold">
                                                {{ item['symbol'] }}
                                                <text class="font-12 color-gray text-before">/ USDT</text>
                                            </text>
                                        </view>
                                        <text class="font-12 color-gray text-desc">
                                            {{ $util.bigNumberToString(item['quota']) }}
                                        </text>
                                    </view>
                                    <view class="item-column">
                                        <text class="font-14 color-black font-bold">
                                            {{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                        </text>
                                        <text class="font-12 color-gray text-desc">
                                            ≈{{ symbol }}
                                            {{ $util.thousandSeparator(symbol_rate * item['new_price']) }}
                                        </text>
                                    </view>
                                </view>
                                <view class="item-rate"
                                      :class="{
                                      'bg-gray': item['change_rate'] == 0,
                                      'bg-green': item['change_rate'] > 0,
                                      'bg-red': item['change_rate'] < 0
                                       }">
                                    <text class="font-12 font-weight always-white">
                                        {{ $util.thousandSeparator(item['change_rate']) }}%
                                    </text>
                                </view>
                            </view>
                        </view>
                        <empty-view :width="750"
                                    :height="500"
                                    :visible="currency.length === 0"
                                    :title="$t('list.not_data')">
                        </empty-view>
                    </scroll-view>
                </swiper-item>
                <!--    contract      -->
                <swiper-item class="store-container-swiper-item">
                    <scroll-view :scroll-y="true"
                                 :style="`height: ${containerHeight}px`">
                        <view class="sub-tabs"
                              id="subtabs">
                            <scroll-view :scroll-x="true"
                                         class="sub-tabs-scroll">
                                <view class="item"
                                      :class="{'item-active': findex === index}"
                                      v-for="(item,index) in contractLabel" :key="index"
                                      @click="findex = index;">
                                    <text class="font-12 font-weight"
                                          :class="findex === index ? 'color-black' : 'color-gray'">
                                        {{ item }}
                                    </text>
                                </view>
                            </scroll-view>
                        </view>
                        <view class="sort">
                            <view class="sort-left">
                                <view class="sort-item" v-for="(item,index) in sort.slice(0, 2)"
                                      :key="item.id"
                                      @click="switchSort(item.id)">
                                    <text class="font-11 color-gray">{{ item.text }}</text>
                                    <image class="sort-image"
                                           :src="sort[item.id]['active']"
                                           mode="widthFix">
                                    </image>
                                </view>
                            </view>
                            <view class="sort-right">
                                <view class="sort-item" v-for="(item,index) in sort.slice(2, sort.length)"
                                      :key="item.id"
                                      @click="switchSort(item.id)">
                                    <text class="font-11 color-gray">{{ item.text }}</text>
                                    <image class="sort-image"
                                           :src="sort[item.id]['active']"
                                           mode="widthFix">
                                    </image>
                                </view>
                            </view>
                        </view>
                        <view v-for="(tab,tindex) in contract" :key="'ft'+tindex">
                            <view class="currency-list">
                                <view class="list-item"
                                      v-if="findex===tindex" v-for="(item, index) in tab.currency"
                                      :key="'cl' + tab.id"
                                      @click="toKline(item.id,tab.id,tab.currency_type)">
                                    <view class="item-left">
                                        <view class="item-column">
                                            <view class="currency-text">
                                                <text class="font-14 color-black font-bold">
                                                    {{ item['symbol'] }}USDT
                                                </text>
                                            </view>
                                            <text class="font-12 color-gray text-desc">
                                                {{ $util.bigNumberToString(item['quota']) }}
                                            </text>
                                        </view>
                                        <view class="item-column">
                                            <text class="font-14 color-black font-bold">
                                                {{ $util.thousandSeparator(item['new_price'], item['decimals']) }}
                                            </text>
                                            <text class="font-12 color-gray text-desc">
                                                ≈{{
                                                    symbol
                                                }}{{ $util.thousandSeparator(7 * item['new_price'], 2) }}
                                            </text>
                                        </view>
                                    </view>
                                    <view class="item-rate"
                                          :class="{
                                      'bg-gray': item['change_rate'] == 0,
                                      'bg-green': item['change_rate'] > 0,
                                      'bg-red': item['change_rate'] < 0
                                       }">
                                        <text class="font-12 font-weight always-white">
                                            {{ $util.thousandSeparator(item['change_rate']) }}%
                                        </text>
                                    </view>
                                </view>
                            </view>
                            <empty-view :width="750"
                                        :height="500"
                                        :visible="tab.currency.length === 0 && findex===tindex"
                                        :title="$t('list.not_data')">
                            </empty-view>
                        </view>
                    </scroll-view>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script>
import service from './store';

export default service;
</script>

<style lang="scss" scoped>
@import "store";
</style>

<style scoped>
/deep/ .fui-tabs__item {
    padding: 0 30rpx 0 0 !important;
}
</style>
