'use strict'
// This is one of the two example TypeScript files included with the NodeBB repository
// It is meant to serve as an example to assist you with your HW1 translation
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt (value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected (value) { try { step(generator.throw(value)) } catch (e) { reject(e) } }
    function step (result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
// eslint-disable-next-line
exports.setActivePostSharingNetworks = exports.getActivePostSharing = exports.getPostSharing = undefined
// eslint-disable-next-line
const lodash1 = __importDefault(require('lodash'))
// eslint-disable-next-line
const plugins1 = __importDefault(require('./plugins'))
// eslint-disable-next-line
const database1 = __importDefault(require('./database'))
let postSharing = null
function getPostSharing () {
  // eslint-disable-next-line
  return __awaiter(this, undefined, undefined, function * () {
    if (postSharing) {
      // eslint-disable-next-line
      return lodash1.default.cloneDeep(postSharing)
    }
    let networks = [
      {
        id: 'facebook',
        name: 'Facebook',
        class: 'fa-facebook',
        activated: null
      },
      {
        id: 'twitter',
        name: 'Twitter',
        class: 'fa-twitter',
        activated: null
      }
    ]
    // eslint-disable-next-line
    networks = (yield plugins1.default.hooks.fire('filter:social.posts', networks))
    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line
    const activated = yield database1.default.getSetMembers('social:posts.activated') //eslint-disable-line
    networks.forEach((network) => {
      network.activated = activated.includes(network.id)
    })
    postSharing = networks
    // eslint-disable-next-line
    return lodash1.default.cloneDeep(networks)
  })
}
exports.getPostSharing = getPostSharing
function getActivePostSharing () {
  // eslint-disable-next-line
  return __awaiter(this, undefined, undefined, function * () {
    const networks = yield getPostSharing()
    return networks.filter(network => network && network.activated)
  })
}
exports.getActivePostSharing = getActivePostSharing
function setActivePostSharingNetworks (networkIDs) {
  // eslint-disable-next-line
  return __awaiter(this, undefined, undefined, function * () { //eslint-disable-line
    postSharing = null
    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line
    yield database1.default.delete('social:posts.activated') //eslint-disable-line
    if (!networkIDs.length) {
      return
    }
    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line
    yield database1.default.setAdd('social:posts.activated', networkIDs) //eslint-disable-line
  })
}
exports.setActivePostSharingNetworks = setActivePostSharingNetworks
