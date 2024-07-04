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