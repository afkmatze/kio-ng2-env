#!/usr/bin/env node

const path = require('path')
const { createStore } = require('../node')
const store = createStore()

store.load()
  .then ( store => {
    console.log('store data', store.data)
    store.data.build = (store.data.build || 0) + 1
    return store.save() 
  } )
  .catch ( console.error )
