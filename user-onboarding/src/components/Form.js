import React from 'react';
import { withFormik, Form, Field } from 'formik';

function SignUpForm() {
    return(
        <div className='sign-up-form'>
            <Form>
                <label>Name: 
                    <Field type='text' name='name' placeholder='Name'/>
                </label>
                <label>Email: 
                    <Field type='email' name='email' placeholder='Email'/>
                </label>
                <label>Password: 
                    <Field type='password' name='password' placeholder='Password' />
                </label>
                <label>Have you agreed to our Terms of Service?
                    <Field type='checkbox' name='tos'
                    //checked={values.tos}
                    />
                </label>
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
        }
    }
})(SignUpForm);

export default FormikSignUpForm;