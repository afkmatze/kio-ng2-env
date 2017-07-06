#!/usr/bin/env node

const path = require('path')
const { env } = require('../')

env().toPromise()
  .then ( store => {
    console.log('store data', store.data)
    store.data.build = (store.data.build || 0) + 1
    return store.save() 
  } )
  .catch ( console.error )
