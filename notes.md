## JSX vs html

* JSX translates to `React.createElement` calls with babel.js
* JSX `className` instead class, because `class` is reserved in JS
* JSX {/* comment */} instead <!-- comment -->

````js
const Greeting = () => (
        <div>
          <Banner/>
          <h2 className="highlight"> Greetings!</h2>
        </div>
);
````

## Tooling

* NextJS or CreateReactApp as CLI
* For NextJS:
  * root component _app.js and index.js start page

## Styling in NextJS
* 4 global styling create a _document.js file, because NextJS has no index.html for style links
* Component styles, see components/banner.module.css
  * import {logo} from "./banner.module.css"
  * use className={logo} in JSX
* Inline
  * style={{color: red}} where inner braces are an object 

## Props
* All input props given from parent component go into props object param
```jsx
<HouseRow house={h} />
```
```jsx
const HouseRow = ({ house }) => (
        <div> {house.address} <div>
          );
```

### Props inside map function
Need to provide a key prop for tracking:
```jsx
  {houses.map((h) => (
        /* key property for tracking - needed for components in map fn */
        <HouseRow key={h.id} house={h} />
))}
```

## Hooks and State
* In general React lifecyle hooks or custom hooks

### useState Hook for change detection
```jsx
const houseArray = [
  {
    id: 1,
    address: "12 Valley of Kings, Geneva",
    country: "Switzerland",
    price: 900000,
  },
        ...
];

const HouseList = () => {
  const [houses, setHouses] = useState(houseArray);
  ...
```
* setHouses should always be used to change houses
* Always call useState hook at the start of the component function.
* Always provide _new_ array in `setHouses`
* Components can change their state, but not props they receive. (no double data binding)
  * Only 1 way data binding

```js
const addHouse = () => {
    setHouses([
      ...houses,
      {
        id: 3,
        address: "32 Valley Way, New York",
        country: "USA",
        price: 1000000,
      },
    ]);
  };
```

### useEffect hook for fetching data initially and adding or removing event listeners

Provide empty deps array as 2nd parameter to only fetch initially and not on every change.
```js

// Component function and useEffect are run initially AND on every state change
useEffect(() => {
  const fetchHouses = async () => {
    const response = await api.getHouses();
    setHouses(response.json);
  };

  fetchHouses(); // Cannot make async calls directly in useEffect

  window.addEventListener('unhandledRejection', handler);

  return () => { // function returned is called on destruction
    window.removeEventListener('unhandledRejection', handler);
  };
}, []); // Only fetch initially, by providing empty deps []
```

### useRef hook as element reference

```js

const incBtnRef = useRef(null);

return (
        <> {/* empty container */}
         ...
          <button className="btn" ref={incBtnRef} onClick={increment}>
            Increment
          </button>
        </>
);
```
