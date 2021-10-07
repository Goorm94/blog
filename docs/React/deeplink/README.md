# React 역사


- Single Page Application 유행

![image-20210525102012057](C:\Users\woonkyoung_ham1\AppData\Roaming\Typora\typora-user-images\image-20210525102012057.png)



#### 장점

- 페이지를 이동 하더라도 필요한 부분 (컴포넌트)만 부분적으로 교체하면 되므로 효율성이 증가합니다.
- 서버가 해야 할 화면 구성을 클라이언트가 수행하므로 서버 부담이 경감됩니다.
- 모듈화 또는 컴포넌트별 개발이 용이합니다.
- 백엔드와 프론트엔드가 비교적 명확하게 구분됩니다



- SPA 는 기본적으로 작은 컨테이너들이 모여 거대한 앱을 구성하는데, 앱이 점점 커지고 사용자가 늘어 날수록 데이터의 흐름을 알기 어려워 디버깅이 어려워지는 문제가 야기 돼서 페이스북에서 React 를 발표.



## 리액트의 핵심 개념



#### 1) Component 기반의 UI

![image-20210525112319592](C:\Users\woonkyoung_ham1\AppData\Roaming\Typora\typora-user-images\image-20210525112319592.png)

- 디자인 일관성
- 재사용성



#### 2) JSX

- React를 위해 태어난 새로운 자바스크립트 문법으로 Html 과 Javascript 결합

  ```react
  // ① 화면에 보여지길 원하는 state를
  const [editRowsModel, setEditRowsModel] = useState({});
  const [editColor, setEditColor] = useState(new Map());
  
  // ② 자바스크립트 함수를 이용해서 component로 구성한다!
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  
  // ③ 또는 이렇게 class로 만들 수도 있다.
  class Welcome extends React.Components {
    render() {
    	return <h1>Hello, {props.name}</h1>;
    }
  }
  ```

- JSX 문법으로 자체적인 Virtual DOM 구성



#### 3) Virtual DOM

- 기존의 DOM 조작

    - 변경되어야 하는 요소를 페이지에 다시 칠하는 과정

    - 모든 요소들을 다시 레이아웃을 계산하여 화면에 위치시키는 작업



    ![image-20210525125313462](C:\Users\woonkyoung_ham1\AppData\Roaming\Typora\typora-user-images\image-20210525125313462.png)



> **웹 페이지가 렌더링 되는 과정**
> \1. HTML parser가 HTML을 바탕으로 DOM tree를 그린다.
> \2. CSS parser가 CSS를 바탕으로 CSSOM을 그린다.
> \3. DOM에 CSSOM을 적용하여 Render Tree를 그린다.
> \4. Render Tree를 바탕으로 Painting 하여 실제 화면에 렌더링 한다.
> *HTML 코드를 읽어 내려가다가 `<script></script>` 태그를 만나면 파싱을 잠시 중단하고 js 파일을 로드한다.

**Render**는 "화면에 표시한다" 라는 뜻을 가지고 있습니다. **Painting**은 말 그대로 "화면에 그린다" 라는 뜻이구요. 하지만 DOM과 CSSOM은 잘 모르겠습니다.

### DOM과 CSSOM

> **DOM(Document Object Model)**은 HTML 요소들의 구조화된 표현으로, 객체에 해당합니다.

텍스트인 HTML을 `DOM` 이라는 트리구조의 객체로 변환시켜서 이를 읽는 **브라우저와 Javascript**가 이해할 수 있는 구조로 **HTML 파서**가 `DOM`으로 바꿔주는 것 입니다



```
<!doctype html>
<html land="ko">
  <head>
    <title>My first web page</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <p style="display: none;">How are you?</p>
  </body>
</html>

html
ㄴhead
  ㄴtitle
    ㄴMy first web page
body
ㄴh1
  ㄴHello, world!
```

DOM은 "How are you?" 도 같이 포함되어야 합니다. 하지만, CSS에 포함된 `display: none` 때문에 CSSOM 에서는 포함되지 않은 것 입니다.

> **CSSOM**은 DOM에 CSS가 적용된 객체 모델 입니다.

### 웹을 동적으로 제어한다 = DOM을 제어한다

이제 우리가 웹을 개발한다는 것은 정적인 HTML만을 작성하는 게 아니라, Javascript를 통해 동적으로 동작할 수 있는 웹을 개발하는 것 입니다.

그럼 DOM을 동적으로 제어(조작)해야 하는데, 이를 Javascript가 해 줄수 있도록 `DOM API` 라는 것이 기본적으로 제공됩니다.



### React에서의 Virtual DOM

자, 이제 이번 포스팅의 마지막 입니다.
React에는 `state` 와 `props` 라는 개념이 있습니다. 쉽게 생각하면, 화면에서 변하는 값을 의미합니다.

> **React는 다음과 같은 경우에 리렌더링이 일어납니다.**
> \1. Props가 변경되었을 때
> \2. State가 변경되었을 때
> \3. forceUpdate() 를 실행하였을 때.
> \4. 부모 컴포넌트가 렌더링되었을 때



#### 4) 단방향의 데이터 흐름

- State => Component => Virtual DOM => 실제 DOM과 비교 => 화면에 그리기(렌더링)
- Component 구조도 상단에서 하단으로 데이터가 흐르기 떄문에 디버깅에 용이

![image-20210525114103554](C:\Users\woonkyoung_ham1\AppData\Roaming\Typora\typora-user-images\image-20210525114103554.png)





## 훌륭한 리액트 개발

#### 1) 컴포넌트 설계

- 컴포넌트를 얼마나 작은 단위로 쪼개서, 재사용 가능한 컴포넌트를 설계할지 여부



#### 2) State(데이터) 가 존재하는 위치에 대한 결정

- 불필요한 데이터의 이동을 줄이고, 단방향 데이터 흐름을 지킬수 있는지



#### 3) State가 변경될때, Re - Rendering (화면의 변화)를 최적화 하는 것

- 어떤 부분을 re-rendering 할지 알고, 시간을 단축시켜 개발하기







참고자료

https://velog.io/@thms200/SPA-vs.-MPA

https://soldonii.tistory.com/100

https://velog.io/@juno7803/React%EA%B0%80-%ED%83%9C%EC%96%B4%EB%82%9C-%EB%B0%B0%EA%B2%BD

