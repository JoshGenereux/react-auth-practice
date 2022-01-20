import React from 'react';
import {useFormik} from 'formik'

function Register() {
    const initialValues = {
        username: "",
        password: "",
        name: '',
        confirmPassword: '',
    }
    const onSubmit = (values) => {
        axios.post('/register', values)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('username', res.data[0][0].username)
                localStorage.setItem('id', res.data[0][0].id)
                localStorage.setItem('name', res.data[0][0].name)
            })
            .catch((err) => console.log(err.response.data))
    }

    const validate = (values) => {
        const errors = {};
        if(!values.username){
            errors.username = "Username Required"
        }
        if(!values.password){
            errors.password = "Password Required"
        } else if(values.password.length < 8){
                errors.password = "Password must be longer than 8 characters"
        }
        if(!values.name){
            errors.name = "You gotta hav a name"
        }
        if(!values.confirmPassword){
            errors.confirmPassword = "Please confirm your password"
        } else if(!values.password !== values.confirmPassword){
            errors.confirmPassword = "Passwords must match"
        }
        return errors;
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    return <div>
        <h2>Register</h2>
        <form onSubmit={formik.handleSubmit}>
            <input type='text'
                   name='username'
                   onChange={formik.handleChange}
                   value={formik.values.username}
                   placeholder='Username'
            />
            <input type='text'
                   name='name'
                   onChange={formik.handleChange}
                   value={formik.values.name}
                   placeholder='Username'
            />
            <input type='password'
                   name='password'
                   onChange={formik.handleChange}
                   value={formik.values.password}
                   placeholder='password'
            />
            <input type='password'
                   name='confirmPassword'
                   onChange={formik.handleChange}
                   value={formik.values.confirmPassword}
                   placeholder='confirm password'
            />
            <button type='submit' disabled={!formik.isValid}>Submit</button>
        </form>
        <div>
            {formik.errors.username ? <div>{formik.errors.username}</div> : null}
            {formik.errors.name ? <div>{formik.errors.name}</div> : null}
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
            {formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
        </div>
    </div>
}




export default Register;