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

For state updates in child components pass `setSelectedHouse` function to a child using a wrapper function:

```jsx
const App = () => {
  const [selectedHouse, setSelectedHouse] = useState();

  const setSelectedHouseWrapper = (house) => {
    //do checks on
    setSelectedHouse(house);
  };

  return (
          <>
            <Banner>
              <div>Providing houses all over the world</div>
            </Banner>
            {selectedHouse ? (
                    <House house={selectedHouse} />
            ) : (
                    <HouseList selectHouse={setSelectedHouseWrapper} />
            )}
          </>
  );
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

### Custom hook for api calls and loadingState

In general custom hooks start with `use` and are defined in their own file like here `useGetRequest.js`.

```jsx
import { useCallback, useState } from "react";

const loadingStatus = {
  loaded: "loaded",
  isLoading: "Loading...",
  hasErrored: "An error occured while loading",
};

const useGetRequest = (url) => {
  const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

  const get = useCallback(async () => { // useCallback to avoid an infinite loop
    setLoadingState(loadingStatus.isLoading);
    try {
      const rsp = await fetch(url);
      const result = await rsp.json();
      setLoadingState(loadingStatus.loaded);
      return result;
    } catch {
      setLoadingState(loadingStatus.hasErrored);
    }
  }, [url]);
  return { get, loadingState };
};

export default useGetRequest;
```

Every usage of a custom hook creates an isolated instance. When using `useGetRequest` the `get` method must be put into the deps array.
Therefore `useGetRequest` has the useCallback hook in it, to avoid an endless fetching loop.

```jsx
const [houses, setHouses] = useState([]);
const { get, loadingState } = useGetRequest("/api/houses");

useEffect(() => {
  const fetchHouses = async () => {
    const houses = await get();
    setHouses(houses);
  };
  fetchHouses();
}, [get]); // dependent on get
```

## Conditional rendering

JS logic evaluated for className:

```jsx
<div className={`${house.price >= 500000 ? "text-primary" : ""}`}>
```

Only render an element if house.price is truthy:

```jsx
return (
        <tr onClick={() => selectHouse(house)}>
          <td>{house.address}</td>
          
          {house.price && (
                  <td >
                    {currencyFormatter.format(house.price)}
                  </td>
          )}
          
        </tr>
);
```

## React.Context

Avoid having to pass state down to children. Also could use context to build your own router.

````jsx
const navValues = {
  home: "Home",
  house: "House",
};

const navigationContext = React.createContext(navValues.home);

const App = () => {
    
    // setNav wrapper with useCallback
  const navigate = useCallback(
    (navTo, param) => setNav({ current: navTo, param, navigate }),
    []
  );
  
  // nav state of application
  const [nav, setNav] = useState({ current: navValues.home, navigate });
  
  return (
    <navigationContext.Provider value={nav}>
    <Banner>
    <div>Providing houses all over the world</div>
    </Banner>
      
      {/* see implementation below */}
    <ComponentPicker currentNavLocation={nav.current} />
      
    </navigationContext.Provider>
  );
};

export { navigationContext, navValues };
export default App;
````

The logic to switch the component based on nav state:

````jsx
const ComponentPicker = ({ currentNavLocation }) => {
  switch (currentNavLocation) {
    case navValues.home:
      return <HouseList />;
    case navValues.house:
      return <House />;
    default:
      return (
              <h3>
                No component for navigation value
                {currentNavLocation} found
              </h3>
      );
  }
};

export default ComponentPicker;
````

How context is consumed:

````jsx
const HouseRow = ({ house }) => {
    
  const { navigate } = useContext(navigationContext); // useContext hook to get navigate function
  
  return (
          <tr onClick={() => navigate(navValues.house, house)}> {/* call navigate function */}
            <td>{house.address}</td>
            <td>{house.country}</td>
            {house.price && (
                    <td className={`${house.price >= 500000 ? "text-primary" : ""}`}>
                      {currencyFormatter.format(house.price)}
                    </td>
            )}
          </tr>
  );
};
````

But in reality better use a real router (either React router or next.js router depending on framework).

## Forms

`useState` hook and `onChange` handler on an input element.

````jsx
const Bids = ({ house }) => {
    const { bids, loadingState, addBid } = useBids(house.id);

    const emptyBid = {
        houseId: house.id,
        bidder: "",
        amount: 0,
    };

    const [newBid, setNewBid] = useState(emptyBid); // initial state

    if (loadingState !== loadingStatus.loaded)
        return <LoadingIndicator loadingState={loadingState} />;

    const onBidSubmitClick = () => {
        addBid(newBid);
        setNewBid(emptyBid);
    };

    return (
        <>
            <div className="row">
                <div className="col-5">
                    <input
                        id="bidder"
                        className="h-100"
                        type="text"
                        value={newBid.bidder}
                        onChange={(e) => setNewBid({ ...newBid, bidder: e.target.value })} {/* provide new object to set state */}
                        placeholder="Bidder"
                    ></input>
                </div>
                <div className="col-2">
                    <button className="btn btn-primary" onClick={onBidSubmitClick}>
                        Add
                    </button>
                </div>
            </div>
        </>
    );
};
````