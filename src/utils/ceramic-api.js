/**Conexion para SelfID */
import { EthereumAuthProvider, SelfID, WebClient } from '@self.id/web'


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
