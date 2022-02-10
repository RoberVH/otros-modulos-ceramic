/**Conexion para SelfID */
import { EthereumAuthProvider, SelfID, WebClient } from '@self.id/web'
/**Conexion para Core */
import { Core } from '@self.id/core'
import { ThreeIdConnect } from '@3id/connect'
import Ceramic from '@ceramicnetwork/core'
// npm install @3id/connect
//  npm install @ceramicnetwork/core

// necesarias para modulo Ceramic
import {Ipfs} from 'ipfs-core'
import dagJose from 'dag-jose'
import { convert } from 'blockcodec-to-ipld-format'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { DID } from 'dids'
//npm i ipfs-core
//npm i dag-jose
//npm i blockcodec-to-ipld-format
// npm i key-did-resolver
// npm i @ceramicnetwork/3id-did-resolver
// npm i dids

const dagJoseFormat = convert(dagJose)

/**Codigo para SelfId ************************************************************************* */

export let addresses

export let authProvider;
export let self;

export const initialize = async () => {
    addresses = await  window.ethereum.request({ method: 'eth_requestAccounts'})
    authProvider = new EthereumAuthProvider(window.ethereum, addresses[0])
}

export const client = new WebClient({
    ceramic: 'https://ceramic-clay.3boxlabs.com/', //'testnet-clay', 
    connectNetwork: 'testnet-clay',
})

export const authenticate = async () => {
    
    // If authentication is successful, a DID instance is attached to the Ceramic instance
    await client.authenticate(authProvider)
    // A SelfID instance can only be created with an authenticated Ceramic instance
    self = new SelfID({ client })
    console.log('self', self)
    const data = await self.get('basicProfile', self.id)
    return data
}

/**Conexion para Core ************************************************************************* */


export const authenticate_ceramic = async () => {
    //const ethProvider = await web3Modal.connect()
    //const addresses = await ethProvider.enable()
  
    //const authProvider = new EthereumAuthProvider(ethProvider, addresses[0])
    const threeIdConnect = new ThreeIdConnect()
    await threeIdConnect.connect(authProvider)
    const provider = await threeIdConnect.getDidProvider()
    
    const ipfs = await Ipfs.create({ ipld: { formats: [dagJoseFormat] } })
    //const ceramic = await Ceramic.create(ipfs, config)
    const ceramic = await Ceramic.create(ipfs)

    //const ceramic = new Ceramic(endpoint)
    const did = new DID({
      provider: threeIdConnect.getDidProvider(),
      resolver: ThreeIdResolver.getResolver(ceramic),
    })
  
    await did.authenticate()
    console.log(did.id)
    ceramic.did = did
  
    const jws = await did.createJWS({ hello: 'world' })
    console.log(jws)
  
    window.ceramic = ceramic
    window.did = did.id

  }