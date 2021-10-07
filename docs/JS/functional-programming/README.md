# 함수형 프로그래밍

# 1.1 함수형이란?

함수형 프로그래머들은 작은 함수를 아주 많이 작성하기 때문에 화살표 함수 구문을 사용할 수 있으면 코딩이 훨씬 더 간편해진다.

```javascript
const log = message => console.log(message)
```

함수를 변수에 넣을 수 있는 것과 마찬가지로 객체에 넣을 수도 있다. 심지어 함수를 배열에 넣을 수도 있다. 다른 값과 마찬가지로 함수를 다른 함수에 인자로 넘길 수도 있다.

```javascript
const insideFn = logger =>
    logger("함수를 다른 함수에 인자로 넘길 수도 있습니다.");

insideFn(message => console.log(message))
```

함수가 함수를 반환할 수도 있다. 이 또한 일반적인 값과 마찬가지다

```javascript
var createScream = function(logger) {
    return function(message) {
        logger(message.toUpperCase() + "!!!")
    }
}

const sream = createScream(meesage => console.log(message))

scream('함수가 함수를 반활할 수도 있습니다')
scream('createScream은 함수를 반환합니다')
scream('scream은 createScream이 반환한 함수를 가리킵니다')
```

마지막 두 예제, 즉 함수를 인자로 받거나 함수를 반환하는 함수를 고차 함수라고 부른다. **`ES6`** 문법을 사용하면 createScream 고차 함수를 화살표 함수로 표현할 수 있다.

```javascript
const createScream = logger => message => logger(message.toUpperCase() + "!!!")
```





# 1.2 선언적 프로그래밍

함수형 프로그래밍은 선언적 프로그래밍이라는 더 넓은 프로그래밍 패러다임의 한 가지다. 선언적 프로그래밍은 필요한 것을 달성하는 과정을 하나하나 기술하는 것보다 필욯나 것이 어떤 것인지 기수하는 데 방점을 두고 어플리케이션의 구조를 세워나가는 프로그래밍 스타일이다.

```javascript
const string = "This is the midday show with Cheryl Waters"
const urlFriendly = string.replace(/ /g, "-")

console.log(urlFriendly)
```

여기서는 string.replace와 정규식을 사용해서 모든 공백을 하이픈으로 변경한다. string.replace를 사용하면 모든 공백이 하이픈으로 변경되어야 한다는 사실을 기술할 수 있다. 공백을 하이픈으로 변경하는 자세한 방법은 replace 함수 안에 들어가고, 구체적 절차 대신 replace(치환이라는 뜻)라는 함수를 사용해 추상적인 개념을 표현한다.

선언적 프로그램은 코드 자체가 어떤 일이 벌어질지 설명하기 때문에 좀 더 추론하기 쉽다. 선언적 접근 방식이 더 읽기 쉽고, 그래서 더 추론하기 쉽다. 각 함수가 어떻게 구현되어있는지는 함수라는 추상화 아래에 감춰진다.

DOM을 만드는 과정을 살펴보자 명령형 접근 방식은 다음과 같이 DOM을 구착하는 절차와 관련 있다.

```javascript
var taget = document.getElementById('target')
var wrapper = document.createElement('div')
var headline = document.createElement('h1')

wrapper.id = "welcome"
headline.innerText = "Hello World"

wrapper.appendChild(headline)
target.appendChild(wrapper)
```

이제 리액트 컴포넌트를 사용해 DOM을 선언적으로 구성하는 방법을 살펴보자

```javascript
const { render } = ReactDOM

const Welcome = () => (
    <div id="welcome">
        <h1>Hello World</h1>
    </div>
)

render(
    <Welcome />,
    document.getElementById('target')
)
```

리액트는 선언적이다. 여기서 Welcome 컴포넌트는 렌더링할 DOM을 기술한다. render 함수는 컴포넌트에 있는 지시에 따라 DOM을 만든다. 이 과정에서 실제 DOM이 어떻게 렌더링되는지 대한 내용은 추상화로 사라진다. 이 코드를 보면 Welcome 컴포넌트를 ID가 target인 엘리먼트 안에 렌더링하고 싶어 하는 의도가 명확히 드러난다.





# 1.3 함수형 프로그래밍의 개념

다음은 함수형 프로그래밍의 핵심 개념인 불변성, 순수성, 데이터 변환, 고차 함수, 재귀를 소개한다.

## 1.3.1 불변성

함수형 프로그래밍에서는 데이터가 변할 수 없다. 불변성 데이터는 결코 바뀌지 않는다. 자바스크립에서 함수의 인자는 실제 데이터에 대한 참조다.

```javascript
var rateColor = function(color, rating) {
    return Object.assign({}, color, {ratin:rating})
}

console.log(rateColor(color_lawn, 5).rating) // 5
consolt.log(color_lawn.rating)  // 0
```

여기서 object.assign은 복사기와 같다. Object.assign은 빈 객체를 받고, color 객체를 그 빈 객체에 복사하고, 복사본에 있는 rating 프로퍼티의 값을 rating 파라미터의 값으로 변경한다. 원본으 그대로 남겨둔 채 rating 만 변경된 복사본으로 불변성을 유지한다.

**`ES6`**의 화살표 함수와 **`ES7`** 객체 스프레드 연산자를 활용해 같은 함수를 작성할 수도 있다.

```javascript
const rateColor = (color, rating) =>
({
    // 객체 스프레드 연산자
    // 노드나 브라우저 버전에 따라 지원 여부가 달라짐
    ...color,
    rating
})
```

여기서 반환할 객체를 괄호 ()로 감쌋다는 점에 주의하라. 활살표 함수의 본문에서 바로 중괄호 {}를 사용해 객체를 반환할 수 없기 때문에 꼭 괄호가 필요하다.

또한 Array.push는 불변성 함수가 아니다. 이 함수는 원본 배열에 새로운 원소를 추가한다. 원본 배열에 변화시키지 않고 유지하기 위해서는 **`Array.concat`**을 사용해야 한다.

```javascript
const addColor = (title, array) => array.concat({title})

console.log(addColor("매력적인 초록", colorArray).length)   // 4
console.log(colorArray.length)  // 3
```

앞에서 객체를 복사할 때 사용했던 방법과 똑같은 방법으로 **`ES6`**의 배열 스프레드 연산자를 사용해 배열을 복사할 수 있다.

```javascript
const addColor = (title, list) => [...list, {title}]
```

이 함수는 인자롤 받은 list를 변경하지 않기때문에 list의 원본인 colorArray의 불변성을 지켜준다.

## 순수 함수

순수 함수는 파라미터에 의해서만 반환값이 결정되는 함수를 뜻한다. 순수 함수는 최소 하나 이상의 인자를 받고, 인자가 같으면 항상 같은 값이나 함수를 반환한다. 순수 함수에는 부수 효과가 없다. 부수 효과란 전역 변수를 설정하거나, 함수 내부나 애플리케이션에 있는 다른 상태를 변경하는 것을 말한다.

```javascript
var frederick = {
  name: "Frederick Douglass",
  canRead: false,
  canWrite: false
}

const selfEducate = (person) => ({
  ...person,
  canRead = true,
  canWrite = true
})

console.log( selfEducate(frederick) )
console.log( frederick )

// {name: "Frederick Douglass", canRead: true, canWrite: true}
// {name: "Frederick Douglass", canRead: false, canWrite: flalse}
```

리액트에서는 UI를 순수 함수로 표현한다.

```javascript
const Header = (props) => <h1>{props.title}</h1>
```

이 함수는 엘리먼트를 만드는 일만 책임지며, DOM을 변경하는 책임은 애플리케이션의 다른 부분이 담당해야 한다. 순수 함수는 함수형 프로그래밍의 또 다른 핵심 개념이다. 순수 함수를 사용하면 애플리케이션의 상태에 영향을 미치지 않기 떄문에 코딩이 편해진다.

------

### 함수를 만들 때 다음 세 가지 규칙을 따르면 순수 함수를 만들 수 있다.

1. 순수 함수는 파라미터를 최소 하나 이상 받아야 한다.
2. 순수 함수는 값이나 다른 함수를 반환해야 한다.
3. 순수 함수는 인자나 함수 밖에 있는 다른 변수를 변경하거나 입출력을 수행해서는 안 된다.

## 1.3.3 데이터 변환

함수형 프로그래밍은 한 데이터를 다른 데이터로 변환하는 것이 전부다. 함수형 프로그래밍은 함수를 사용해 원본을 변경한 복사본을 만들어낸다. 이런 식으로 함수를 사용해 데이터를 변경하면 코드가 덜 명령형이 되고 그에 따라 복잡도도 감소한다. 함수형 자바스크립트를 유창하게 사용하기 위해 통달해야 하는 핵심 함수가 2개 있다. **Array.map과 Array.reduce**가 바로 그것이다.

```javascript
const schools = [
  "Yorktown",
  "Washington & Lee",
  "Wakefield"
]

console.log( schools.join(", "))
```

**`Array.join`** 함수를 사용하면 콤마(,)로 각 학교를 구분할 문자열을 얻을 수 있다. join은 자바스크립트 내장 배열 메서드이다. 프로그래머가 join이 제공하는 추상화를 사용하면 문자열을 실제로 어떻게 만드는지 신경 쓰지 않아도 된다.

```javascript
const wSchools = schools.filter(school => school[0] === "W")

console.log( wSchools )

// ["Washington & Lee", "Wakefield"]
```

**`Array.filter`**는 원본 배열로부터 새로운 배열을 만들어내는 자바스크립트 배열 내장 함수다. 이 함수는 술어를 유일한 인자로 받는다 술어는 불린 값, 즉 true나 false를 반환하는 함수를 뜻한다.

배열에서 원소를 제거해야 한다면 Array.pop이나 Array.slice보다는 **`Array.filter`**를 사용하라. **`Array.filter`**는 순수 함수다.

```javascript
const cutSchool = (cur, list) =>
  list.filter(school => school !== cut)

console.log(cutSchool("Washington & Lee", schools).join(" * "))

// Yorktown * Wakefield

console.log(schools.join("\n"))
// YorkTown
// Washington & Lee
// Wakefield
```

**`Array.map`**은 술어가 아니라 변환 함수를 인자로 받는다. **`Array.map`**은 그 함수를 배열의 모든 원소에 적용해서 반환받은 값으로 이루어진 새 배열을 반환한다.

```javascript
const highSchools = schools.map(school => `${school} High School`)

console.log(highSchools.join("\n"))

// Yorktown High SChool
// Washington & Lee High School
// Wakefield High School

console.log(schools.join("\n"))

// Yorktown
// washington & Lee
// Wakefield
```

이 경우 **`map`** 함수는 각 학교 뒤에 'High School'을 추가한다. 이때 원본 schools 배열은 아무 변화가 없다. 이 예제에서는 문자열의 배열에서 문자열의 배열을 만들었다. **`map`** 함수는 객체, 값, 배열, 다른 함수 등 모든 자바스크립트 타입의 값으로 이루어진 배열을 만들 수 있다.

```javascript
const highSchools = schools.map(school => ({ name: school }))

console.log( highSchools )
// [
// { name : "YorkTown" }
// { name : "Washington & Lee" }
// { name : "Wakefield" }
// ]
```

원본 schools 배열을 변경하지 않으면 'Startford'라는 학교 이름을 'HB Woodlawn'으로 바꾼다.

```javascript
let schools = [
  { name : "YorkTown" }
  { name : "Startford" }
  { name : "Washington & Lee" }
  { name : "Wakefield" }
]

let updateSchools = editName("Startford", "HB Woodlawn", schools)

console.log( updateSchools[1] ) // { name: "HB Woodlawn" }
console.log( schools[1] ) // { name: "Startford" }
```

editName 함수는 원본 배열은 그대로 둔 채 학교 이름이 바뀐 새 배열을 반환한다.

```javascript
const editName = (oldName, name, arr) => 
  arr.map(item => {
    if(item.name === oldName) {
      return {
        ...item,
        name
      }
    } else {
      return item
    }
  })
```

editName 함수를 한 줄로 쓸 수도 있다. if/else 문 대신 3항 연산자(? :)를 사용해 짧게 쓸 수 있다.

```javascript
const editName = (oldName, name, arr) =>
  arr.map(item => (item.name === oldName) ?
    ({...item, name}) :
    item
  )
```

방금 본 예제에서는 **`Array.map`**에 전달한 변환 함수의 파라미터가 1개뿐이었다. 하지만 실제로 **`Array.map`**은 각 원소의 인덱스를 변환 함수의 두 번째 인자로 넘겨준다.

```javascript
const editNth = (n, name, arr) =>
  arr.map( (item, i) => (i === n) ?
    ({...item, name}) :
    item
  )

let updateSchools2 = editNth(2, "Mansfield", schools)

console.log( updateSchools2[2] )  // { name: "Mansfield" }
console.log( schools[2] ) // { name: "Washington & Lee" }
```

객체를 배열로 변환하고 싶을 때는 **`Array.map`**과 **`Object.keys`**를 함께 사용하면 된다. **`Object.keys`**는 어떤 객체의 키로 이루어진 배열을 반환하는 메서드다.

```javascript
const schools = {
  "Yorktown": 10,
  "Wahsington & Lee": 2,
  "Wakefield": 5
}

const schoolArray = Object.keys(schools).map(key => 
  ({
    name: key,
    wins: schools[key]
  })
)

console.log(schoolArray)
// [ { name: 'Yorktown', wins: 10 },
//   { name: 'Washington & Lee', wins: 2 },
//   { name: 'Wakefield', wins: 5 } ]
```

**`reduce`**와 **`reduceRight`** 함수를 사용하면 객체를 수, 문자열, 불린 값, 객체, 심지어 함수로 변환할 수 있다. **`reduce`** 함수는 변환 함수와 초깃값을 인자로 받는다.

```javascript
const ages = [21, 18, 42, 40, 64, 63, 34]

const maxAge = ages.reduce((max, age) => {
  console.log(`${age} > ${max} = ${age > max}`)
  if(age > max) {
    return age
  } else {
    return max
  }
}, 0)

console.log('maxAge', maxAge)

// 21 > 0 = true
// 17 > 21 = false
// 42 > 21 = true
// 40 > 42 = false
// 64 > 42 = true
// 63 > 64 = false
// 34 > 64 = false
// maxAge 64
```

위 함수에서 console.log를 제거하고 if/else를 짧게 변경하면 다음 코드를 사용해 배열의 최댓값을 계산할 수 있다.

```javascript
const max = ages.reduce(
  (max, value) => (value > max) ? value : max,
  0
)
```

가끔 배열을 객체로 변환해야 할 때가 있다.

```javascript
const colors = [
  {
    id: '-xekare',
    title: "과격한 빨강",
    ratin: 3
  },
  {
    id: '-jbwsof',
    title: "큰 파랑",
    rating: 2
  },
  {
    id: '-prigbj',
    title: "회색곰 회색",
    rating: 5
  },
  {
    id: '-ryhbhsl',
    title: "바나나",
    rating: 1
  }
]

const hashColors = colors.reduce(
  (hash, {id, title, rating}) => {
    hash[id] = {title, rating}
    return hash
  },
  {}
)

console.log(hashColors)

//{ '-xekare': { title: '과격한 빨강', rating: 3 },
//  '-jbwsof': { title: '큰 파랑', rating: 2 },
//  '-prigbj': { title: '회색곰 회색', rating: 5 },
//  '-ryhbsl': { title: '바나나', rating: 1 } }
```

각 이터레이션마다 변환 함수는 대괄호 [] 연산을 사용해 해시에 새로운 키를 추가한다. 심지어 **`reduce`**를 사용해 배열을 전혀 다른 배열로 만들 수도 있다.

```javascript
const colors = ["red", "red", "green", "blue", "green"];

const distinctColors = colors.reduce(
  (distinct, color) =>
    (distinct.indexOf(color) !== -1) ? 
      distinct :
      [...distinct, color],
  []
)
```

**`reduce`** 함수에 전달한 두 번째 인자는 빈 배열이다. 이 배열은 distinct의 초깃값이다. distinct 배열에 어떤 색이 들어 있지 않다면 그 색을 추가하며 그 색이 이미 들어 있다면 아무 일도 하지 않고 다음으로 넘어가기 위해 현재의 distinct를 그대로 반환한다.

## 1.3.4 고차 함수

함수형 프로그래밍에서는 고차 함수가 꼭 필요하다. 고차 함수의 첫 번째 분류는 다른 함수를 인자로 받는 함수다. **`Array.map, Array.filter, Array.reduce`**는 다른 함수를 인자로 받는다. 다른 함수를 반환하는 고차 함수는 자바스크립트에서 비동기적인 실행 맥락을 처리할 때 유용하다. 함수를 반환하는 고차 함수를 이용하면 필요할 때 재활용할 수 있는 함수를 만들 수 있다. **`커링`**은 고차 함수 사용법과 관련한 함수형 프로그래밍 기법이다. **`커링`**은 어떤 연산을 수행할 때 필요한 값 중 일부를 저장하고 나중에 나머지 값을 전달받는 기법이다.

```javascript
const userLogs = userName => message =>
  console.log(`${userName} -> ${message}`)

const log = userLogs("grandpa23")

log("attempted to load 20 fake members")
getFakeMembers(20).then(
  members => log(`successfully loaded ${members.length} members`),
  error => log("encountered an error loading members")
)

// gradpa23 -> attempted to load 20 fake members
// grandpa23 -> successfully loaded 20 members

// grandpa23 -> attempted to load 20 fake members
// grandpa23 -> encountered an error loading members
```

userLogs는 고차 함수다. userLogs를 호출해서 만들어지는 log 함수를 호출할 때마다 메시지 맨 앞에'grandpa23'이 덧붙여진다.
