
import './App.css';
import React, { useState } from 'react';
import { Core } from '@self.id/core'
//import { EthereumAuthProvider, SelfID, WebClient } from '@self.id/web'
import { addresses, authenticate, initialize, self, client } from './utils/ceramic-api'
import UserProfile from './UserProfile'
import UpdateProfile from './UpdateProfile'

const core = new Core({ ceramic: 'testnet-clay' })

function App() {
const [user, setUser] = useState(null)


const doconnect = async () => {
  const user = await authenticate()
    if (user) {
        setUser(user)
    } else { 
      console.log('No user found!')
    }
 }    

 // agrega la nueva propiedad/valor al perfil actualizalo y recarga variable estado user
 const handleSubmit = async (event, property, value) => {
   event.preventDefault()
  console.log('property/value', property, value)
  const nuevoPerfil= {...user, [property]: value}
  console.log('nuevoPerfil', nuevoPerfil)
  await self.set('basicProfile', nuevoPerfil)
  const data = await self.get('basicProfile', self.id)
  setUser(data)
 }

   const getprofile = async () => {
     console.log('self.id', self.id)
    const data = await self.get('basicProfile', self.id)
    console.log('data', data)
    setUser(data)
  }
  
  const resetProfile = async () => {
    const profile= {name:'Test-2', bio: 'Soy una cuenta de pruebas, mi destino es viajar incognito por la blockchain',
    correo:'test2@mundomaravilloso.net'}
    const data = await self.set('basicProfile', profile)
    //const data = await self.get('basicProfile', self.id)
    console.log('data set', data)
      setUser(profile)
      getprofile()
    }

    // obtener un profile con la clase CORE
    // segun menu configuration de Tools: https://developers.ceramic.network/tools/self-id/configuration/
    // de aqui podriamos crear un datamodel: https://developers.ceramic.network/tools/glaze/datamodel/
    const getDataModel = async () => {
     /* const id='0x6d96b8d1a4a9991a3831935bab3413254cb02d87' & '@eip155:1'
      const datastore = await client.getAccountDID(id)*/
      const profile = await core.get('basicProfile', self.id)      
      console.log('basicProfile con Core:', profile)
    }
    
initialize()

  return (
    <div className="App">
      <header className="App-header">
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <h3>SelfID - A simple Test </h3>
          {addresses && addresses.length > 0 && <label> {addresses[0]} </label>}
        </div>
      </header>
      <div className="controles">
        <div className='perfil-usuario'> 
        { !user ? (
            <button onClick={doconnect}>authenticate</button> 
          ) :
          ( <div>
            <label>DID: {self.id}</label>
            <UserProfile user={user} /> 
            <UpdateProfile handleSubmit={handleSubmit} />
            </div>
          )
        }
        <button style={{marginLeft:'15px'}} onClick={resetProfile}>Reset Profile</button>
        <button style={{marginLeft:'15px'}} onClick={getprofile}>Get Profile</button>
        <hr></hr>
        { user && (
        <button style={{marginLeft:'15px'}} onClick={getDataModel}>Read Data Model</button>
        )}
        </div>
      </div>
    </div>
  );
}

export default App;