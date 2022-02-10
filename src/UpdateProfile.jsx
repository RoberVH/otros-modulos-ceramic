import { useState } from 'react';

const UpdateProfile = (props) => {
const [propName, setPropName] = useState('');
const [propValue, setPropValue] = useState('');

return (
    <div className="profile-frame fuente-perfil">
        <p style={{textAlign:'left', marginLeft:'1em', marginBottom:'2em'}}>Agregar una propiedad con su valor al perfil</p>
        <form onSubmit={(e) => props.handleSubmit(e, propName, propValue)}>
            <div style={{margin:'15px 15px'}}>
                <label className="etiqueta">Prop:</label>
                <input type="text" name="propname" value={propName} onChange={(e) => setPropName(e.target.value)} />
            </div>
            <div style={{margin:'15px 15px'}}>
            <label className="etiqueta">Valor:</label>
            <input type="text" name="propvalue" value={propValue} onChange={(e) => setPropValue(e.target.value)} />
            </div>
            <input type="submit" value="Agregar" />
            </form>
    </div>
)

}

export default UpdateProfile;