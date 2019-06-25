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

#### Storage interface

The `prompt-persist` decorator utilizes a `data-store` interface. An example of custom store follows.

```typescript
interface Store {
    /**
     * Verifies if store has property.
     * 
     * @param prop The property name
     * @returns True if store has property
     **/
    hasOwn(prop: string): boolean;

    /**
     * Gets a property.
     * 
     * @param prop The property name
     * @returns The property value
     **/
    get(prop: string): string;

    /**
     * Sets a property.
     * 
     * @param prop The property name
     * @param prop The property value
     **/
    set(prop: string, value: string): void;

    /**
     * Saves the current state.
     **/
    save(): void;
}
```
