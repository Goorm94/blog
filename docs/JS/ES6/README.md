# ES6

# 1.1 변수 선언하기

## 1.1.1 const

**`ES6`** 이전에는 모든 값을 변수에 넣어 사용했다. 하지만 변수는 값을 변경할 수 있다.

```javascript
var pizza = true
pizza = false
console.log(pizza) // false
```

상수에 값을 재설정하는 것은 불가능하다.

```javascript
const pizza = true
pizza = false
```

## 1.1.2 let

자바스크립트도 **`ES6`**부터는 **구문적인 변수 영역 규칙**을 지원한다. 일반적인 언어에서 함수의 경우 코드 블록이 별도의 변수 영역을 이룬다. 하지만 자바스크립트에서는 블록 안에서 변수르르 새로 만들면 그 변수의 영역이 그 블록 안으로만 한정되지 않는다.

```javascript
var topic = "자바스크립트"
if (topic) {
    var topic = "리액트"
    console.log('블록', topic) // 블록 리액트
}
console.log('글로벌', topic) // 글로벌 리액트
```

let 키워드를 사용하면 변수 영역을 코드 블록 안으로 한정시킬 수 있다.

```javascript
var topic = "자바스크립트"
if (topic) {
    let topic = "리액트"
    console.log('블록', topic) // 블록 리액트
}
console.log('글로벌', topic) // 글로벌 자바스크립트
```

**`{}`**가 새로운 영역을 만들어내지는 못하는 다른 부분으로는 for 루프도 있다.

## 1.1.3 템플릿 문자열

템플릿 문자열을 문자열 연결 대신 사용할 수 있다.
전통적인 문자열 연결은 더하기 기호(+)로 문자열과 변수를 서로 이어붙이는 방식을 사용한다.

```javascript
console.log(lastName + ", " + firstName + " " + middleName)
```

템플릿에서는 ${}를 사용해 문자열 안에 변수를 집어넣을 수 있기 때문에 문자열을 단 한나만 사용해도 된다. 템플릿 문자열의 ${}에는 값을 만들어내는 자바스크립트 식이라면 어떤 것이든 들어갈 수 있다.

```javascript
console.log(`${lastName}, ${firstName} ${middleName}`)
```

## 1.1.4 디폴트 파라미터

C++나 파이썬 같은 언어에서는 함수의 인자로 디폴트 값을 선언할 수 있다.
**`ES6`**에도 디폴트 파라미터가 추가되었다.

```javascript
function printLog(message="로그 메세지") {
    console.log( `로그 메세지는 ${message}입니다.` )
}
```





# 1.2 화살표 함수

화살표 함수는 **`ES6`**에 새로 추가된 유용한 기능이다. 이를 사용하면 function 키워드 없이도 함수를 만들 수 있으며, return을 사용하지 않아도 식을 계산한 값이 자동으로 반환된다.

```javascript
var lodify = firstname => `캔터베리의 ${firstname}`
```

화샬표 (=>)를 사용하면 모든 함수 정의를 한 줄로 끝낼 수 있다. function 키워드를 없앴고, 화살표가 어떤 값을 반환하는지 지정해주기 때문에 return도 없앴다. 또다른 장점은 함수가 파라미터를 단 하나만 받는 경우 파라미터 주변의 괄호를 생략해도 된다는 것이다.
파라미터가 2개 이상이라면 괄호가 필요하다.

```javascript
var lodify = (firstName, land) => `${land}의 ${firstName}`
```

화살표 함수는 this를 새로 바인딩하지 않는다.

```javascript
var gangwon = {
    resorts: {"용평", "평창", "강촌", "강릉", "홍천"},
    print: function(delay=1000) {
        setTimeout(function() {
            console.log(this.resorts.join(","))
        }, delay)
    }
}

gangwon.print() // Cannot read property 'join' of undefined 오류 발생
```

이 오류는 this가 window 객체이기 떄문에 resorts가 undefined다. 이런 방법 대신 화살표 함수를 사용하면 this 영역이 제대로 유지된다.

```javascript
var gangwon = {
    resorts: {"용평", "평창", "강촌", "강릉", "홍천"},
    print: function(delay=1000) {
        setTimeout(() => {
            console.log(this.resorts.join(","))
        }, delay)
    }
}

gangwon.print() // 용평, 평창, 강촌, 강릉, 홍천
```



# 1.3 ES6 객체와 배열

## 1.3.1 구조 분해를 사용한 대입

구조분해를 사용하면 객체 안에 있는 필드 값을 원하는 변ㄴ수에 대입할 수 있다.

```javascript
var sandwich = {
    bread: "더치 크런치",
    meat: "참치",
    cheese: "스위스",
    toppings: ["상추", "토마토", "머스타드"]
}

var {bread, meat} = sandwich

console.log(bread, meat) // 더치 크런치 참치
```

두 변수를 변경해도 원래의 필드 값은 바뀌지 않는다.
객체를 분해해서 함수의 인자로 넘길 수도 있다.

```javascript
var lodify = ({firstname}) => {
    console.log(`캔터베리의 ${firstname}`)
}

lodify(regularPerson) // 캔터베리의 현석
```

배열을 구조 분해해서 원소의 값을 변수에 대입할 수도 있다.

```javascript
var [firstResort] = ["용평", "평창", "강촌"]

console.log(firstResort) // 용평
```

불필요한 값을 콤마(,)를 사용해 생략하는 리스트 매칭을 사용할 수도 있다.

```javascript
var [,,thirdResort] = ["용평", "평창", "강촌"]

console.log(thirdResort) // 강촌
```

## 1.3.2 객체 리터럴 개선

객체 리터럴 개선은 구조 분해의 반대라 할 수 있다. 객체 리털러 개선은 구조를 다시 만들어내는 과정 또는 내용을 한데 묶는 과정이라 할 수 있다.

```javascript
var name = "Tallac"
var elevation = 9738
var print = () => {
    console.log(`${this.name} 산의 높이는 ${this.elevation}피트입니다.`)
}

var funHike = {name, elevation, print}

funHike.print() // 탈락 산의 높이는 9738피트입니다.
```

객체 메서드를 정의할 때 더이상 function 키워드, 화살표 함수를 사용하지 않아도 된다.

```javascript
// 새로운 방식
const skier = {
    name,
    sound,
    powderYell() {
        let yell = this.sound.toUpperCase()
        console.log(`${yell} ${yell} ${yell}!!!`)
    },
    speed(mph) {
        this.speed = mph
        console.log('속력(mph):', mph)
    }
}
```

## 1.3.3 스프레드 연산자

스프레드 연산자는 세 개의 점(...)으로 이루어진 연산자로, 몇 가지 다른 역할을 담당한다.

```javascript
var peaks = ["대청봉", "중청봉", "소청봉"]
var canyons = ["천불동계곡", "가야동계곡"]
var seoraksan = [...peaks, ...canyons]

console.log(seoraksan.join(', )) // 대청봉, 중청봉, 소청봉, 천불동계곡, 가야동계곡
```

Array.reverse 메서드는 원본 배열을 변경한다. 하지만 스프레드 연산자를 사용하면 원본 배열을 변경하지 않고 복사본을 만들어서 뒤집을 수 있다.

```javascript
var peaks = ["대청봉", "중청봉", "소청봉"]
var [last] = [...peaks].reverse()

console.log(last) // 소청봉
console.log(peaks.join(', ')) // 대청봉, 중청봉, 소청봉
```

스프레드 연산자를 사용해 배열의 나머지 원소를 얻을 수도 있다.

```javascript
var lakes = ["경포호", "화진포", "송지호", "청초호"]
var [first, ...rest] = lakes

console.log(rest.join(", ")) // "화진포, 송지호, 청초호"
```



# 1.4 프라미스

프라미스는 비동기적인 동작을 잘 다루기 위한 방법이다.
프라미스를 사용하면 이런 여러 가지 성공이나 실패를 편리하게 단순한 성공이나 실패로 환원할 수 있다.

```javascript
const getFakeMembers = count => new Promise((resolves, rejects) => {
    const api = `https://api.randomuser.me/?nat=US&results=${count}`
    const request = new XMLHttpRequest()
    request.open('GET', api)
    request.onload = () =>
        (request.status === 200) ?
        resolves(JSON.parse(request.response).results) :
        reject(Error(request.statusText))
    request.onerror = (err) => rejects(err)
    request.send()
})
```

getFakeMembers 함수는 새로운 프라미스를 반환한다. 그 프라미슨느 randomuser.me API에 요청을 보낸다.

프라미스가 성공한 경우에 처리할 작업을 기술하기 위해 then 함수를 프라미스 뒤에 연쇄시킨다.
이때 오류를 처리하기 위한 콜백도 함께 제공한다.

```javascript
getFakeMembers(5).then(
    members => console.log(members),
    err => console.error(
        new Error("randomuser.me에서 멤버를 가져올 수 없습니다.")
    )
)
```





# 1.5 클래스

**`ES6`**에는 클래스 선언이 추가되었다. 함수는 객체며 상속은 프로토타입을 통해 처리된다.

```javascript
class Vacation {

    constructor(destination, length) {
        this.destination = destination
        this.length = length
    }

    print() {
        console.log(`${this.destination}은(는) ${this.length}일 걸립니다.`)
    }
}
```

클래스를 정의하고 나면 new 키워드를 사용해 해당 클래스의 새로운 인스턴스를 만들 수 있다. 그 후 그 인스턴스의 메서드(클래스에 정의된)를 호출할 수 있다.

```javascript
const trip = new Vacation("칠레 산티아고", 7)

console.log(trip.print()) // 칠레 산티아고는(는) 7일 걸립니다.
```

클래스를 확장할 수도 있다. 기존의 클래스(부모또는 상위 클래스)를 확장한 새로운 클래스(자식또는 하위클래스)는 상위 클래스의 모든 프로퍼티와 메서드를 상속한다. 이렇게 상속한 프로퍼티나 메서드를 하위 클래스 선언 안에서 변경할 수도 있다.

```javascript
class Expedition extends Vaction {
    
    constructor(destination, length, gear) {
        super(destination, length)
        this.gear = gear
    }

    print() {
        super.print()
        console.log(`당신의 ${this.gear.join("와(과) 당신의 ")}를(을) 가져오십시오.`)
    }
}
```





# 1.6 ES6 모듈

자바스크립트 모듈은 다른 자바스크립트 파일에서 쉽게 불러서 활용할 수 있는 재사용 가능한 코드 조각을 말한다. **`ES6`**이전의 자바스크립트를 모듈화하는 방법은 모듈의 임포트와 익스포트를 처리하는 라이브러리를 활용하는 것뿐이었다. 하지만 **`ES6`**부터는 자바스크립트 자체에서 모듈을 지원하기 시작했다.

```javascript
export const print(message) => log(message, new Date())

export const log(message, timestamp) =>
    console.log(`${timestamp.toString()}: ${message}`)
```

export를 사용해 다른 모듈에서 활용하도록 이름(함수, 객체, 변수, 상수 등이 될 수 있다)을 외부에 익스포트 할 수 있다. 모듈에서 단 하나의 이름만 외부에 익스포트하고 싶을 때 export default를 사용한다.

모듈은 import 명령을 사용해 다른 자바스크립트 파일을 불러와 사용할 수 있다.

```javascript
import { print, log } from './text-helpers'
impot freel from './mt-freel'

print('메시지를 print')
log('메시지를 log')

freel.print()
```

import *를 사용하면 다른 모듈에서 가져온 모든 이름을 사용자가 정한 로컬 이름 공간 안에 가둘 수 있다.





# 1.7 커먼JS

커먼JS는 모든 버전의 노드에서 지원하는 일반적인 모듈 패턴이다. 커먼JS를 사용하면 자바 객체를 module.exports를 사용해 익스포트할 수 이싿.

```javascript
const print(message) => log(message, new Date())

const log(message, timestamp) =>
    console.log(`${timestamp.toString()}: ${message}`)

module.export = {print, log}
```

커먼JS는 import 문을 지원하지 않는다. 대신 require 함수로 모듈을 임포트할 수 있다.

```javascript
const { log, print } = require('./text-helpers')
```
