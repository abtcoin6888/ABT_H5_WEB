
var url = '' //地址
var timeout = 0 //心跳检测
var cb = null 

var unisocketStatus = 0 //避免重复连接 0 无连接 1-9连接中 10 已连接
var heartbeatTimeOut = null //检测服务器端是否还活着
var reconnectTimeOut = null //重连之后多久再次重连
var reconnectNum = 0 //重连次数
var unisocketTask = null //ws对象
var msgQueue = []

var netIsConnected = false
var netType = 'none'

var autoFlag = true

var checkSet;

/**
 * uniapp 的 connectSocket 封装
 * 
 */
class uniWebsocket {

    /**
     * 构造方法
     * @param {String} _url
     * @param {number} _timeout
     * @param {Function} _cb
     */
	constructor(_url, _cb, _timeout=50000) {
        
		this.url = _url //地址
		this.timeout = _timeout //心跳检测
		this.cb = _cb
        
        // 监听网络状态变化
        uni.onNetworkStatusChange((res)=> {
        	console.log('WebSocket NetStatus',res.isConnected);
        	console.log('WebSocket NetStatus',res.networkType);
            netIsConnected = res.isConnected
            netType = res.networkType
            reconnectNum = 0 
            if(autoFlag) this.reconnect()
        });

		try {
            uni.getNetworkType({
            	success: (res)=> {
            		console.log('WebSocket getNetworkType',res.networkType);
                    netType = res.networkType
                    netIsConnected = true
                    
                    this.reconnect();   
            	}
            });
			
			// 有return ，则构造方法返回return的对象，没有，则返回new的对象
			// return this.hhh
		} catch (e) {
			console.log('连接初始化失败',e);
		}
		
	}

    /**
     * 连接创建方法，维护连接状态、心跳、回调
     */
	connectSocketInit() {
        
        if(!netIsConnected || netType == 'none') return
        if(unisocketStatus > 0) return
        if(!this.url) return
        
        heartbeatTimeOut && clearTimeout(heartbeatTimeOut)
        
        unisocketStatus = 1;
        
        console.log('正准备建立websocket...',this.url);
        
		uni.onSocketError(function (res) {
            unisocketStatus = 0;
            console.log('WebSocket 连接错误！',unisocketStatus,res);
		});
        
        uni.onSocketClose(function (res) {
            unisocketStatus = 0;
            console.log('WebSocket 连接关闭！',res);
            this.restart();
        });
        
        uni.onSocketOpen(function (res) {
            unisocketStatus = 10;
            console.log('WebSocket 连接打开！',res);
		});
        
        // 建立连接
		this.unisocketTask = uni.connectSocket({
			url: this.url,
			success:(data)=>{
                unisocketStatus = 2;
				console.log("websocket 建立中...");
			},
            fail: (data)=> {
                unisocketStatus = 0;
                console.log("websocket 建立失败...");
            },
            complete: (data)=> {
                unisocketStatus = 3;
                console.log("websocket 建立完成...");
            }
		});
        
        // 连接打开
        // 上面的构造方法必须存在，否则 this.unisocketTask.onOpen 不可用
        this.unisocketTask.onOpen((res) => {
            console.log("unisocketTask 正常了");
            // 连接标识
            unisocketStatus = 10;
            reconnectNum = 0;
            // 心跳
            this.ping();
            // 注：只有连接正常打开中 ，才能正常收到消息
            this.unisocketTask.onMessage((res) => {
                // console.log(res.data.type,res.data)
                this.receive(res.data)
            });
			uni.$emit('reconnected-t');
			checkSet && clearTimeout(checkSet);
			checkSet = setTimeout(()=>{
				if(unisocketStatus != 10){
					clearTimeout(checkSet);
					this.reconnect();
				}
			},1000);
        })
        
        // 连接关闭
        // 这里仅是事件监听【如果socket关闭了会执行】
        this.unisocketTask.onClose(() => {
            console.log("uni unisocketTask 关闭了")
            unisocketStatus = 0;
            this.restart();
        })
        
        // 连接错误
        // 监听连接失败，这里代码我注释掉的原因是因为如果服务器关闭后，和下面的onclose方法一起发起重连操作，这样会导致重复连接
        // this.unisocketTask.onError(() => {
        //     console.log("unisocketTask 错误了")
        //     unisocketStatus = 0;
        // })
		
	}
	
    /**
     * 重新连接，循环检查连接状态
     */
	reconnect(){
		if(unisocketStatus >= 1 && unisocketStatus < 10){
			return false;
		}
        this.connectSocketInit();
	}
	
    /**
     * 重新打开链接
     */
    restart(){
        
        // if(unisocketStatus >= 10) {
        //     console.log("连接已打开");
        //     return;
        // }
        unisocketStatus = 0;
        autoFlag = true
        
        this.reconnect()
        
    }
    
    /**
     * 关闭链接
     */
    close(){
        
        if(unisocketStatus < 10) {
            console.log("连接未打开");
            return;
        }
        
        heartbeatTimeOut && clearTimeout(heartbeatTimeOut)
        reconnectTimeOut && clearTimeout(reconnectTimeOut)
        
        autoFlag = false

        this.unisocketTask.close()
    	
    }
    
    /**
     * 发送消息
     * @param {String} value
     */
	send(value){
        
        value = JSON.stringify(value)
        
        msgQueue.push(value);
        
        if(unisocketStatus < 10) {
            console.log("**********","连接错误，消息发送失败",value);
			this.restart()
            return;
        }
        // console.log("msgQueue ",this.msgQueue.length);
        let msg = '';
        while(msg = msgQueue.shift()){
            // 注：只有连接正常打开中 ，才能正常成功发送消息
            this.unisocketTask.send({
            	data: msg,
            	async success() {
            		// console.log("消息发送成功");
            	},
            });
        }
		
	}
    
    /**
     * 接收消息
     * @param {String} value
     */
    receive(data){
        
        data = JSON.parse(data)
        if(typeof this.cb !== 'function') {
            console.log('receive callback fun is not function',data.type,data)
            return
        }
        this.cb(data)
        
    }
    
    getStatus(){
        return unisocketStatus
    }
	
    /**
     * 开启心跳检测
     */
	ping(){
		
		heartbeatTimeOut && clearTimeout(heartbeatTimeOut)
		
        if(unisocketStatus >= 10) {
            let data={'type': 'ping'}
            this.send(data);
        }
		
        if(this.timeout < 10000) return
        
        // 定时器
		heartbeatTimeOut = setTimeout(()=>{
			this.ping()
		},this.timeout)
        
	}
	
}

export default uniWebsocket
// module.exports = uniWebsocket
