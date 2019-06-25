## Prompt Persist

Simple prompt value persistence decorator

#### Usage

```javascript
import prompt from "prompt";
import persist from "prompt-persist";
import Store from "data-store";

const store = new Store({ path: "config.json" });
persist(store, prompt);

const schema = {
    properties: {
        user: {
            required: true,
            persisted: true,
        }
    }
};

prompt.start();
prompt.get(schema, (err, data) => {
    if (err) return console.error(err);
    console.log(data);
});
```
