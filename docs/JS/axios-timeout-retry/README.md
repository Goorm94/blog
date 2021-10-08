# Axios, Timeout, Retry



### 들어가며

기본적으로 api timeout이 설정되어 있지 않습니다. 따라서, API를 호출하면 서버에서 응답을 주기 전까지는 계속 연결되어 있는 현상을 확인 할 수 있습니다. 간단한 설정을 통해 Axios에서 제공하는 Timeout을 설정하는 방법을 알아보도록 하겠습니다.


# axios timeout

axios를 생성하여 timeout을 옵션으로 추가하고 해당 인스턴스로 api를 호출하도록 작업을 진행합니다.

timeout 설정에 앞서 기본적인 axios의 Api 요청에 대해 알아보겠습니다.

API 요청은 axios에게 관련된 설정을 보냄으로써 만들어 지며 기본형, 편하게 사용하기 위한 aliases, 동시성을 위한 함수, custom instance 등을 통한 방법을 주로 사용합니다. 각각의 Api 요청과 Timeout 설정 방법 예시입니다.

```javascript
//⭐ 기본형 ⭐
axios({
	method: 'post',
	url: '/user/1234',
	data: {
		firstName: 'HI',
		lastName: "Hello"
	},
    timeout: 100
});

// ⭐ 요청 메소드 aliases ⭐
axios.request(config)
axios.get(url[ , config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, config])
axios.put(url[, config])
axios.patch(url[, config])

axios.get(`http://url.domain/count`, {timeout : 500 });

//⭐ Custom Instance 활용 ⭐

//instance 생성과 동시에 설정
const instance = axios.create({
    baseURL: 'https://domain/api',
    timeout : 1000,
    headers: {'X-Custom-Header':'foo'}
})

//따로 설정
const instance = axios.create() 
instance.defaults.timeout = 2500; 

// instance 를 통한 Api 요청시 config 에 timeout 을 추가하여 기본값 대신 사용 가능
instance.get('/Request', {
    timeout: 5000
}); 

//인스턴스 호출 메서드 옵션 > 인스턴스.defaults 설정 옵션 > 인스턴스.create()에 설정된 옵션
```



여러개의 방법이 각각 달라보이실 수도 있지만, 핵심은 Api  요청 Config에 Timeout 값을 추가해서 해당 시간이 지나면 Error를 발생시키는 로직이라고 생각하시면 편하실 것 같습니다. config 설정에 대해 알아 보실 분들은 [공식문서](https://axios-http.com/docs/intro)를 참고해주세요.

#### Timeout 걸린 후에 처리

```javascript
const axios =- require("axios");

axios
	.post("http://domain/post", { name: "ham"}, {timeout : 50})
	.then(response => {
		console.log(response.data);
	})
	.catch(error => {
		console.log(error)
	})
```

위의 코드는 간단한 axios.post Api 요청입니다. 다음과 같은 요청에서 타임아웃이 발생한 경우 다음과 같은 error를 출력합니다.

```
Error: timeout of 50ms exceeded
    at createError (createError.js:16)
    at XMLHttpRequest.handleTimeout (xhr.js:95)
```



Error 문을 만든 xhr 과 createError 파일을 보도록 하겠습니다.

```javascript
// xhr.js
// Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };
```

```javascript
//createError.js
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

```

xhr.js 는 비동기 Http 통신에 관한 js 파일 입니다. 제가 요청한 Api는 최종적으로 xhr을 통해 통신하게 되는데요. Timeout이 발생한 경우 javascript의 Error 객체에 값을 추가해 error를 만드는 작업을 합니다.  **Timeout의 경우 request 객체를 추가하는것을 알 수 있습니다.**



```javascript
// https://github.com/axios/axios
export interface AxiosError<T = any> extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponse<T>;
    isAxiosError: boolean;
    toJSON: () => object;
}
```

Error 객체는 AxiosError 타입의 형태를 띄고 있습니다.

- message : 사용자에게 보여줄 메시지
- config : 요청 Api 의 config
- code : 오류 코드를 명시 합니다. ECONNABORTED는 Connection aborted를 의미합니다.
- request : 요청에 대한 아무런 값을 받지 못하거나 요청 전에 서버 이슈가 아닌 이유로 접속이 끊기면 request 객체(http) 정보를 보냄
- response :  요청을 보낼때 서버에서 에러가 발생하면 response 객체를 받으며, 이는 서버에 따라 다른 값일 수 있습니다.
    - data : 데이터
    - status : 상태 코드
    - headers : 헤더



대충 이런것들을 Error 객체에 담아서 반환해주고 우리는 그걸 catch 하는 거죠.

공식 문서에서는 이런식으로 Error handling을 하라고 알려주고 있습니다.

```javascript
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

error 객체에 담긴 값을 개발자가 해석해서 다음 작업을 시도하면 된다는 뜻입니다. 상황에 따라 어떤식으로 Error를 Handling 할지 정해져 있지는 않지만, 보통은 리셋 처리를 하던가 재시도를 할 것입니다. 그 중 재시도 방법에 대해 알아보겠습니다.



# Retry - Interceptors 활용

axios 개발팀에서 기본적으로 권하는 방법이기도 하다. 실패시 인터셉터로 잡아채서 재시도 하는 방법이다.  위의 예제처럼 각 API 요청마다 매번 에러를 잡아서 핸들링 하는 방식은 생산성이 매우 떨어지기 때문에, 기본틀을 형성해 공통적인 에러 처리를 수행하고 config값을 통해 세부적인 컨트롤을 하는 방법이라고 할 수 있겠다.

Interceptors는 HTTP 요청과 응답을 가로채는 기능으로 Axios 인스턴스가 '요청을 보내기 직전' 과 '응답을 받은 직후' 에 미리 등록한 핸들러 들을 차례로 실행합니다.

#### Request Interceptor

```
axios.interceptor.request.use(onFulfilled, onRejected)
```

`onFulfilled` 핸들러에서 무언가 에러가 발생하면 `onRejected` 핸들러가 실행됩니다. `onRejected` 핸들러가 실행되는 순간 요청은 이루어지지 않고 즉시 종료됩니다.



#### Response Interceptor

```
axios.interceptor.response.use(onFulfilled, onRejected)
```

응답에 대한 Interceptor는 상대 서버로부터 응답이 돌아온 직후에 가로챕니다. 응답이 성공적으로 돌아온다면 `onFulfilled` 핸들러를 통해 공통 처리를 진행할 수 있습니다.

하지만 만약 어떤 서버로 보낸 요청이 실패하여 돌아온다면 `onRejected` 핸들러가 동작하게 됩니다.



##### Interceptor의 사용

```javascript
import Axios from 'axios'

const axios = Axios.create()

axios.interceptors.request.use(    (config) => { 
    console.log('Request: OnFulfilled')  
    return config 
    }, (error) => { 
    console.log('Request: OnRejected') 
    return Promise.reject(error)
})

axios.interceptors.response.use(    (response) => {  
    console.log('Response: OnFulfilled')  
    return response 
    },  (error) => {    
    console.log('Response: OnRejected')  
    return Promise.reject(error)  
})

```

위의 config 와 response가 `onFulfilled` 로 정상적인 요청 및 응답은 return 해주고, error 가 발생할 경우 Promise 객체를 반환하는 코드 입니다.



우리는 앞서, Axios의 Timeout이 발생한 경우 Request를 가진 Error 객체를 반환하는 것을 확인하였습니다.  그렇다면 우리가 받는 응답중에서 Error 객체의 config에 timeout 값을 가지고 있는 Error를 잡아채서 재시도 하면 되지 않을까요?



#### 실패 시 재요청 하기

axios 요청은 Error 객체의 config에 저장되기 때문에 받은 그대로 다시 Request를 날려주기만 하면 됩니다.

```javascript
axios.interceptors.response.use(   
    function (response) { 
        return response;   
    }, 
        
    function (error) {     
      if(error.config.timeout){      
        console.log("timeout 발생...", error.config)
        setTimeout(()=>{           
            return axios.request(config);
       },5)      
    }        
    
    return Promise.reject(error);    });
```



#### 재시도 횟수 지정하기

아무래도 위의 코드대로라면 무한 에러를 낼 수 있기때문에 위험합니다. 재시도 횟수를 지정하는 방법을 알아 보겠습니다.

```javascript
const axios =- require("axios");

axios.post("http://domain/post", { name: "ham"}, {timeout : 50, retry : 0})
        .then(response => {		
            console.log(response.data);
        }).catch(error => {	
            console.log(error)
        })
```

우리는 앞서 timeout 값을 config에 저장해 Api 요청을 시도 하였습니다. 이와같이 retry 값을 만들고 횟수를 제한 하면 되겠죠

```javascript
axios.interceptors.response.use( 
    function (response){
        return response;
    }, 
    (error: AxiosError) => {
      if (error.config.timeout && error.config.retry < 2) {
        console.log("retry...", error.config)
        const config = {
          ...error.config,
          retry: error.config.retry + 1
        }
        setTimeout(() => {
          return axios.request(config);
        }, 5)

        return Promise.reject(error);
      }
    });
```



저는 모든 요청을 재시도 하고 싶진 않아서, retry 값을 가진 Api 요청만 retry 하기 위해 다음과 같이 코드를 작성하였는데요.  다음과 같이 모든 요청 실패시에 재시도하도록 Interceptor를 설정할 수 있습니다.

```javascript
import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

interface AxiosCustomRequestConfig extends AxiosRequestConfig {
    retryCount: number
}

const MAX_RETRY_COUNT = 2
const axios = Axios.create()

axios.interceptors.response.use(
    undefined, 
    (error: AxiosError) => {
        const config = error.config as AxiosCustomRequestConfig
        config.retryCount = config.retryCount ?? 0

        console.log('RETRY COUNT:', config.retryCount)

        const shouldRetry = config.retryCount < MAX_RETRY_COUNT
        if (shouldRetry) {
            config.retryCount += 1
            return axios.request(config)
        }

        return Promise.reject(error)
    }
)

```

출처 : [직방 기술 블로그](https://medium.com/zigbang/%EC%9A%B0%EB%A6%AC-axios%EC%97%90%EA%B2%8C-%EB%8B%A4%EC%8B%9C-%ED%95%9C-%EB%B2%88-%EA%B8%B0%ED%9A%8C%EB%A5%BC-%EC%A3%BC%EC%84%B8%EC%9A%94-a7b32f4f2db2)





## Retry - axios-retry 라이브러리 사용

요청을 재시도하는 다른 방법은 npm 라이브러리인 `axios-retry` 를 사용하는 것입니다.

```
$ npm install axios-retry
```

```javascript
// ES6
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });

axios.get('http://example.com/test') // The first request fails and the second returns 'ok'
  .then(result => {
    result.data; // 'ok'
  });

// Exponential back-off retry delay between requests
axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay});

// Custom retry delay
axiosRetry(axios, { retryDelay: (retryCount) => {
  return retryCount * 1000;
}});

// Works with custom axios instances
const client = axios.create({ baseURL: 'http://example.com' });
axiosRetry(client, { retries: 3 });

client.get('/test') // The first request fails and the second returns 'ok'
  .then(result => {
    result.data; // 'ok'
  });

// Allows request-specific configuration
client
  .get('/test', {
    'axios-retry': {
      retries: 0
    }
  })
  .catch(error => { // The first request fails
    error !== undefined
  });
```

Back-off 와 재시도 설정 등이 구현되어 있어 간단히 사용 가능합니다.  기본적인 설정만 한다면 원하는 요청에서 retry를 시도 할 수 있는 장점이 있습니다. 다만 JS에 맞춰 꾸준히 업데이트 될지 알수는 없다.

axios-retry의 자세한 설명을 알고자 한다면 다음글을 참고해 보자.

https://dev.to/yogski/axios-async-await-with-retry-4j5j



### 마무리

Axios에 Timeout을 걸어 요청이 무한히 묶여있는것을 방지하고, 재시도할 수 있게 기능을 추가해 보았습니다.

상황에 따라 조건을 추가한다면 Front - End 개발에 큰 도움이 될것입니다.



#### 참고

- https://axios-http.com/docs
- https://medium.com/zigbang/%EC%9A%B0%EB%A6%AC-axios%EC%97%90%EA%B2%8C-%EB%8B%A4%EC%8B%9C-%ED%95%9C-%EB%B2%88-%EA%B8%B0%ED%9A%8C%EB%A5%BC-%EC%A3%BC%EC%84%B8%EC%9A%94-a7b32f4f2db2
- https://github.com/axios/axios

