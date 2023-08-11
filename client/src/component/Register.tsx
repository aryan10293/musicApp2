import React from 'react'
import { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
function Register() {
    const [email, setEmail] = React.useState<string>('')
    const [name, setName] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleClick = async(e: FormEvent<HTMLFormElement>) => {
       e.preventDefault()
        try {
        const reg = await fetch('http://localhost:2014/createaccount',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            userName: name,
            email: email,
            password: password,
            confirmPassword: password
          }),
        })
        const data = await reg.json()
        console.log(data)
        setPassword('')
        setEmail('')
        setName('')
        window.location.href = "/"
        } catch(err) {
            console.error(err)
        }
    }
    return (
    
        <div className="auth-modal">
            <div className="close-icon" >ⓧ</div>

            <h2>Sign Up</h2>
            <form  onSubmit={handleClick}>
                <input
                    type="username"
                    id="username"
                    name="username"
                    placeholder="username"
                    required={true}
                    onChange={handleChangeName}
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={handleChangeEmail}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={handleChangePassword}
                />
                <input className="secondary-button" type="submit" />
            </form>

            <hr/>
            <h2 >
            Have An Account?{' '}
            <Link to="/" className='text-blue-700'>
              login!
            </Link>
          </h2>

        </div>
    )
}


export default Register