import * as React from 'react';

import { Button, Card, FormControl, InputText, LayoutOne } from 'upkit';

import { useForm } from 'react-hook-form';

import { rules } from './validation';
import { registerUser } from '../../api/auth';
import { useHistory } from 'react-router-dom';
import StoreLogo from '../../components/StoreLogo';

const statusList ={
    idle:'idle',
    process:'process',
    success: 'success',
    error:'error'
}

export default function Register(){
    let { register, handleSubmit, errors, setError } = useForm();
    let [status , setStatus] = React.useState(statusList.idle);
    let history = useHistory();
    const onSubmit = async FormData => {
        let { password, password_confirmation} = FormData;
        if(password !== password_confirmation){
            return setError('password_confirmation',{type:'equility', message:'Konfirmasi password harus sama dengan password'});
        }
        setStatus(statusList.process);
        let { data } = await registerUser(FormData);
        if(data.error){
            let fields = Object.keys(data.fields);
            fields.forEach(field =>{
                setError(field, {type: 'server',message:data.fields[fields]?.properties?.message});
            });
            setStatus(statusList.error);
        }
        setStatus(statusList.success)
        history.push('/register/berhasil');
    }
    return(
        <LayoutOne size="small">
            <div className="text-center mb-5">
                <StoreLogo/>
            </div>
            <Card color="white">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl errorMessage={errors.full_name?.message}>
                        <InputText
                            name="full_name"
                            placeholder="Nama Lengkap"
                            fitContainer
                            ref={register(rules.full_name)}
                        />                        
                    </FormControl>
                    <FormControl errorMessage={errors.email?.message}>
                        <InputText
                            name="email"
                            placeholder="Email"
                            fitContainer
                            ref={register(rules.email)}
                        />                        
                    </FormControl>
                    <FormControl errorMessage={errors.password?.message}>
                        <InputText
                            name="password"
                            placeholder="Password"
                            fitContainer
                            ref={register(rules.password)}
                        />                        
                    </FormControl>
                    <FormControl errorMessage={errors.password_confirmation?.message}>
                        <InputText
                            name="password_confirmation"
                            placeholder="Password"
                            fitContainer
                            ref={register(rules.password_confirmation)}
                        />                        
                    </FormControl>
                    <Button
                        size="large"
                        fitContainer
                    >Mendaftar</Button>
                </form>
            </Card>
        </LayoutOne>
    );
}