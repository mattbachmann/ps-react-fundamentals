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