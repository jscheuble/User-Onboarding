import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function SignUpForm(props) {
    return(
        <div className='sign-up-form'>
            <Form>
                <label>Name: 
                    <Field type='text' name='name' placeholder='Name' onChange={props.handleChange} value={props.values.name}/>
                </label>
                {props.touched.name && props.errors.name && (<p className='errors'>{props.errors.name}</p>)}
                <label>Email: 
                    <Field type='email' name='email' placeholder='Email' onChange={props.handleChange} value={props.values.email}/>
                </label>
                {props.touched.email && props.errors.email && (<p className='errors'>{props.errors.email}</p>)}
                <label>Password: 
                    <Field type='password' name='password' placeholder='Password' onChange={props.handleChange} value={props.values.password}/>
                </label>
                {props.touched.password && props.errors.password && (<p className='errors'>{props.errors.password}</p>)}
                <label>Have you agreed to our Terms of Service?
                <Field type='checkbox' name='tos' onChange={props.handleChange} checked={props.values.tos}/>
                </label>
                {props.touched.tos && props.errors.tos && (<p className='errors'>{props.errors.tos}</p>)}
                <button type='submit'>Submit</button>
            </Form>
        </div>
    );
}

const FormikSignUpForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3).required('Name must be more than three characters.'),
        email: Yup.string().email().required('You must provide a valid e-mail address'),
        password: Yup.string().min(8).required('Password must exceed 8 characters'),
        tos: Yup.boolean().oneOf([true], 'You must agree to our Terms of Service')
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        console.log('submitting', values);
        axios
        .post('https://reqres.in/api/users/', values)
        .then(res => {
            console.log('success', res);
            setStatus(res.data);
            resetForm();
        })
        .catch(err => console.log(err));
    }
})(SignUpForm);

export default FormikSignUpForm;