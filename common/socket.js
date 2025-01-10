const socket = {
	/**
	 * 回调信息
	 */
	UDPSocket: null,
	//单播流程
	receivedStatus: () => {},
	receivedMsgCallBack: () => {},
	receivedHexMsgCallBack: () => {},
	//广播流程
	recBroadcastStatus: () => {},
	recBroadcastMsgCallBack: () => {},
	recBroadcastHexMsgCallBack: () => {},

	/**
	 * 初始化连接UDP服务器
	 * @param {Object} ip	UDP服务器IP
	 * @param {Object} port UDP服务器端口
	 * @param {Object} charsetname 字符集格式 //可不传,默认'UFT-8',可选'GBK'
	 */
	init(ip, port, charsetname) {
		socket.UDPSocket = uni.requireNativePlugin('Aimer-UDPPlugin');
		socket.connect(ip, port, charsetname);
	},

	connect(ip, port, charsetname) {
		socket.UDPSocket.connect({
				charsetname: charsetname, //可不选,默认UTF-8,可选'GBK'
				ip: ip,
				port: port
			},
			result => {
				/**
				 * status : 0 连接成功
				 * status : 1 断开连接
				 * receivedMsg : 服务器返回信息
				 * receivedHexMsg : 服务器返回字节数组(单片机、智能家居等硬件数据交互)
				 */
				if (result.status) {
					//连接状态
					socket.receivedStatus(result.status);
				}
				if (result.receivedMsg) {
					//服务器返回信息
					socket.receivedMsgCallBack(result.receivedMsg);
				}
				if (result.receivedHexMsg) {
					//Hex服务器返回信息
					socket.receivedHexMsgCallBack(result.receivedHexMsg);
				}
			}
		);
	},

	/**
	 * 客户端 发送字符串消息
	 * @param {Object} message 发送内容
	 * @param {Object} charsetname 字符集格式
	 */
	send(message, charsetname) {
		socket.UDPSocket.send({
			charsetname: charsetname, //可不选,默认UTF-8,可选'GBK'
			message: message
		});
	},

	/**
	 * 客户端 发送字节数组(发送控制单片机、智能家具等硬件的指令)
	 * @param {Object} bytesMessage
	 */
	sendBytes(bytesMessage) {
		socket.UDPSocket.sendBytes({
			bytesMessage: bytesMessage
		});
	},

	/**
	 * 断开单播连接
	 */
	disconnect() {
		socket.UDPSocket.disconnect();
	},

	/**
	 * 客户端 发送字符串广播
	 * @param {Object} message
	 * @param {Object} ip
	 * @param {Object} port
	 * @param {Object} charsetname
	 */
	sendBroadcast(message, ip, port, localPort, charsetname) {
		socket.UDPSocket = uni.requireNativePlugin('Aimer-UDPPlugin');
		socket.UDPSocket.sendBroadcast({
			charsetname: charsetname, //可不选,默认UTF-8,可选'GBK'
			message: message,
			ip: ip,
			port: port,
			localPort: localPort
		});
	},

	/**
	 * 客户端 发送字节数组广播(发送控制单片机、智能家具等硬件的指令)
	 * @param {Object} bytesMessage
	 * @param {Object} ip
	 * @param {Object} port
	 */
	sendBytesBroadcast(bytesMessage, ip, port, localPort) {
		socket.UDPSocket = uni.requireNativePlugin('Aimer-UDPPlugin');
		socket.UDPSocket.sendBytesBroadcast({
			bytesMessage: bytesMessage,
			ip: ip,
			port: port,
			localPort: localPort
		});
	},

	/**
	 * 开启广播接收
	 * @param {Object} port
	 * @param {Object} charsetname
	 */
	bindBroadcast(port, charsetname) {
		socket.UDPSocket = uni.requireNativePlugin('Aimer-UDPPlugin');
		socket.UDPSocket.bindBroadcast({
				charsetname: charsetname, //可不选,默认UTF-8,可选'GBK'
				port: port
			},
			result => {
				/**
				 * status : 0 开启广播接收
				 * status : 1 关闭广播接收
				 * recBroadMsg : 服务器返回信息 
				 * recBroadHexMsg :服务器返回字节数组(单片机、智能家居等硬件数据交互)
				 * recBroadAddress :发送端IP地址
				 */
				if (result.status) {
					//连接状态
					socket.recBroadcastStatus(result.status);
				}
				if (result.recBroadMsg) {
					//服务器返回信息
					socket.recBroadcastMsgCallBack(result.recBroadMsg, result.recBroadAddress);
				}
				if (result.recBroadHexMsg) {
					//Hex服务器返回信息
					socket.recBroadcastHexMsgCallBack(result.recBroadHexMsg, result.recBroadAddress);
				}
			}
		);
	},

	/**
	 * 关闭广播接收
	 */
	closeBroadcast() {
		socket.UDPSocket = uni.requireNativePlugin('Aimer-UDPPlugin');
		socket.UDPSocket.closeBroadcast();
	}
}

export default socket;
