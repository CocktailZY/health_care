import {Alert} from 'react-native';


export default FetchUtil = {
	netUtil(url, data, type, nav, baseObj, callback, dealFlag) {
		if (type == 'POST') {
			let postOptions = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					//'Content-Type': 'application/json;charset=UTF-8',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				},
				body: JSON.stringify(data)
				// body:data
			};
			fetch(baseObj != '' ? url + dealPostParams(baseObj) : url, postOptions).then((response) => {
				return response.json();
			}).then((responseText) => {
				//  callback(JSON.parse(responseText));
				// console.log(responseText);
				// if(responseText.status == 'Success' || responseText.status){
					fetchSucFunc(dealFlag,responseText,nav,baseObj,callback);
				// }else{
				// 	//responseText.status == 'Fail'
				// 	callback('errorCode',responseText.code);
				// }
			}).catch(error => {
				// DeviceEventEmitter.emit('changeLoading', 'false');
				// alert('网络错误，请重试');
				// DeviceEventEmitter.emit('showFootAlert',{showFlag:true,msg:'网络错误，请重试'});
				callback('tip', '网络错误，请重试');
			});
		} else {
			let getOptions = {
				methd: 'GET',
			};

			let obj = {};

			obj.uuId = queryString(url, 'uuId');
			obj.ticket = queryString(url, 'ticket');
			obj.userId = queryString(url, 'userId');

			fetch(url, getOptions).then((response) => {
				return response.json();
			}).then((responseText) => {
				// console.log(responseText);
				// if(responseText.status == 'Success' || responseText.status){
					fetchGetSucFunc(dealFlag,responseText,nav,baseObj,obj,callback);
				// }else{
				// 	//responseText.status == 'Fail'
				// 	callback('errorCode',responseText.code);
				// }
				// console.log(responseText)
			}).catch(error => {
				// DeviceEventEmitter.emit('changeLoading', 'false');
				// alert('网络错误，请重试');
				// DeviceEventEmitter.emit('showFootAlert',{showFlag:true,msg:'网络错误，请重试'});
				callback('tip', '网络错误，请重试');
			});
		}

	},
     httpGet(url,data,callback) {
	    if(data){
	        let param="";
            for(let i in data){
                param+='&'+i +"="+data[i];
            }
          //  param=param.replace('&',"?");
            url+=param;
        }
        console.log(url);
    let init = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
    };
         fetch(url, init) .then((response) => response.json())
             .then((data) => {
                 console.log(data)
             	if(data.code==200){
                    callback(data.data)
				}else{
                    Alert.alert('提示', '网络链接出错');
				}
             })
             .catch((error) => {
                 Alert.alert('提示', '网络链接出错');
                 console.error(error);
             });
    // return new Promise(function (resolve, reject) {
    //     fetch(url, init)
    //         .then(response => {
    //             console.log(response)
    //             return response;
	// 		})
    //         .then(data => {
    //         	console.log(data)
    //             // if (data.code === 200) {
    //             //     resolve(data);
    //             // } else {
    //             //     callback(data);
    //             // }
    //         }).catch(function (ex) {
    //         reject(ex);
    //         Alert.alert('错误提示', '网络链接出错');
    //     });
    // });
}

};



