<template>
    <view class="contract" :data-theme="userTheme">
        <fui-nav-bar statusBar
                     isFixed
                     isOccupy
                     zIndex="9"
                     padding="0"
                     custom
                     background="var(--background-primary)"
                     @init="navInit">
            <view class="nav-bar">
                <view class="nav-bar-left" @click="$refs.showSelect.open()">
                    <view class="flex flex-row align-center">
                        <text class="font-16 color-black font-bold">
                            {{
                                currentCurrency['symbol']
                            }}/USDT
                        </text>
                        <image class="change-icon"
                               :src="`/static/img/tactic/down-${ userTheme }.png`"
                               mode="widthFix">
                        </image>
                    </view>
                    <view class="flex flex-row align-center">
                        <text class="font-11 color-gray mr-5">
                            {{
                                $t('contract.p1')
                            }}
                        </text>
                        <text class="font-11 color-black"
                              :class="ticker['P'] > 0 ? 'price_up' : 'price_down'">
                            {{
                                $util.thousandSeparator(ticker['P'], 2)
                            }}%
                        </text>
                    </view>
                </view>

                <view class="nav-bar-right">
                    <view class="nav-bar-right-image" @click="setFav">
                        <image v-if="!like" :src="`/static/newImage/collect-${ userTheme }.png`"
                               mode="widthFix"></image>
                        <image v-else src="/static/newImage/collect-select.png" mode="widthFix"></image>
                    </view>
                    <!-- <view class="nav-bar-right-image" @click="$mroute.toTactic()">
                        <image src="/static/img/tactic/AIk.png" mode="widthFix"></image>
                    </view> -->
                    <view class="nav-bar-right-image" @click="toKline">
                        <image :src="`/static/newImage/zd-${ userTheme }.png`" mode="widthFix"></image>
                    </view>
                    <view class="nav-bar-right-image" @click="IsShow = !IsShow">
                        <image :src="`/static/newImage/zdpl-${ userTheme }.png`" mode="widthFix"></image>
                    </view>
                    <view class="nav-bar-right-image" @click="showMenu = !showMenu">
                        <image :src="`/static/newImage/more-${ userTheme }.png`" mode="widthFix"></image>
                    </view>
                </view>
                <view class="nav-bar-menu" :class="showMenu ? 'menu-show' : ''"
                      :style="{'top': (navHeight + 5) + 'px'}">
                    <view class="nav-bar-menu-item" @click="$mroute.exchange(); showMenu = false">
                        <text class="font-13 color-dark">
                            {{
                                $t('contruct.fund_tran')
                            }}
                        </text>
                    </view>
                    <view class="nav-bar-menu-item" @click="$mroute.contractOrder(1); showMenu = false">
                        <text class="font-13 color-dark">
                            {{
                                $t('wallet.capital_flow')
                            }}
                        </text>
                    </view>
                    <view class="nav-bar-menu-item" @click="$mroute.contractInfo(1); showMenu = false">
                        <text class="font-13 color-dark">
                            {{
                                $t('contruct.con_info')
                            }}
                        </text>
                    </view>
                    <!-- <view class="nav-bar-menu-item" @click="$mroute.calculator(1); showMenu = false">
                        <text class="font-13 color-dark">
                            {{
                                $t('contruct.calculator')
                            }}
                        </text>
                    </view> -->
                </view>
            </view>
        </fui-nav-bar>

        <view class="contract-body">
            <!--   K线图   -->
            <view class="contract-body-kline" v-if="IsShow">
                <div>
                    <div class='kline'
                         :style="{ 'width': $device.windowWidth + 'px', 'height': '250px' }"
                         id="kline"
                         ref='kline'>
                    </div>
                </div>
                <view class="line-view"></view>
            </view>

            <view class="contract-body-top">
                <view class="contract-body-top-left">
                    <!--   全仓/杠杆   -->
                    <view class="contract-body-top-left-cell">
                        <view class="tag-box" @click="$refs.showPosition.open()">
                            <text class="font-11 color-black">
                                {{
                                    margin_type == 1 ? this.$t('contract.pall') : margin_type == 2 ? this.$t('contruct.wbw') : this.$t('contract.fall')
                                }}
                            </text>
                            <image :src="`/static/img/tactic/down-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                        <view class="tag-box" @click="$refs.showMuitl.open()">
                            <text class="font-11 color-black">
                                {{
                                    mutil
                                }}X
                            </text>
                            <image :src="`/static/img/tactic/down-${userTheme}.png`"
                                   mode="widthFix">
                            </image>
                        </view>
                    </view>
                    <!--   开仓/平仓   -->
                    <view class="contract-body-top-left-cell flex align-center justify-between mt-10">
                        <view type="buy"
                              class="trade-button"
                              :class="direction === 1 ? 'bg-green' : 'bg-gray'"
                              @click="direction = 1">
                            <text class="font-12 font-weight"
                                  :class="direction === 1 ? 'always-white' : 'color-dark'">
                                {{
                                    $t('contruct.open_position')
                                }}
                            </text>
                        </view>
                        <view type="sell"
                              class="trade-button"
                              :class="direction === 2 ? 'bg-red' : 'bg-gray'"
                              @click="direction = 2">
                            <text class="font-12 font-weight"
                                  :class="direction === 2 ? 'always-white' : 'color-dark'">
                                {{
                                    $t('contruct.close_position')
                                }}
                            </text>
                        </view>
                    </view>
                    <!--   可用   -->
                    <view class="contract-body-top-left-cell flex align-center justify-between mt-10">
                        <text class="font-11 color-gray">
                            {{
                                $t('contruct.available')
                            }}
                        </text>
                        <view class="flex align-center">
                            <text class="font-11 color-black font-weight" v-if="direction === 1">
                                {{
                                    $util.thousandSeparator(balance.legal_balance, 2)
                                }} USDT
                            </text>
                            <text class="font-11 color-black font-weight" v-if="direction === 2">
                                {{
                                    $util.float(getCurrencyAmount())
                                }}
                                {{
                                    currentCurrency['symbol']
                                }}
                            </text>
                            <image class="change-icon"
                                   @click="$mroute.exchange()"
                                   src="/static/img/tactic/tran-icon.png"
                                   mode="widthFix">
                            </image>
                        </view>
                    </view>
                    <!--   下单模式   -->
                    <view class="contract-body-top-left-cell mt-10">
                        <fui-dropdown-menu background="var(--background-secondary)"
                                           :minWidth="415"
                                           :size="24"
                                           :isCheckbox="false"
                                           :radius="8"
                                           :padding="'12rpx'"
                                           color="var(--content-primary)"
                                           selectedColor="var(--color-primary)"
                                           :options="actions"
                                           ref="ddmRange"
                                           @click="selectType">
                            <view class="down-box bg-gray" @tap="filterTap(0)">
                                <text class="font-12 color-black">
                                    {{
                                        actions[order_type]
                                    }}
                                </text>
                                <image :src="`/static/img/tactic/down-${userTheme}.png`"
                                       mode="widthFix">
                                </image>
                            </view>
                        </fui-dropdown-menu>
                    </view>
                    <!--   触发价格   -->
                    <view class="contract-body-top-left-cell mt-10"
                          v-show="order_type === 2">
                        <view class="input-box bg-gray">
                            <input type="number"
                                   class="font-12 color-black"
                                   v-model="t_price"
                                   :placeholder="this.$t('contruct.trigger_price')"
                                   placeholder-class="placeholder">
                            <text class="font-12 color-black">USDT</text>
                        </view>
                    </view>
                    <!--   委托价格   -->
                    <view class="contract-body-top-left-cell mt-10" v-show="order_type >= 1">
                        <view class="input-box bg-gray">
                            <input type="number"
                                   class="font-12 color-black"
                                   v-model="order_price"
                                   :placeholder="order_price == 1 ? this.$t('contruct.price') : this.$t('contruct.com_pr')"
                                   placeholder-class="placeholder">
                            <text class="font-12 color-black">USDT</text>
                        </view>
                    </view>
                    <!--   下单数量   -->
                    <view class="contract-body-top-left-cell mt-10">
                        <view class="number-group">
                            <view class="number-group-top">
                                <view class="number-group-top-item" @click="amountType = 0">
                                    <text class="font-11"
                                          :class="amountType === 0 ? 'color-black' : 'color-gray'">
                                        {{
                                            currentCurrency['symbol'] ? currentCurrency['symbol'] : '--'
                                        }}
                                    </text>
                                </view>
                                <view class="number-group-top-item" @click="amountType = 1">
                                    <text class="font-11"
                                          :class="amountType === 1 ? 'color-black' : 'color-gray'">
                                        USDT
                                    </text>
                                </view>
                            </view>
                            <view class="number-group-bottom">
                                <view class="input-box bg-gray">
                                    <template v-if="amountType == 0">
                                        <view v-if="direction == 1">
                                            <input v-model="amount"
                                                   type="text"
                                                   :placeholder="this.$t('contruct.quantity')"
                                                   class="font-12 color-black"
                                                   placeholder-class="placeholder">
                                        </view>
                                        <view v-else>
                                            <input type="text"
                                                   :value="rate + '%'" :disabled="true"
                                                   class="font-12 color-black"
                                                   placeholder-class="placeholder">
                                        </view>
                                        <text class="font-12 color-black">
                                            {{
                                                currentCurrency['symbol']
                                            }}
                                        </text>
                                    </template>
                                    <template v-else>
                                        <view v-if="direction == 1">
                                            <input @input="inputAmount"
                                                   v-model="inputAm"
                                                   type="number"
                                                   :placeholder="this.$t('contruct.quantity')"
                                                   class="font-12 color-black"
                                                   placeholder-class="placeholder">
                                        </view>
                                        <view v-else>
                                            <input type="text" :value="rate + '%'" :disabled="true"
                                                   class="font-12 color-black"
                                                   placeholder-class="placeholder">
                                        </view>
                                        <text class="font-12 color-black">USDT</text>
                                    </template>
                                </view>
                            </view>
                        </view>
                    </view>
                    <!--   滑块   -->
                    <view class="contract-body-top-left-cell mt-10">
                        <view class="slider-box">
                            <view class="slider-box-top">
                                <slider class="slider"
                                        block-color="var(--color-blue-bg)"
                                        backgroundColor="var(--color-arcode-input-bg)"
                                        activeColor="var(--color-blue-bg)"
                                        block-size="20"
                                        step="1"
                                        @changing="sliderChange"/>
                                <view class="slider-points">
                                    <text class="points" v-for="i in [0,25,50,75,100]"
                                          :class="rateValue >= i ? 'active' : ''"></text>
                                </view>
                            </view>
                            <view class="slider-box-bottom">
                                <text class="font-10 font-weight" :class="rateValue >= i ? 'color-black' : 'color-gray'"
                                      v-for="i in [0,25,50,75,100]">{{
                                        i + '%'
                                    }}
                                </text>
                            </view>
                        </view>
                    </view>
                    <!--   止盈止损   -->
                    <view class="contract-body-top-left-cell mt-10">
                        <view class="check-box">
                            <view class="flex align-center" @click="stopProfit = !stopProfit">
                                <view class="checkbox">
                                    <image src="/static/img/tactic/check-s.png"
                                           mode="widthFix"
                                           v-if="stopProfit">
                                    </image>
                                </view>
                                <text class="font-12 color-black">
                                    {{
                                        $t('contruct.tp_sl')
                                    }}
                                </text>
                            </view>
                            <fui-icon name="help-fill"
                                      :size="28"
                                      color="var(--content-tertiary)"
                                      @click="$refs.showPFti.open()">
                            </fui-icon>
                        </view>
                        <view class="input-group" v-if="stopProfit">
                            <view class="input-group-item">
                                <input v-model="price_up"
                                       type="text"
                                       class="font-12 color-black"
                                       placeholder-class="placeholder"
                                       :placeholder="this.$t('contruct.t_price')">
                            </view>
                            <view class="input-group-item">
                                <input v-model="price_up"
                                       type="text"
                                       class="font-12 color-black"
                                       placeholder-class="placeholder"
                                       :placeholder="this.$t('contruct.t_price')">
                            </view>
                        </view>
                    </view>
                    <!--   开多/开空/保证金   -->
                    <view v-if="isLogin">
                        <view class="contract-body-top-left-cell flex align-center justify-between mt-10">
                            <view class="flex align-center">
                                <text class="font-11 color-gray mr-5" v-if="direction === 1">
                                    {{
                                        $t('contruct.open_long')
                                    }}
                                </text>
                                <text class="font-11 color-gray mr-5" v-if="direction === 2">
                                    {{
                                        $t('contruct.kepingduo')
                                    }}
                                </text>
                                <fui-icon name="help-fill"
                                          :size="28"
                                          color="var(--content-tertiary)"
                                          @click="openSupport(0)">
                                </fui-icon>
                            </view>
                            <view v-if="direction === 1">
                                <text class="font-11 font-weight color-black" v-if="amountType === 0">
                                    {{
                                        getAvliAmount(1)
                                    }} {{
                                        currentCurrency['symbol']
                                    }}
                                </text>
                                <text class="font-11 font-weight color-black" v-else>
                                    {{
                                        $util.thousandSeparator(getAvliAmount(1))
                                    }} USDT
                                </text>
                            </view>
                            <view v-if="direction === 2">
                                <text class="font-11 font-weight color-black" v-if="amountType === 0">
                                    {{
                                        getPositionAmount(currentCurrency['id'] ? currentCurrency['id'] : 0, 1)
                                    }}
                                    {{
                                        currentCurrency['symbol']
                                    }}
                                </text>
                                <text class="font-11 font-weight color-black" v-else>
                                    {{
                                        getPositionAmount(currentCurrency['id'] ? currentCurrency['id'] : 0, 1)
                                    }}
                                    USDT
                                </text>
                            </view>
                        </view>
                        <view class="contract-body-top-left-cell flex align-center justify-between mt-10"
                              v-if="direction === 1">
                            <view>
                                <text class="font-11 color-gray">{{
                                        $t('contruct.margin')
                                    }}
                                </text>
                            </view>
                            <view class="flex align-center">
                                <text class="font-11 font-weight color-black" v-if="order_type == 0">
                                    {{
                                        amount > 0 ? $util.thousandSeparator(amountType === 0 ? amount / mutil * ticker['c'] : inputAm, 2) : '0.00'
                                    }} USDT
                                </text>
                                <text class="font-11 font-weight color-black" v-if="order_type == 1">
                                    {{
                                        amount > 0 ? $util.thousandSeparator(amountType === 0 ? amount / mutil * $util.str2number(order_price) : inputAm, 2) :
                                            '0.00'
                                    }} USDT
                                </text>
                                <text class="font-11 font-weight color-black" v-if="order_type == 2">
                                    {{
                                        amount > 0 ? $util.thousandSeparator(amountType === 0 ? amount / mutil * $util.str2number(order_price) : inputAm, 2) :
                                            '0.00'
                                    }} USDT
                                </text>
                            </view>
                        </view>
                        <view class="contract-body-top-left-cell mt-10" v-if="direction === 1">
                            <button hover-class="none"
                                    @click="submit(1)"
                                    class="button-box bg-green">
                                <text class="always-white font-13">
                                    {{
                                        $t('contruct.open_bullish')
                                    }}
                                </text>
                            </button>
                        </view>
                        <view class="contract-body-top-left-cell mt-10" v-if="direction === 2">
                            <button hover-class="none"
                                    @click="stopOrderByButton(1)"
                                    class="button-box bg-green">
                                <text class="always-white font-13">
                                    {{
                                        $t('contruct.pindo')
                                    }}
                                </text>
                            </button>
                        </view>
                        <view class="contract-body-top-left-cell flex align-center justify-between mt-10">
                            <view class="flex align-center">
                                <text class="font-11 color-gray mr-5">{{
                                        $t('contruct.open_null')
                                    }}
                                </text>
                                <fui-icon name="help-fill"
                                          :size="28"
                                          color="var(--content-tertiary)"
                                          @click="openSupport(1)">
                                </fui-icon>
                            </view>
                            <view v-if="direction === 1">
                                <text class="font-11 font-weight color-black" v-if="amountType === 0">
                                    {{
                                        getAvliAmount(2)
                                    }} {{
                                        currentCurrency['symbol']
                                    }}
                                </text>
                                <text class="font-11 font-weight color-black" v-if="amountType === 1">
                                    {{
                                        $util.thousandSeparator(getAvliAmount(2))
                                    }} USDT
                                </text>
                            </view>
                            <view v-if="direction === 2">
                                <text class="font-11 font-weight color-black" v-if="amountType === 0">
                                    {{
                                        getPositionAmount(currentCurrency['id'] ? currentCurrency['id'] : 0, 2)
                                    }}
                                    {{
                                        currentCurrency['symbol']
                                    }}
                                </text>
                                <text class="font-11 font-weight color-black" v-else>
                                    {{
                                        getPositionAmount(currentCurrency['id'] ? currentCurrency['id'] : 0, 2)
                                    }}
                                    USDT
                                </text>
                            </view>
                        </view>
                        <view class="contract-body-top-left-cell flex align-center justify-between mt-10"
                              v-if="direction === 1">
                            <view>
                                <text class="font-11 color-gray">{{
                                        $t('contruct.margin')
                                    }}
                                </text>
                            </view>
                            <view>
                                <text class="font-11 font-weight color-black" v-if="order_type == 0">
                                    {{
                                        amount > 0 ? $util.thousandSeparator(amountType === 0 ? amount / mutil * ticker['c'] : inputAm, 2) : '0.00'
                                    }} USDT
                                </text>
                                <text class="font-11 font-weight color-black" v-if="order_type == 1">
                                    {{
                                        amount > 0 ? $util.thousandSeparator(amountType === 0 ? amount / mutil * $util.str2number(order_price) : inputAm, 2) :
                                            '0.00'
                                    }} USDT
                                </text>
                                <text class="font-11 font-weight color-black" v-if="order_type == 2">
                                    {{
                                        amount > 0 ? $util.thousandSeparator(amountType === 0 ? amount / mutil * $util.str2number(order_price) : inputAm, 2) :
                                            '0.00'
                                    }} USDT
                                </text>
                            </view>
                        </view>
                        <view class="contract-body-top-left-cell mt-10">
                            <view v-if="direction === 1">
                                <button hover-class="none" @click="submit(2)"
                                        class="button-box bg-red">
                                    <text class="always-white font-13">
                                        {{
                                            $t('contruct.open_bear')
                                        }}
                                    </text>
                                </button>
                            </view>
                            <view v-if="direction === 2">
                                <button hover-class="none" @click="stopOrderByButton(2)"
                                        class="button-box bg-red">
                                    <text class="always-white font-13">
                                        {{
                                            $t('contruct.empty')
                                        }}
                                    </text>
                                </button>
                            </view>
                        </view>
                    </view>
                    <!--   未登录   -->
                    <view class="contract-body-top-left-cell mt-10" v-else>
                        <button class="button-box bg-black button-active"
                                hover-class="none"
                                @click="$mroute.login()">
                            <text class="font-13 color-white">
                                {{
                                    $t('contruct.lg')
                                }}
                            </text>
                        </button>
                    </view>
                </view>
                <view class="contract-body-top-right">
                    <!--   资金费率/结算时间   -->
                    <view class="rate-box" v-if="matches['currency_type'] === 0">
                        <view class="flex align-center">
                            <fui-icon name="help-fill"
                                      :size="28"
                                      color="var(--content-tertiary)"
                                      @click="$refs.showZjfl.open()">
                            </fui-icon>
                            <text class="font-10 color-gray ml-5">
                                {{
                                    $t('contruct.funding_rate')
                                }}/{{
                                    $t('contruct.set_time')
                                }}
                            </text>
                        </view>
                        <text class="font-11 font-weight color-black">
                            {{
                                $util.float(market['r'] * 100)
                            }}% / {{
                                time
                            }}
                        </text>
                    </view>
                    <!--   数据描述   -->
                    <view class="data-desc mt-10">
                        <view class="data-desc-item">
                            <text class="font-10 color-gray">
                                {{
                                    $t('contruct.price')
                                }}
                            </text>
                            <text class="font-10 color-gray">(USDT)</text>
                        </view>
                        <view class="data-desc-item">
                            <text class="font-10 color-gray">
                                {{
                                    $t('contruct.quantity')
                                }}
                            </text>
                            <text class="font-10 color-gray">
                                ({{
                                    currentCurrency['symbol']
                                }})
                            </text>
                        </view>
                    </view>
                    <!--   PRICE-UP   -->
                    <view class="data-list">
                        <view class="data-list-item" v-for="(item, index) in bids" :key="'b' + index">
                            <view class="bg-box bg-green" :style="{'width': item[1] * 100 + '%'}"></view>
                            <text
                                class="font-10 font-weight price_up">
                                {{
                                    $util.thousandSeparator(item[0], currentCurrency['decimals'])
                                }}
                            </text>
                            <text
                                class="font-10 font-weight color-black">
                                {{
                                    $util.thousandSeparator(item[1], 2)
                                }}
                            </text>
                        </view>
                    </view>
                    <!--   PRICE-CENTER   -->
                    <view class="data-center">
                        <text
                            class="font-14 font-weight price_up">
                            {{
                                $util.thousandSeparator(currentCurrency['new_price'], currentCurrency['decimals'])
                            }}
                        </text>
                        <view class="flex align-center">
                            <text class="font-10 font-weight color-gray">{{
                                    $t('contruct.mark_price')
                                }}
                            </text>
                            <text class="font-10 color-black pl-5">{{
                                    $util.thousandSeparator(market['p'], currentCurrency['decimals'])
                                }}
                            </text>
                        </view>
                    </view>
                    <!--   PRICE-DOWN   -->
                    <view class="data-list">
                        <view class="data-list-item" v-for="(item, index) in asks" :key="'a' + index">
                            <view class="bg-box bg-red" :style="{'width': item[1] * 100 + '%'}"></view>
                            <text
                                class="font-10 font-weight price_down">
                                {{
                                    $util.thousandSeparator(item[0], currentCurrency['decimals'])
                                }}
                            </text>
                            <text
                                class="font-10 font-weight color-black">
                                {{
                                    $util.thousandSeparator(item[1], 2)
                                }}
                            </text>
                        </view>
                    </view>
                    <!--   切换   -->
                    <view class="right-bottom mt-10">
                        <fui-dropdown-menu background="var(--background-secondary)"
                                           :minWidth="156"
                                           :size="22"
                                           :isCheckbox="false"
                                           :radius="8"
                                           :padding="'12rpx'"
                                           color="var(--content-primary)"
                                           selectedColor="var(--color-primary)"
                                           :options="showUnit"
                                           ref="decimal"
                                           @click="selectDecimal">
                            <view class="right-bottom-select bg-gray" @click="filterTap(1)">
                                <text class="font-11 color-black">
                                    {{
                                        showUnitValue
                                    }}
                                </text>
                                <image :src="`/static/img/tactic/down-${userTheme}.png`"
                                       mode="widthFix">
                                </image>
                            </view>
                        </fui-dropdown-menu>
                        <view class="right-bottom-image bg-gray">
                            <image src="/static/img/Br.png" mode="widthFix"></image>
                        </view>
                    </view>
                </view>
            </view>

            <view class="line-view"></view>

            <view class="contract-body-bottom">
                <!--   选项卡   -->
                <view class="contract-body-bottom-tab">
                    <view class="contract-body-bottom-tab-left">
                        <view class="contract-body-bottom-tab-left-item" @click="listTabIndex = 0">
                            <text class="font-14 font-weight"
                                  :class="listTabIndex == 0 ? 'color-black' : 'color-gray'">
                                {{
                                    $t('contruct.cur_pos')
                                }}({{
                                    position.position ? position.position.length : '0'
                                }})
                            </text>
                        </view>
                        <view class="contract-body-bottom-tab-left-item" @click="listTabIndex = 1">
                            <text class="font-14 font-weight"
                                  :class="listTabIndex == 1 ? 'color-black' : 'color-gray'">
                                {{
                                    $t('contruct.cur_od')
                                }}({{
                                    position.entrust ? position.entrust.length : '0'
                                }})
                            </text>
                        </view>
                        <view class="contract-body-bottom-tab-left-item" @click="listTabIndex = 2">
                            <text class="font-14 font-weight"
                                  :class="listTabIndex == 2 ? 'color-black' : 'color-gray'">
                                {{
                                    $t('contruct.plan_com')
                                }}({{
                                    position.entrustP ? position.entrustP.length : '0'
                                }})
                            </text>
                        </view>
                    </view>
                    <image class="order-icon"
                           :src="`/static/img/tactic/order-${userTheme}.png`"
                           mode="widthFix"
                           @click="$mroute.newOrders()">
                    </image>
                </view>
                <!--   列表内容   -->
                <swiper class="bottom-swiper"
                        :current="listTabIndex"
                        :style="`height: ${swiperHeight}px`"
                        @change="listTabIndex = $event.detail.current">
                    <!--   当前持仓   -->
                    <swiper-item class="bottom-swiper-item">
                        <view class="tip-box">
                            <view class="label" @click="onlyCurrency = !onlyCurrency">
                                <view class="checkbox">
                                    <image src="/static/img/tactic/check-s.png"
                                           mode="widthFix"
                                           v-if="onlyCurrency">
                                    </image>
                                </view>
                                <text class="font-11 color-black">
                                    {{
                                        $t('contruct.only_cur')
                                    }}
                                </text>
                            </view>
                            <text class="font-11 color-primary"
                                  @click="allPingcang()">
                                {{
                                    $t('contruct.click_close')
                                }}
                            </text>
                        </view>
                        <scroll-view scroll-y="true"
                                     class="scroll-view">
                            <view class="list-container">
                                <view class="list-item"
                                      v-for="(item, index) in position.position"
                                      :key="item.order_id">
                                    <!--  币名  -->
                                    <view class="row">
                                        <view class="row-left">
                                            <fui-tag
                                                :text="item.direction === 2 ? $t('tradeInfo.null') : $t('tradeInfo.many')"
                                                :size="20"
                                                :marginRight="10"
                                                :radius="3"
                                                :padding="['6rpx','8rpx']"
                                                color="#ffffff"
                                                :background="item.direction === 2 ? 'var(--content-trade-sell)' : 'var(--color-primary)'">
                                            </fui-tag>
                                            <text class="font-15 font-weight color-black coin">
                                                {{
                                                    item.symbol
                                                }}USDT
                                            </text>
                                            <fui-tag :text="$t('contruct.sustainable')"
                                                     :size="20"
                                                     :marginRight="10"
                                                     :marginLeft="10"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     color="var(--content-tertiary)"
                                                     background="var(--background-secondary)">
                                            </fui-tag>
                                            <fui-tag :size="20"
                                                     :marginRight="10"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     color="var(--content-tertiary)"
                                                     background="var(--background-secondary)">
                                                {{
                                                    item.margin_type == 1 ? this.$t('tradeInfo.full_w') : this.$t('contruct.wbw')
                                                }}{{
                                                    item.muilt
                                                }}X
                                            </fui-tag>
                                        </view>
                                    </view>
                                    <!--  持仓盈亏/回报率  -->
                                    <view class="column">
                                        <view class="row-cell">
                                            <text class="font-12 color-gray">
                                                {{
                                                    $t('contruct.pp_los')
                                                }}(USDT)
                                            </text>
                                            <text class="font-12 color-gray">
                                                {{
                                                    $t('contruct.response_rate')
                                                }}
                                            </text>
                                        </view>
                                        <view class="row-cell">
                                            <text class="font-13 color-black font-weight"
                                                  :class="item.p > 0 ? 'color-green' : 'color-red'">
                                                {{
                                                    $util.thousandSeparator(item.p, 2)
                                                }}
                                            </text>
                                            <text class="font-13 color-black font-weight"
                                                  :class="item.p > 0 ? 'color-green' : 'color-red'">
                                                {{
                                                    $util.thousandSeparator(item.rate, 2)
                                                }}%
                                            </text>
                                        </view>
                                    </view>
                                    <!--  持仓均价/预期强平价格  -->
                                    <view class="column">
                                        <view class="row-cell">
                                            <text class="font-12 color-gray">
                                                {{
                                                    $t('contruct.avp_price')
                                                }}
                                            </text>
                                            <text class="font-12 color-gray">
                                                {{
                                                    $t('contruct.ex_pr')
                                                }}
                                            </text>
                                        </view>
                                        <view class="row-cell">
                                            <text class="font-13 color-black font-weight">
                                                {{
                                                    $util.thousandSeparator(item.price, currentCurrency['decimals'])
                                                }}
                                            </text>
                                            <text class="font-13 color-black font-weight">
                                                {{
                                                    item.stopPrice <= 0 ? $t('contruct.nl_yp') : $util.thousandSeparator(item.stopPrice, currentCurrency['decimals'])
                                                }}
                                            </text>
                                        </view>
                                    </view>
                                    <!--  最新价格/保证金/总持仓  -->
                                    <view class="column">
                                        <view class="row-cell">
                                            <view class="row-cell-item">
                                                <text class="font-12 color-gray">
                                                    {{
                                                        $t('contruct.mark_price')
                                                    }}
                                                </text>
                                            </view>
                                            <view class="row-cell-item">
                                                <text class="font-12 color-gray"
                                                      :class="item.margin_type != 1 ? 'mr-5' : ''">
                                                    {{
                                                        $t('contruct.margin')
                                                    }}(USDT)
                                                </text>
                                                <fui-icon v-if="item.margin_type != 1"
                                                          name="warning-fill"
                                                          :size="28"
                                                          color="var(--content-tertiary)"
                                                          @click="mgtipShow">
                                                </fui-icon>
                                            </view>
                                            <view class="row-cell-item">
                                                <text class="font-12 color-gray">
                                                    {{
                                                        $t('contruct.total_pos')
                                                    }}(USDT)
                                                </text>
                                            </view>
                                        </view>
                                        <view class="row-cell">
                                            <view class="row-cell-item">
                                                <text class="font-13 color-black font-weight">
                                                    {{
                                                        $util.thousandSeparator(getNewPrice(item.currency_id, item.cm_id), currentCurrency['decimals'])
                                                    }}
                                                </text>
                                            </view>
                                            <view class="row-cell-item">
                                                <text class="font-13 color-black font-weight">
                                                    {{
                                                        $util.thousandSeparator(item.margin, 2)
                                                    }}
                                                </text>
                                            </view>
                                            <view class="row-cell-item">
                                                <text class="font-13 color-black font-weight">
                                                    {{
                                                        $util.thousandSeparator(item.uamount, currentCurrency['decimals'])
                                                    }}
                                                </text>
                                            </view>
                                        </view>
                                    </view>
                                    <!--  已结算盈亏/保证金费率/可平仓  -->
                                    <view class="column">
                                        <view class="row-cell">
                                            <view class="row-cell-item">
                                                <text class="font-12 color-gray mr-5">
                                                    {{
                                                        $t('contruct.set_pl')
                                                    }}
                                                </text>
                                                <fui-icon name="help-fill"
                                                          :size="28"
                                                          color="var(--content-tertiary)"
                                                          @click="pindex = index; $refs.jiesuan.open()">
                                                </fui-icon>
                                            </view>
                                            <view class="row-cell-item">
                                                <text class="font-12 color-gray">
                                                    {{
                                                        $t('contruct.margin_rate')
                                                    }}
                                                </text>
                                            </view>
                                            <view class="row-cell-item">
                                                <text class="font-12 color-gray">
                                                    {{
                                                        $t('contruct.can_close')
                                                    }}({{
                                                        item['symbol']
                                                    }})
                                                </text>
                                            </view>
                                        </view>
                                        <view class="row-cell">
                                            <view class="row-cell-item">
                                                <text class="font-13 color-black font-weight">
                                                    {{
                                                        $util.thousandSeparator(parseFloat(position.position[index].profit) -
                                                            parseFloat(position.position[index].charge) -
                                                            parseFloat(position.position[index].fund_charge), 2)
                                                    }}
                                                </text>
                                            </view>
                                            <view class="row-cell-item">
                                                <text class="font-13 color-black font-weight">
                                                    {{
                                                        getMarginRate(item.currency_id, item.direction, item.amount, item.price, item.margin)
                                                    }}%
                                                </text>
                                            </view>
                                            <view class="row-cell-item">
                                                <text class="font-13 color-black font-weight">
                                                    {{
                                                        $util.float($util.thousandSeparator(parseFloat(item.amount) -
                                                            parseFloat(item.close), 8))
                                                    }}
                                                </text>
                                            </view>
                                        </view>
                                    </view>
                                    <!--  (按钮)止盈止损/平仓/闪电平仓  -->
                                    <view class="item-footer">
                                        <button hover-class="none"
                                                @click="$mroute.entrust(item)">
                                            {{
                                                $t('contruct.tp_sl')
                                            }}
                                        </button>
                                        <button hover-class="none"
                                                @click="pindex = index; $refs.actionOrder.open()">
                                            {{
                                                $t('contruct.close_position')
                                            }}
                                        </button>
                                        <button hover-class="none"
                                                @click="pindex = index; $refs.speedAction.open();">
                                            {{
                                                $t('contruct.flash_close')
                                            }}
                                        </button>
                                    </view>
                                </view>
                                <empty-view :visible="!position.position || position.position.length === 0"
                                            :width="690"
                                            :height="300"
                                            :title="$t('list.not_data')">
                                </empty-view>
                            </view>
                        </scroll-view>
                    </swiper-item>
                    <!--   当前委托   -->
                    <swiper-item class="bottom-swiper-item">
                        <view class="tip-box">
                            <view class="label" @click="onlyCurrency = !onlyCurrency">
                                <view class="checkbox">
                                    <image src="/static/img/tactic/check-s.png"
                                           mode="widthFix"
                                           v-if="onlyCurrency">
                                    </image>
                                </view>
                                <text class="font-11 color-black">
                                    {{
                                        $t('contruct.only_cur')
                                    }}
                                </text>
                            </view>
                        </view>
                        <scroll-view scroll-y="true"
                                     class="scroll-view">
                            <view class="list-container">
                                <empty-view :visible="!position.entrust || position.entrust.length === 0"
                                            :width="690"
                                            :height="300"
                                            :title="$t('list.not_data')">
                                </empty-view>
                                <view class="list-item"
                                      v-for="(item, index) in position.entrust" :key="'w' + index">
                                    <!--   币名  -->
                                    <view class="row-cell">
                                        <view class="row-left">
                                            <fui-tag :text="$t('contruct.buy_long')"
                                                     :size="20"
                                                     :marginRight="10"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     color="#ffffff"
                                                     background="var(--color-primary)"
                                                     v-if="item.type === 1">
                                            </fui-tag>
                                            <fui-tag :text="$t('contruct.sell_short')"
                                                     :size="20"
                                                     :marginRight="10"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     color="#ffffff"
                                                     background="var(--content-trade-sell)"
                                                     v-if="item.type === 2">
                                            </fui-tag>
                                            <fui-tag :text="$t('contruct.sell_fl')"
                                                     :size="20"
                                                     :marginRight="10"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     color="#ffffff"
                                                     background="var(--color-primary)"
                                                     v-if="item.type === 3">
                                            </fui-tag>
                                            <fui-tag :text="$t('contruct.buy_short')"
                                                     :size="20"
                                                     :marginRight="10"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     color="#ffffff"
                                                     background="var(--content-trade-sell)"
                                                     v-if="item.type === 4">
                                            </fui-tag>
                                            <fui-tag :text="$t('contruct.tp')"
                                                     :size="20"
                                                     :marginRight="10"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     color="#ffffff"
                                                     background="var(--color-primary)"
                                                     v-if="item.type === 5">
                                            </fui-tag>
                                            <fui-tag :text="$t('contruct.sl')"
                                                     :size="20"
                                                     :marginRight="10"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     color="#ffffff"
                                                     background="var(--color-primary)"
                                                     v-if="item.type === 6">
                                            </fui-tag>
                                            <text class="font-15 font-weight color-black coin">
                                                {{
                                                    item.symbol
                                                }}USDT
                                            </text>
                                            <fui-tag :text="$t('contruct.sustainable')"
                                                     :size="20"
                                                     :marginRight="10"
                                                     :marginLeft="10"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     color="var(--content-tertiary)"
                                                     background="var(--background-secondary)">
                                            </fui-tag>
                                        </view>
                                        <text class="font-12 color-primary"
                                              @click="cancelOperation(item.id)">
                                            {{
                                                $t('contruct.cancel_order')
                                            }}
                                        </text>
                                    </view>
                                    <!--  时间 -->
                                    <view class="row-cell">
                                        <view class="row-left">
                                            <text class="font-12 color-gray">
                                                {{
                                                    item.created_at
                                                }}
                                            </text>
                                            <fui-tag :text="$t('trade.mk_od')"
                                                     :size="20"
                                                     :marginLeft="10"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     color="var(--content-tertiary)"
                                                     background="var(--background-secondary)"
                                                     v-if="item.ttype == 1">
                                            </fui-tag>
                                            <fui-tag :text="$t('trade.lm_od')"
                                                     :size="20"
                                                     :marginLeft="10"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     color="var(--content-tertiary)"
                                                     background="var(--background-secondary)"
                                                     v-if="item.ttype == 2">
                                            </fui-tag>
                                            <fui-tag :text="$t('contruct.con_sheet')"
                                                     :size="20"
                                                     :marginLeft="10"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     color="var(--content-tertiary)"
                                                     background="var(--background-secondary)"
                                                     v-if="item.ttype == 3">
                                            </fui-tag>
                                        </view>
                                    </view>
                                    <!--  委托价格 -->
                                    <view class="row-cell">
                                        <text class="font-12 color-gray">
                                            {{
                                                $t('contruct.com_pr')
                                            }}(USDT)
                                        </text>
                                        <text class="font-13 color-black font-weight">
                                            {{
                                                $util.thousandSeparator(item.price, 2)
                                            }}
                                        </text>
                                    </view>
                                    <!--  委托数量 -->
                                    <view class="row-cell">
                                        <text class="font-12 color-gray">
                                            {{
                                                $t('contruct.od_quan')
                                            }}({{
                                                item.symbol
                                            }})
                                        </text>
                                        <text class="font-13 color-black font-weight">
                                            {{
                                                item.amount
                                            }}
                                        </text>
                                    </view>
                                    <!--  成交均价 -->
                                    <view class="row-cell">
                                        <text class="font-12 color-gray">
                                            {{
                                                $t('contruct.aver_tp')
                                            }}(USDT)
                                        </text>
                                        <text class="font-13 color-black font-weight">
                                            --
                                        </text>
                                    </view>
                                    <!--  止盈止损 -->
                                    <view class="row-cell">
                                        <text class="font-12 color-gray">
                                            {{
                                                $t('contruct.tp')
                                            }}/{{
                                                $t('contruct.sl')
                                            }}
                                        </text>
                                        <text class="font-13 color-black font-weight">
                                            --/--
                                        </text>
                                    </view>
                                </view>
                                <!--                                <template v-if="position.entrust.length === 0">-->
                                <!--                                    <empty-view :visible="true"-->
                                <!--                                                :width="690"-->
                                <!--                                                :height="690"-->
                                <!--                                                :title="$t('list.not_data')">-->
                                <!--                                    </empty-view>-->
                                <!--                                </template>-->
                            </view>
                        </scroll-view>
                    </swiper-item>
                    <!--   计划委托   -->
                    <swiper-item class="bottom-swiper-item">
                        <view class="tip-box">
                            <view class="label" @click="onlyCurrency = !onlyCurrency">
                                <view class="checkbox">
                                    <image src="/static/img/tactic/check-s.png"
                                           mode="widthFix"
                                           v-if="onlyCurrency">
                                    </image>
                                </view>
                                <text class="font-11 color-black">
                                    {{
                                        $t('contruct.only_cur')
                                    }}
                                </text>
                            </view>
                        </view>
                        <scroll-view scroll-y="true"
                                     class="scroll-view">
                            <view class="list-container">
                                <empty-view :visible="!position.entrustP || position.entrustP.length === 0"
                                            :width="690"
                                            :height="300"
                                            :title="$t('list.not_data')">
                                </empty-view>
                                <view class="list-item"
                                      v-for="(item, index) in position.entrustP" :key="'wp' + index">
                                    <!--   币名  -->
                                    <view class="row-cell">
                                        <view class="row-left">
                                            <fui-tag :text="item.type == 5 ? $t('contruct.tp'):$t('contruct.sl')"
                                                     :size="20"
                                                     :marginRight="10"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     color="#ffffff"
                                                     :background="item.type == 5 ? 'var(--color-primary)' : 'var(--content-trade-sell)'">
                                            </fui-tag>
                                            <text class="font-15 font-weight color-black coin">
                                                {{
                                                    item.symbol
                                                }}USDT
                                            </text>
                                            <fui-tag :text="$t('contruct.sustainable')"
                                                     :size="20"
                                                     :marginRight="10"
                                                     :marginLeft="10"
                                                     :radius="3"
                                                     :padding="['6rpx','8rpx']"
                                                     color="var(--content-tertiary)"
                                                     background="var(--background-secondary)">
                                            </fui-tag>
                                        </view>
                                        <text class="font-12 color-primary"
                                              @click="cancelOperation(item.id)">
                                            {{
                                                $t('contruct.cancel_order')
                                            }}
                                        </text>
                                    </view>
                                    <!--  时间 -->
                                    <view class="row-cell">
                                        <view class="row-left">
                                            <text class="font-12 color-gray">
                                                {{
                                                    item.created_at
                                                }}
                                            </text>
                                        </view>
                                    </view>
                                    <!--  触发价格 -->
                                    <view class="row-cell">
                                        <text class="font-12 color-gray">
                                            {{
                                                $t('contruct.trigger_price')
                                            }}
                                        </text>
                                        <text class="font-13 color-black font-weight">
                                            {{
                                                $util.float(item.wprice)
                                            }}
                                        </text>
                                    </view>
                                    <!--  委托价格 -->
                                    <view class="row-cell">
                                        <text class="font-12 color-gray">
                                            {{
                                                $t('contruct.com_pr')
                                            }}
                                        </text>
                                        <text class="font-13 color-black font-weight">
                                            {{
                                                item.price <= 0 ? $t('trade.mk_pr') : $util.float(item.price)
                                            }}
                                        </text>
                                    </view>
                                    <!--  委托数量 -->
                                    <view class="row-cell">
                                        <text class="font-12 color-gray">
                                            {{
                                                $t('contruct.od_quan')
                                            }}({{
                                                item.symbol
                                            }})
                                        </text>
                                        <text class="font-13 color-black font-weight">
                                            {{
                                                $util.float(item.amount)
                                            }}
                                        </text>
                                    </view>
                                </view>
                                <!--                                <template v-if="position.entrustP.length === 0">-->
                                <!--                                    <empty-view :visible="true"-->
                                <!--                                                :width="690"-->
                                <!--                                                :height="690"-->
                                <!--                                                :title="$t('list.not_data')">-->
                                <!--                                    </empty-view>-->
                                <!--                                </template>-->
                            </view>
                        </scroll-view>
                    </swiper-item>
                </swiper>
            </view>
        </view>

        <!-- 闪电平仓 -->
        <uni-popup ref="speedAction" type="bottom" style="z-index: 20000;">
            <view class="popup-wrap-box" v-if="position.position[pindex]">
                <view class="popup-wrap-box-title">
                    <text class="font-16 color-black font-weight">
                        {{
                            $t('contruct.flash_close')
                        }}
                    </text>
                    <view class="close-icon" @click="$refs.speedAction.close();">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="popup-wrap-box-content">
                    <view class="content-cell">
                        <view class="flex align-center">
                            <fui-tag
                                :isBorder="false"
                                :padding="['8rpx','10rpx']"
                                :radius="6"
                                :size="24"
                                :marginRight="10"
                                type="danger"
                                theme="dark">
                                {{
                                    position.position[pindex]['direction'] == 1 ? this.$t('tradeInfo.many') : this.$t('tradeInfo.null')
                                }}
                            </fui-tag>
                            <text class="font-14 color-black font-weight">
                                {{
                                    position.position[pindex]['symbol']
                                }}USDT {{
                                    $t('contruct.sustainable')
                                }}
                            </text>
                            <fui-tag
                                :isBorder="false"
                                :padding="['8rpx','10rpx']"
                                :radius="6"
                                :size="24"
                                :marginLeft="10"
                                type="warning"
                                theme="light">
                                {{
                                    position.position[pindex]['margin_type'] == 1 ? this.$t('tradeInfo.full_w') : this.$t('contruct.wbw')
                                }}{{
                                    position.position[pindex]['muilt']
                                }}X
                            </fui-tag>
                        </view>
                    </view>
                    <view class="content-cell mt-10">
                        <text class="font-13 color-gray">
                            {{
                                $t('contruct.price')
                            }}
                        </text>
                        <text class="font-13 color-black">
                            {{
                                $t('trade.mk_pr')
                            }}
                        </text>
                    </view>
                    <view class="content-cell mt-10">
                        <text class="font-13 color-gray">
                            {{
                                $t('contruct.quantity')
                            }}
                        </text>
                        <text class="font-13 color-black">
                            {{
                                getPositionCurrencyAmount(position.position[pindex]['currency_id'], position.position[pindex]['direction'])
                            }}
                        </text>
                    </view>
                    <view class="content-button">
                        <button @click="stopLight(position.position[pindex]['id'])"
                                class="_button bg-black button-active">
                            <text class="font-13 color-white">
                                {{
                                    $t('contruct.confirm_btntxt')
                                }}
                            </text>
                        </button>
                    </view>
                </view>
            </view>
        </uni-popup>
        <!-- 平仓操作 -->
        <uni-popup ref="actionOrder" type="bottom" style="z-index: 20000;">
            <view class="popup-wrap-box" v-if="position.position[pindex]">
                <view class="popup-wrap-box-title">
                    <text class="font-16 color-black font-weight">
                        {{
                            $t('contruct.close_position')
                        }}
                    </text>
                    <view class="close-icon" @click="$refs.actionOrder.close()">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="popup-wrap-box-content">
                    <view class="content-cell">
                        <view class="flex align-center">
                            <fui-tag
                                :isBorder="false"
                                :padding="['8rpx','10rpx']"
                                :radius="6"
                                :size="24"
                                :marginRight="10"
                                type="danger"
                                theme="dark"
                                :text="$t('tradeInfo.null')"
                                v-if="position.position[pindex]['direction'] === 0">
                            </fui-tag>
                            <fui-tag
                                :isBorder="false"
                                :padding="['8rpx','10rpx']"
                                :radius="6"
                                :size="24"
                                :marginRight="10"
                                type="success"
                                theme="dark"
                                :text="$t('tradeInfo.many')"
                                v-if="position.position[pindex]['direction'] === 1">
                            </fui-tag>
                            <text class="font-14 color-black font-weight">
                                {{
                                    position.position[pindex]['symbol']
                                }}USDT
                                {{
                                    $t('contruct.sustainable')
                                }}
                            </text>
                            <fui-tag
                                :isBorder="false"
                                :padding="['8rpx','10rpx']"
                                :radius="6"
                                :size="24"
                                :marginLeft="10"
                                type="warning"
                                theme="light">
                                {{
                                    position.position[pindex]['margin_type'] ==
                                    1 ? this.$t('tradeInfo.full_w') : this.$t('contruct.wbw')
                                }}{{
                                    position.position[pindex]['muilt']
                                }}X
                            </fui-tag>
                        </view>
                    </view>
                    <view class="content-cell content-cell-column mt-10">
                        <text class="font-13 color-gray">
                            {{
                                $t('contruct.close_price')
                            }}
                        </text>
                        <view class="content-cell-row">
                            <view class="input-box" :class="{ 'input-box-active': ptype != false }">
                                <input @input="inputPprice"
                                       :disabled="!ptype ? true : false"
                                       class="font-12 color-black pl-5"
                                       :focus="ptype != false"
                                       :type="!ptype ? 'text' : 'number'"
                                       :value="!ptype ? this.$t('contruct.bmp') : pprice">
                                <text class="font-12 font-weight color-black">USDT</text>
                            </view>
                            <view class="input-button">
                                <text class="font-12 color-black"
                                      @click="ptype = !ptype">
                                    {{
                                        ptype == true ? this.$t('contruct.marker_t') : this.$t('contruct.limit_t')
                                    }}
                                </text>
                            </view>
                        </view>
                    </view>
                    <view class="content-cell content-cell-column mt-10">
                        <text class="font-13 color-gray">
                            {{
                                $t('contruct.close_num')
                            }}
                        </text>
                        <view class="input-box mt-5">
                            <input v-model="pamount"
                                   @focus="priceNum = true"
                                   @blur="priceNum = false"
                                   class="font-12 color-black pl-5"
                                   type="number">
                            <text
                                class="font-12 font-weight color-black">
                                {{
                                    position.position[pindex]['symbol']
                                }}
                            </text>
                        </view>
                    </view>
                    <view class="content-cell mt-10">
                        <view class="slider-box">
                            <view class="slider-box-top">
                                <slider class="slider"
                                        :max="100"
                                        :min="0"
                                        @change="sliderPamount"
                                        block-color="var(--color-blue-bg)"
                                        backgroundColor="var(--color-arcode-input-bg)"
                                        activeColor="var(--color-blue-bg)"
                                        block-size="20"
                                        step="1"/>
                                <view class="slider-points">
                                    <text class="points" v-for="i in [0,25,50,75,100]"
                                          :class="popSliderValue >= i ? 'active' : ''"></text>
                                </view>
                            </view>
                            <view class="slider-box-bottom">
                                <text class="font-10 font-weight"
                                      :class="popSliderValue >= i ? 'color-black' : 'color-gray'"
                                      v-for="i in [0,25,50,75,100]">{{
                                        i + '%'
                                    }}
                                </text>
                            </view>
                        </view>
                    </view>
                    <view class="content-cell mt-10">
                        <text class="font-13 color-gray">
                            {{
                                $t('contruct.pt_cbc')
                            }}
                        </text>
                        <text class="font-13 color-black">
                            {{
                                $util.thousandSeparator(position.position[pindex]['amount']
                                    - position.position[pindex]['close'], 8)
                            }}
                            {{
                                position.position[pindex]['symbol']
                            }}
                        </text>
                    </view>
                    <view class="content-cell mt-10">
                        <text class="font-13 color-gray">
                            {{
                                $t('contruct.ep_loss')
                            }}
                        </text>
                        <text class="font-13 color-black">
                            {{
                                pamount > 0 || pamount != '' ?
                                    getProfit(position.position[pindex]['currency_id'], pindex, pamount, ptype) : '--'
                            }}
                            USDT
                        </text>
                    </view>
                    <view class="content-button">
                        <button @click="stopPosition(position.position[pindex]['id'])"
                                :class="{ 'bg-blue': pamount != '' || pamount > 0, 'bg-gray': pamount == '' || pamount <= 0 }"
                                class="_button">
                            {{
                                $t('contruct.confirm_btntxt')
                            }}
                        </button>
                    </view>
                </view>
            </view>
        </uni-popup>
        <!-- 仓位选择 -->
        <uni-popup ref="showPosition" type="bottom" style="z-index: 20000;">
            <view class="popup-wrap-box">
                <view class="popup-wrap-box-title">
                    <text class="font-16 color-black font-weight">
                        {{
                            $t('contruct.mt11')
                        }}
                    </text>
                    <view class="close-icon" @click="$refs.showPosition.close()">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="popup-wrap-box-content">
                    <view class="content-cell">
                        <view class="content-cell-buttons">
                            <view class="_button"
                                  :class="{'_button-active' : tmargin === 1}"
                                  @click="tmargin = 1">
                                <text class="font-13 color-black"
                                      :class="{'color-primary': tmargin == 1}">
                                    {{
                                        $t('contract.pall')
                                    }}
                                </text>
                            </view>
                            <view class="_button bg-gray"
                                  :class="{'_button-active' : tmargin === 3}"
                                  @click="tmargin = 3">
                                <text class="font-13 color-black"
                                      :class="{'color-primary': tmargin == 3}">
                                    {{
                                        $t('contract.fall')
                                    }}
                                </text>
                            </view>
                            <view class="_button bg-gray"
                                  :class="{'_button-active' : tmargin === 2}"
                                  @click="tmargin = 2">
                                <text class="font-13 color-black"
                                      :class="{'color-primary': tmargin == 2}">
                                    {{
                                        $t('contruct.wbw')
                                    }}
                                </text>
                            </view>
                        </view>
                    </view>
                    <!--                            <view class="content-cell mt-10">-->
                    <!--                                <text class="font-12 color-green">-->
                    <!--                                    {{ $t('contruct.mt1') }}-->
                    <!--                                </text>-->
                    <!--                            </view>-->
                    <view class="content-cell mt-10">
                        <fui-collapse>
                            <fui-collapse-item open
                                               borderColor="var(--background-primary)"
                                               background="var(--background-primary)"
                                               contentBg="var(--background-primary)">
                                <text class="font-14 color-black font-weight">{{
                                        $t('contruct.mt2')
                                    }}
                                </text>
                                <template v-slot:content>
                                    <text class="font-12 color-gray">
                                        {{
                                            $t('contruct.mt3')
                                        }}
                                    </text>
                                    <text class="font-12 color-gray mt-10">
                                        {{
                                            $t('contruct.mt4')
                                        }}
                                    </text>
                                </template>
                            </fui-collapse-item>
                        </fui-collapse>
                    </view>
                    <view class="content-button">
                        <button @click="setMargin()"
                                hover-class="none"
                                class="_button button-active bg-black">
                            <text class="font-13"
                                  :class="position.position.length > 0 ? 'color-gray' : 'color-white'">
                                {{
                                    $t('hand.confirm_t')
                                }}
                            </text>
                        </button>
                    </view>
                </view>
            </view>
        </uni-popup>
        <!-- 杠杆设置 -->
        <uni-popup ref="showMuitl" type="bottom" style="z-index: 20000;">
            <view class="popup-wrap-box">
                <view class="popup-wrap-box-title">
                    <text class="font-16 color-black font-weight">
                        {{
                            $t('contruct.lt1')
                        }}
                    </text>
                    <view class="close-icon" @click="$refs.showMuitl.close()">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="popup-wrap-box-content">
                    <view class="content-cell">
                        <fui-input-number custom
                                          v-model="tmutil"
                                          backgroundColor="var(--background-secondary)"
                                          color="var(--content-primary)"
                                          :size="30"
                                          margin="0"
                                          :min="1"
                                          :max="125">
                            <fui-icon name="minus" :size="48" color="var(--content-primary)"></fui-icon>
                            <template v-slot:plus>
                                <fui-icon name="plus" :size="48" color="var(--content-primary)"></fui-icon>
                            </template>
                        </fui-input-number>
                    </view>
                    <view class="content-cell mt-10">
                        <view class="slider-box">
                            <view class="slider-box-top">
                                <slider class="slider"
                                        :max="125"
                                        :min="1"
                                        block-color="var(--color-blue-bg)"
                                        backgroundColor="var(--color-arcode-input-bg)"
                                        activeColor="var(--color-blue-bg)"
                                        block-size="20"
                                        :value="tmutil"
                                        @change="changeMutil"
                                        step="1"/>
                                <view class="slider-points">
                                    <text class="points" v-for="i in [1,25,50,75,100,125]"
                                          :class="tmutil >= i ? 'active' : ''"></text>
                                </view>
                            </view>
                            <view class="slider-box-bottom">
                                <text class="font-10 font-weight"
                                      :class="tmutil >= i ? 'color-black' : 'color-gray'"
                                      v-for="i in [1,25,50,75,100,125]">{{
                                        i + 'X'
                                    }}
                                </text>
                            </view>
                        </view>
                    </view>
                    <view class="content-cell mt-10">
                        <view class="content-cell-column">
                            <text class="font-12 color-gray">
                                {{
                                    $t('contruct.lt2')
                                }}(USDT)
                            </text>
                            <text class="font-14 color-black font-weight">
                                {{
                                    $util.float(currentCurrency['max_amount'])
                                }}
                            </text>
                        </view>
                        <view class="content-cell-column" style="align-items: flex-end">
                            <view>
                                <text class="font-12 color-gray">
                                    {{
                                        $t('contruct.lt3')
                                    }}(USDT)
                                </text>
                            </view>
                            <view style="align-items: flex-end">
                                <text class="font-14 color-black font-weight">
                                    {{
                                        $util.thousandSeparator(balance.legal_balance ? balance.legal_balance : currentCurrency['max_amount'])
                                    }}
                                </text>
                            </view>
                        </view>
                    </view>
                    <!--                            <view class="content-cell mt-10">-->
                    <!--                                <text class="font-12 color-green">-->
                    <!--                                    {{ $t('contruct.lt4') }}-->
                    <!--                                </text>-->
                    <!--                            </view>-->
                    <view class="content-button">
                        <button @click="setMutil()"
                                class="_button button-active bg-black">
                            <text class="font-13"
                                  :class="{'color-gray': position.position.length > 0, 'color-white': position.position.length <= 0 }">
                                {{
                                    $t('hand.confirm_t')
                                }}
                            </text>
                        </button>
                    </view>
                </view>
            </view>
        </uni-popup>
        <!-- 止盈止损帮助 -->
        <uni-popup ref="showPFti" type="bottom" style="z-index: 20000;">
            <view class="popup-wrap-box">
                <view class="popup-wrap-box-title">
                    <text class="font-16 color-black font-weight">
                        {{
                            $t('contruct.pl1')
                        }}
                    </text>
                    <view class="close-icon" @click="$refs.showPFti.close()">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="popup-wrap-box-content max-content">
                    <view class="content-cell">
                        <text class="font-12 color-gray">
                            {{
                                $t('contruct.pl2')
                            }}
                        </text>
                    </view>
                </view>
            </view>
        </uni-popup>
        <!-- 开仓帮助 -->
        <uni-popup ref="showSupport" type="bottom" style="z-index: 20000;">
            <view class="popup-wrap-box">
                <view class="popup-wrap-box-title">
                    <text class="font-16 color-black font-weight">
                        {{
                            support == 0 ? $t('contruct.pl3') : $t('contruct.pl5')
                        }}
                    </text>
                    <view class="close-icon" @click="$refs.showSupport.close()">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="popup-wrap-box-content max-content">
                    <view class="content-cell" v-if="support == 0">
                        <text class="font-12 color-gray">
                            {{
                                $t('contruct.pl4')
                            }}
                        </text>
                    </view>
                    <view class="content-cell" v-if="support == 1">
                        <text class="font-12 color-gray">
                            {{
                                $t('contruct.pl6')
                            }}
                        </text>
                    </view>
                </view>
            </view>
        </uni-popup>
        <!-- 资金费率说明 -->
        <uni-popup ref="showZjfl" type="bottom" style="z-index: 20000;">
            <view class="popup-wrap-box">
                <view class="popup-wrap-box-title">
                    <text class="font-16 color-black font-weight">
                        {{
                            $t('contruct.pl26')
                        }}
                    </text>
                    <view class="close-icon" @click="$refs.showZjfl.close()">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="popup-wrap-box-content max-content">
                    <view class="content-cell">
                        <text class="font-12 color-gray">
                            {{
                                $t('contruct.pl27')
                            }}
                        </text>
                        <text class="font-12 color-black">
                            {{
                                $util.dateFormatter(market['T'], $t('contruct.pl28'), 2)
                            }} {{
                                time
                            }}
                        </text>
                    </view>
                    <view class="content-cell mt-10">
                        <text class="font-12 color-gray">
                            {{
                                $t('contruct.pl29')
                            }}（{{
                                market['r'] > 0 ? $t('contruct.pl30') : $t('contruct.pl31')
                            }}）
                        </text>
                        <text class="font-12 color-black">
                            {{
                                $util.float(market['r'] * 100)
                            }}%
                        </text>
                    </view>
                    <view class="content-cell mt-10">
                        <text class="font-14 color-black font-weight">
                            {{
                                $t('contruct.pl32')
                            }}
                        </text>
                    </view>
                    <view class="content-cell mt-10">
                        <text class="font-12 color-gray">
                            {{
                                $t('contruct.pl33')
                            }}
                        </text>
                    </view>
                    <view class="content-cell mt-10">
                        <text class="font-12 color-gray">
                            {{
                                $t('contruct.pl34')
                            }}
                        </text>
                    </view>
                    <view class="content-cell mt-10">
                        <text class="font-12 color-gray">
                            {{
                                $t('contruct.pl35')
                            }}
                        </text>
                    </view>
                </view>
            </view>
        </uni-popup>
        <!-- 结算盈亏说明 -->
        <uni-popup ref="jiesuan" type="bottom" style="z-index: 20000">
            <view class="popup-wrap-box">
                <view class="popup-wrap-box-title">
                    <text class="font-16 color-black font-weight">
                        {{
                            $t('contruct.pl21')
                        }}
                    </text>
                    <view class="close-icon" @click="$refs.jiesuan.close()">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="popup-wrap-box-content">
                    <view class="content-cell">
                        <text class="font-12 color-gray">{{
                                $t('contruct.pl21')
                            }}
                        </text>
                        <view class="flex align-center">
                            <text class="font-12 price_down">
                                {{
                                    $util.thousandSeparator(parseFloat(position.position[pindex].profit) -
                                        parseFloat(position.position[pindex].charge) +
                                        parseFloat(position.position[pindex].fund_charge))
                                }}
                            </text>
                            <text class="font-12 color-black ml-5">USDT</text>
                        </view>
                    </view>
                    <view class="content-cell mt-10">
                        <text class="font-12 color-gray">{{
                                $t('contruct.pl22')
                            }}
                        </text>
                        <view class="flex align-center">
                            <text class="font-12 color-black">{{
                                    $util.float(position.position[pindex].charge)
                                }}
                            </text>
                            <text class="font-12 color-black ml-5">USDT</text>
                        </view>
                    </view>
                    <view class="content-cell mt-10">
                        <text class="font-12 color-gray">
                            {{
                                $t('contruct.pl23')
                            }}
                        </text>
                        <view class="flex align-center">
                            <text class="font-12 color-black">
                                {{
                                    $util.thousandSeparator(position.position[pindex].profit)
                                }}
                            </text>
                            <text class="font-12 color-black ml-5">USDT</text>
                        </view>
                    </view>
                    <view class="content-cell mt-10">
                        <text class="font-12 color-gray">
                            {{
                                $t('contruct.pl24')
                            }}
                        </text>
                        <view class="flex align-center">
                            <text class="font-12 color-black">
                                {{
                                    $util.thousandSeparator(position.position[pindex].fund_charge)
                                }}
                            </text>
                            <text class="font-12 color-black ml-5">USDT</text>
                        </view>
                    </view>
                    <view class="content-cell mt-10">
                        <text class="font-12 color-gray">
                            {{
                                $t('contruct.pl25')
                            }}
                        </text>
                    </view>
                </view>
            </view>
        </uni-popup>
        <!-- 提示框 -->
        <uni-popup ref="alertDialog" type="dialog">
            <uni-popup-dialog type="info"
                              :cancelText="$t('取消')"
                              :confirmText="$t('确定')"
                              :title="$t('contruct.pl7')"
                              :content="$t('contruct.pl8')"
                              @confirm="stopAll"></uni-popup-dialog>
        </uni-popup>

        <!--  保证金弹窗  -->
        <fui-bottom-popup background="var(--white)" :show="marginTip" @close="closePopup">
            <view class="popup-wrap-box">
                <view class="popup-wrap-box-title">
                    <text class="font-16 font-bold color-black">
                        {{
                            $t('contruct.margin')
                        }}
                    </text>
                    <view class="close-icon" @click="closePopup">
                        <fui-icon name="close" size="48" color="var(--content-primary)"></fui-icon>
                    </view>
                </view>
                <view class="popup-wrap-box-content">
                    <view class="content-cell">
                        <view class="content-cell-tabs">
                            <view class="content-cell-tabs-item"
                                  :class="mtabIndex === 0 ? 'bg-gray' : ''"
                                  @click="mtabIndex = 0">
                                <text class="font-13 color-gray font-weight"
                                      :class="mtabIndex === 0 ? 'color-blue' : ''">
                                    {{
                                        $t('contract.tt1')
                                    }}
                                </text>
                            </view>
                            <view class="content-cell-tabs-item"
                                  :class="mtabIndex === 1 ? 'bg-gray' : ''"
                                  @click="mtabIndex = 1">
                                <text class="font-13 color-gray font-weight"
                                      :class="mtabIndex === 1 ? 'color-blue' : ''">
                                    {{
                                        $t('contract.tt2')
                                    }}
                                </text>
                            </view>
                        </view>
                    </view>
                    <view class="content-cell mt-10">
                        <view class="content-cell-input-box">
                            <input class="_input" v-model="numVal" :cursor-spacing="120"
                                   :placeholder="$t('financing.t40')"/>
                            <text class="i_text color-gray font-13">USDT</text>
                            <text class="i_text color-blue font-13"
                                  @click="mtabIndex === 0 ? numVal=balance.legal_balance* 0.95:numVal=position.position[pindex]['margin']*0.9">
                                {{
                                    $t('financing.t89')
                                }}
                            </text>
                        </view>
                    </view>
                    <view class="content-cell mt-10">
                        <text class="font-12 color-gray">
                            {{
                                mtabIndex === 0 ? $t('contract.tt3') : $t('contract.tt33')
                            }}
                        </text>
                        <text class="font-12 color-black">
                            {{
                                $util.thousandSeparator(balance.legal_balance * 0.95, 2)
                            }} USDT
                        </text>
                    </view>
                    <view class="content-cell mt-10">
                        <text class="font-12 color-gray">{{
                                $t('contract.tt4')
                            }}
                        </text>
                        <text class="font-12 color-black">
                            {{
                                $util.thousandSeparator(calacStopPrice(pindex), currentCurrency['decimals'])
                            }}
                            USDT
                        </text>
                    </view>
                    <view class="content-cell mt-10">
                        <fui-button @click="changeMargin()" class="_button" radius="10rpx"
                                    background="var(--blue)" size="26"
                                    :text="$t('确定')"></fui-button>
                    </view>
                </view>
            </view>
        </fui-bottom-popup>

        <!--  侧边弹窗   -->
        <uni-drawer ref="showSelect" mode="left" :showrAudus="true" :width="$device.windowWidth*0.8"
                    style="z-index: 10002;">
            <view class="drawer" :style="{'height': $device.windowHeight + 'px'}">
                <fui-nav-bar
                    background="var(--white)"
                    color="var(--content-primary)"
                    custom>
                    <view class="drawer-title">
                        <text class="font-16 color-black font-weight">
                            {{
                                $t('contruct.pl9')
                            }}
                        </text>
                    </view>
                </fui-nav-bar>
                <view class="drawer-search mt-10">
                    <view class="drawer-search-box">
                        <fui-icon name="search" size="38" color="var(--color-text-dark-gray)"></fui-icon>
                        <input type="text"
                               v-model="searchValue"
                               :placeholder="$t('contruct.pl10')"
                               placeholder-class="placeholder">
                    </view>
                </view>
                <view class="drawer-tabs mt-10">
                    <view class="drawer-tabs-item"
                          v-for="(item,index) in currency" :key="'drawer-tab'+item.id"
                          :class="{ 'bg-gray' : mindex === item.id }"
                          @click="mindex = item.id"
                    >
                        <text class="font-13"
                              :class="mindex === item.id ? 'color-black font-weight' : 'color-gray'">
                            {{
                                item['title']
                            }}
                        </text>
                    </view>
                </view>
                <view class="drawer-desc mt-10">
                    <view class="drawer-desc-item" @click="switchSort(0)">
                        <text class="font-12 color-gray">
                            {{
                                $t('contruct.pl12')
                            }}
                        </text>
                        <image :src="sort[0]['active']" mode="widthFix"></image>
                    </view>
                    <view class="drawer-desc-item">
                        <text class="font-12 color-gray">
                            {{
                                $t('contruct.pl13')
                            }}
                        </text>
                    </view>
                    <view class="drawer-desc-item">
                        <text class="font-12 color-gray">
                            {{
                                $t('contruct.pl14')
                            }}
                        </text>
                    </view>
                </view>
                <scroll-view
                    class="drawer-list"
                    scroll-y
                >
                    <template v-for="(tab,tabindex) in currency"
                              :key="'sv'+tabindex">
                        <template v-if="mindex===tab.id">
                            <view class="drawer-list-not" v-if="tab.currency.length === 0">
                                <empty-view :visible="true" :title="$t('list.not_data')"></empty-view>
                            </view>
                            <view class="drawer-list-cell"
                                  v-else
                                  v-for="(item,index) in tab.currency"
                                  :key="'m'+index"
                                  @click="setCurrentCurrency(tab,item)">
                                <view class="drawer-list-cell-item">
                                    <text class="font-14 color-black font-weight">
                                        {{
                                            item['symbol']
                                        }}/{{
                                            tab.legal ? tab.legal.symbol : ''
                                        }}
                                    </text>
                                </view>
                                <view class="drawer-list-cell-item">
                                    <text
                                        :class="{'price_up' : item.change_rate >= 0, 'price_down' : item.change_rate < 0}"
                                        class="font-13 font-weight">
                                        {{
                                            $util.thousandSeparator(item.new_price, item.decimals)
                                        }}
                                    </text>
                                </view>
                                <view class="drawer-list-cell-item">
                                    <text class="font-11 font-weight"
                                          :class="{'price_up' : item.change_rate >= 0, 'price_down' : item.change_rate < 0}">
                                        {{
                                            $util.thousandSeparator(item.change_rate, 2)
                                        }}%
                                    </text>
                                </view>
                            </view>
                        </template>
                    </template>
                </scroll-view>
            </view>
        </uni-drawer>

        <alert ref="alert" @confirm="alertConfirm()" :title="$t('login.tip_t2')" ctxt="取消"
               :content="content"></alert>
        <loading ref="loading"></loading>
    </view>
</template>
<!--
 1.在页面的关闭或者隐藏的时候清除数据的实时加载，
 2.ws 接收到数据后，将数据写入本地缓存中，维护一个最新价格缓存和一个全量列表缓存
 3.在界面不需要渲染的时候，将收到的数据写入缓存，界面从缓存中读取数据
 4.应用启动的时候加载一次k线缓存数据，在ws

 最小的价格数据一次包可能会推送多个币种，单k线图详情界面订阅后只会推一种币种的数据
 最新价格数据是全局实时推送，要做好缓存的处理。
 -->
<script>
import contract from './contract.js';

export default contract;
</script>

<style lang="scss" scoped>
@import "contract.scss";
</style>

<style scoped>
/deep/ .uni-combox__selector {
    z-index: 3;
}

/* First UI Tab左右边距(Kline Time) */
/deep/ .fui-tabs__item {
    padding: 0 50rpx 0 0 !important;
}


/deep/ .fui-ddm__down {
    transform-origin: center top;
    animation: ddDownHide 0.5s forwards;
}

/deep/ .fui-ddm__down-show {
    transform: translateY(105%) scale(1);
    transform-origin: center top;
    animation: ddmDownShow 0.5s forwards;
}

@keyframes ddDownHide {
    0% {
        transform: translateY(105%) scale(1);
    }
    100% {
        transform: translateY(105%) scale(0);
    }
}

@keyframes ddmDownShow {
    0% {
        transform: translateY(105%) scale(0);
    }
    50% {
        transform: translateY(105%) scale(1);
    }
    75% {
        transform: translateY(105%) scale(0.9);
    }
    100% {
        transform: translateY(105%) scale(1);
    }
}

/deep/ .fui-dropdown__menu-list {
    margin-top: 20rpx;
    padding: 10rpx;
    box-sizing: border-box;
}

/deep/ .fui-dropdown__menu-item {
    background-color: transparent;
    border-radius: 8rpx;
}

/deep/ .fui-dropdown__menu-list .fui-dropdown__menu-item:active {
    background-color: var(--background-primary) !important;
}

/deep/ .uni-slider-handle-wrapper {
    height: 8rpx;
}

/deep/ .uni-slider-thumb {
    width: 16rpx !important;
    height: 20rpx !important;
    margin-top: -16rpx !important;
    border: 6rpx solid var(--white);
    border-radius: 4rpx !important;
}

/deep/ .fui-collapse-item__title {
    height: 88rpx;

}

/deep/ .fui-collapse__title {
    color: var(--content-primary);
}

/deep/ .fui-collapse__disabled {
    opacity: 1;
}

/deep/ .fui-collapse__content {
    display: flex;
    flex-direction: column;
}

/deep/ .fui-input__number {
    width: 100%;
}

/deep/ .fui-number__minus,
/deep/ .fui-number__plus {
    width: 88rpx;
    height: 88rpx;
    border-radius: 8rpx;
    background: var(--background-secondary);
    line-height: 88rpx;
    text-align: center;
}

/deep/ .fui-number__input {
    width: calc(100% - 216rpx) !important;
    height: 88rpx !important;
    margin: 0 20rpx !important;
}
</style>