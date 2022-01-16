import { useEffect, useRef, useState } from 'react';

// useInput
const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = event => {
    const {
      target: { value }
    } = event;
    let willUpdate = true;

    // 유효성 검사
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  }
  return { value, onChange };
}

// useTabs
const content = [
  {
    tab: "Section 1",
    content: "I'm the content of the Section 1"
  },
  {
    tab: "Section 2",
    content: "I'm the content of the Section 2"
  },
]

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);

  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex
  }
}

// useTitle
const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  }
  useEffect(updateTitle, [title]);
  return setTitle;
}

// useClick
const useClick = (onClick) => {
  const element = useRef();

  useEffect(() => {
    if (typeof onClick !== "function") {
      return;
    }
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    }
  }, [])
  return element;
}

const App = () => {
  // useState
  const [item, setItem] = useState(1);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  // useInput
  // const maxLen = value => value.length <= 10;
  const maxLen = value => !value.includes("@");
  const name = useInput("Mr.", maxLen);

  // useTabs
  const { currentItem, changeItem } = useTabs(0, content);

  // useEffect (ComponentDidMount, ComponentWillUnMount, ComponentDidUpdate)
  const [aNumber, setANumber] = useState(0);
  const [bNumber, setBNumber] = useState(0);
  const sayHello = () => alert("Hello");

  // 첫 번째 인자는 effect로서 정리 함수를 반환할 수 있는 명령형 함수, 두 번째 인자는 deps로서 해당 dependency 리스트에 값이 있을 때에만 활성화
  // 두 번째 인자를 비울 시, 모든 dependency 리스트의 값이 변할 때마다 활성화
  // 두 번째 인자를 빈 배열로 설정 시, 페이지가 렌더링 될 때 한 번만 실행
  useEffect(sayHello, [aNumber]);

  // useTitle
  const titleUpdater = useTitle("Loading...");
  setTimeout(() => titleUpdater("Home"), 5000);

  // useClick
  const sayHi = "123";
  const title = useClick(sayHi);

  return (
    <div className="App">
      <h1>실전형 React Hooks 10가지</h1>
      <hr />

      <div>
        <h2>useState</h2>
        <h3>{item}</h3>
        <button onClick={incrementItem}>increment</button>
        <button onClick={decrementItem}>decrement</button>
      </div>
      <hr />

      <div>
        <h2>useInput</h2>
        {/* <h3><input placeholder="Name" value={name.value} onChange={name.onChange} /></h3> */}
        <h3><input placeholder="Name" {...name} /></h3>
      </div>
      <hr />

      <div>
        <h2>useTabs</h2>
        {content.map((value, index) => (
          <button key={index} onClick={() => changeItem(index)}>{value.tab}</button>
        ))}
        <div>
          {currentItem.content}
        </div>
      </div>
      <hr />

      <div>
        <h2>useEffect</h2>
        <button onClick={() => setANumber(aNumber + 1)}>{aNumber}</button>
        <button onClick={() => setBNumber(bNumber + 1)}>{bNumber}</button>
      </div>
      <hr />

      <div>
        <h2>useTitle</h2>
        <h3>title을 loading...으로 변경하고 5초 뒤 Home로 변경</h3>
      </div>
      <hr />

      <div>
        <h2>useClick</h2>
        <h3 ref={title}>Hi</h3>
      </div>
    </div>
  );
}

export default App;
