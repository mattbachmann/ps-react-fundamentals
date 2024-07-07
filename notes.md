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

## Hooks
* React lifecyle hooks or custom hooks