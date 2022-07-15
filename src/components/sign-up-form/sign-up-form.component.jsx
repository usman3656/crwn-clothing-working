import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-imput/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields ={
    displayName :'',
    email :'',
    password :'',
    confirmPassword :''
};

const SignUpForm =() =>{

    const [formFields, setFormFields] =useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} =formFields;
    
    console.log(formFields);

    const resetFormFields= ()=>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) =>{
        event.preventDefault();
        if (password !== confirmPassword){
            alert("password not match");
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName});
            resetFormFields();

        }
        catch(error){
            if(error.code =='auth/email-already-in-use'){
                alert('Cannot create user due to email already in use');
            }
            else{
            console.log("user creation encountered an error" , error);
            }
        };
        
    };
    const handleChange = (event) => {
        const {name,value} = event.target;

        setFormFields({...formFields,[name] :value})
    };


    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            
            <form onSubmit={handleSubmit}>
                <FormInput type='text' required onChange={handleChange} name="displayName"
                label='Display Name' value={displayName}/>

                <FormInput type='email' required onChange={handleChange} name="email"
                label='Email' value={email}/>

                <FormInput type='password' required onChange={handleChange} name="password"
                label='Password' value={password}/>

                <FormInput type='password' required onChange={handleChange} name="confirmPassword"
                label='Confirm Password' value={confirmPassword}/>
                <Button  type='submit'>Sign up</Button>
            </form>
        </div>
    );
};
export default SignUpForm;