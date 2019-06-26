const persist = require('../src/index.js')

const assert = require('assert')
const stdin = require('mock-stdin').stdin()
const prompt = require('prompt')

const DataStore = function() {
  let buffer = {}
  let store = {}

  return {
    hasOwn(prop) {
      assert.equal(typeof prop, 'string', 'expected prop to be a string');
      return store[prop] !== undefined
    },
    get(prop) {
      return store[prop]
    },
    set(prop, value) {
      buffer[prop] = value
    },
    save() {
      store = { ...store, ...buffer }
      buffer = {}
    }
  }
}

describe('persist', () => {
  it('mutates prompt to persist the input to the given data store, only if the property is set as persisted', () => {
    const store = DataStore()
    const schema = {
      properties: {
        persistedInput: {
          required: true,
          persisted: true
        },
        notPersistedInput: {
          required: true
        }
      }
    }
    persist(store, prompt)

    return (new Promise((resolve) => {
      prompt.start()
      prompt.get(schema, resolve)

      stdin.send('persisted value\n', 'utf-8')
      stdin.send('not persisted value\n', 'utf-8')
    })).then(() => {
      expect(store.get('persistedInput')).toEqual('persisted value')
      expect(store.get('notPersistedInput')).toBe(undefined)
    })
  })
})
