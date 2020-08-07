import React, { useState } from 'react'
import  './css/Login.css'
import { connect } from 'react-redux'
import AgregarUsuario from './AgregarUsuario'
import { loggin, getUser  } from '../actions/usuarioAction'

function Login({ loggin,getUser}){

    const [input, setInput] = useState({
        nombreUser : null,
        contraUser : null,
        emailUser : null
    })

    const handleInputChange = function(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    
    const enviarFormulario = function(e){
        e.preventDefault()
        const user= {
            nombreUser: input.nombreUser,
            contraUser: input.contraUser
        }
        getUser(user.nombreUser)
        .then(datos=>{
            if(datos===undefined){
                alert("el Usuario no existe")
            }
            if (datos!==undefined){
                if(datos.payload.reset === true)
                window.location.replace('http://localhost:3000/login/resetpass/'+datos.payload.idUser)
                else{
                    loggin(user)
                }
            }
        })
    }

    const cancelar = function(e){
        window.history.back();
       
    }

    return(
        <div className="container">
            <form  className="form-signin" onSubmit={(e)=>e.preventDefault()}>
                <h1>Ingresar </h1>
                <label htmlFor="nombreUser" className ="sr-only" >Nombre de Usuario*</label>
                <input className="form-control" required type="text" placeholder="Nombre de Usuario" name="nombreUser"  onChange={handleInputChange}/>
                      
                <label  htmlFor="contraUser" className="sr-only">Constraseña*</label>
                <input  className="form-control" required type="password" placeholder="Contraseña" name="contraUser"  onChange={handleInputChange}/>
                      
                <button type="submit" className=" btn-lg btn-primary btn-block"  value="Enviar" onClick={enviarFormulario} >Ingresar</button>
                <button type="button" className=" btn-lg btn-danger btn-block"  value="Cancelar" onClick={cancelar} >Cancelar</button>
            </form>
            <br/>
            <AgregarUsuario/>
        </div>
    )
}

function mapStateToProps(state){
    return {
        usuarioConectado : state.usuario.usuarioConectado
    }
}

export default connect (mapStateToProps,{loggin,getUser})( Login )