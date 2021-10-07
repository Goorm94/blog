# NullPointException 원인, 예방 , 해결하기

회사 업무 중 관리자 페이지를 개선하는 업무를 하던 중 오류가 나오게 되었습니다.



저희는 WebFlux 기반의 서버를 구축하고 있는 상황입니다. 클라이언트 측으로 부터 데이터를 받아 정재하는 과정에서 이러한 NullPointException인 NPE 가 자주 발생하곤 하였습니다.



- NullPointException의 문제는 디버깅이 어렵기 때문에 초기 설계에서부터 이러한 NullPoint를 예방할 수 있는 기반의 코드를 만들어 나가는  것이 중요합니다.



> **예방 및 해결 방법**



1. null Parameter를 넘기지 말 것.

    - default 변수를 선언 해주어, 불필요한 null 체크를 없애자

2. null 여부 비교 처리 추가

    - default 변수를 선언하지 않았을 경우, null 여부를 체크하는 로직을 추가하자.

    - 문자열 비교시 equals 메서드를 사용하도록 하자 ( String은 자바에서 기본형이 아니기 떄문에 )
        - 또한, equals 메서드 사용시 non-null String을 기준으로 비교할 필요가 있다. 혹은 Constants를 활용해보자

3. toString 대신 valueOf 메소드를 활용하자

    - toString은 Null 을 거르지 못한다.

4. 메소드 체이닝 (Method Chaining) 패턴 호출 자제하기

    - 메소드 체이닝
        - Object.Method().Method().Method();
    - 메소드 체이닝의 경우 디버깅이 어려운 문제가 있기 때문에 코드량은 줄일 수 있지만, 확실히 설계를 하는것이 중요하다.

5. Spring을 사용하고 있다면 @NotNull 사용해보자.

    - Null을 넘기지 않는 것이 중요하지만 Domain( DTO, model ) 에 @ NotNull 어노테이션을 지정해보자.
    - NotNull을 베이스로 코딩할 경우 통일적으로 빈값인지만 확인하면 되기때문에 코드의 품질을 향상 시켜 줄 것이다.

6. 자바 8 이상을 지원하는 경우 ( Spring 3.2 / 4.3 이상 )

    - Optional 을 활용 하자

        - Optional 이란 어떤 오브젝트의 Wrapper 오브젝트라고 생각하면 이해하기 쉽다.

      #### Optional.empty()

      ```java
          Optional<Person> oP = Optional.empty();
      
      if(oP.isPresent()){
          Person p = oP.get();
          System.out.println("p exists " + p.name);
      }
      
      
      ```

      위의 예제는 빈 Optional 클래스를 리턴한다. null을 할당하는 것과 비슷한 느낌이지만 다른 점은 Optional이라는 오브젝트가 생성되고 그 안의 Person이 null 이라는 것이다.  ( 단순히 모든 값이 null 일경우 레퍼런스 자체가 생성되지 않는다. ) 그렇기 때문에, isPresent() 라는 널값을 확인해 내부에 감싸진 오브젝트가 null 이면 false 반대면 true를 리턴하는 메소드를 사용 할 수 있다.

      #### Optional.of()

      조금 더 실무적으로 Optional을 활용해 보자.

      ```java
      public static void maion(final String[] args){
          Optional<Person> oP = Optional.of(new Person("값 할당",1));
      }
      ```

      ####  Optional.ofNullable()

      Optional.of는 내부 오브젝트가 null일 때 사용 할 수 없습니다. 내부에 들어가는 오브젝트의 null 여부가 확실치 않은 경우에는     Optional.ofNullable을 사용해 봅시다.

      ```java
      static List<Person> persons = new ArrayList<>();
      
      Optional<Person> Op = Optional.ofNullable(search(name)); // 핵심
      if(oP.isPresent()){
          Person p = oP.get();
          System.out.println("p exists" + p.name + " " + p.age);
      }
      
      public static Person serach(final String name){
          for(Person p : persons){
              if(p.name.equalsIgnoreCase(name)){
                  return p;
              }
          }
          return null;
      }
      
      ```

      Search는 같은 이름이 있는 경우를 찾는 메소드 지만, null값을 포함할 수 있기 때문에 이와 같이 ofNullable를 사용하도록 **합니다**

      #### orElse()

      search 메서드를 이용해 검색을 했는데 null 일 경우 새로운 오브젝트를 만들고 싶다고 가정해보자. 그럴때는 orElse를 사용 할 수 있습니다.

      ```java
      public static void main(final String [] args){
          String name = "hamjjang";
          Person p = Optional.ofNullable(serach(name)).orElse(new Person(name, 18));
          System.out.println(" p exists " + p.name+ " " + p.age);
      }
      ```

        -  Optional<Person>  대신 Person을 사용 할 수 있게 되었다. 뒤의 Optional.ofNullable 부분이 Person을 반드시 리턴하기 대문임. 내부의 오브젝트가 존재하면 그 오브젝트를 리턴하면 그게 아니라면 orElse에서 새로운 오브젝트를 만들어 리턴하기 떄문이다. 원래라면 null이라면 null을 리턴한다.
        -  Optional<Person>이 사라졌고 p는 반드시 nuill이 아니기 때문에 isPresent 나 null체크를 할 필요가 없어졌다.

      #### OrElseGet()

      orElse가 아니라 orElseGet을 사용하는 방법도 있다. 예를들어 new Person을 만드는 곳이 다른 메서드에 있다고 해보자.

      ```java
      public static void main(final String[] args){
          String name = "hamjjang";
          Person p = Optional.ofNullable(serach(name)).orElseGet(()-> createPerson(name, 17))
          
      }
      ```

      람다 함수 ( lambda function ) Supplier를 인풋으로 받는다.

      #### orElse vs orElseGet

      ```java
      public static void main(final String[] args){
          String name = "orElseGet";
          Person person = new Person(name, 17);
          Person p = Optional.ofNullable(person).orElseGet(() -> createPerson(name, 17));
          System.out.println("p exists " + p.name+ " " + p.age);
      }
      
      public static Person createPerson(final String name, final int age){
          System.out.println("CreatePerson 메서드 안");
          return new Person(name, age);
      }
      ```

      orElseGet을 사용할 경우 에로우 펑션을 사용하기 때문에 객체가 생성되지 않는다.

      ```java
      public static void main(final String[] args){
          String name = "orELse";
          Person person = new Person(name, 19);
          Person p = Optional.ofNullable(person).orElse(createPerson(name,18));
          System.out.println("p exists " + p.name + " " + p.age);
      }
      public static Person createPerson(final String name, final int age){
          System.out.println("메소드 생성");
          return new Person(name, age);
      }
      ```

      orElse의 경우 메소드를 따로 지정했기 때문에 null 여부에 관계없이 실행 되어 진다.

      #### orElseThrow()

      null을 절대 허용하지 않을 경우 null이 넘어오는 경우 예외를 발생시킬 수 있다.

      ```java
      public static void main(final String [] args){
          Person person = null;
          Person p = Optional.ofNullable(person).orElseThrow(()->new RuntimeException());
          System.out.println("p exists " + p.name + " " + p.age);
      }
      
      public void doSomethingOnPerson(final Person p){
          Person person = Optional.ofNullable(p).orElseThrow(IllegalArgumentException::new);
          String name = Optional.ofNullable(person.name).orElseThrow(IllegalArgumentException::new);
      }
      ```

     

