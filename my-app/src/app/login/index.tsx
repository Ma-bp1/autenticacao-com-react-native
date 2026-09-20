import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import { Link } from 'expo-router'

import { useState } from 'react'
import { useRouter } from 'expo-router'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import { loginSchema, type LoginData } from '@/src/schemas/authSchema'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/src/config/firebaseConfig'

export default function Login(){
    const [isLoading, setIsLoading] = useState(false)
        const router = useRouter()
    
        const {control, handleSubmit, formState: {errors}} = useForm<LoginData>({
            resolver: zodResolver(loginSchema),
            defaultValues: { email: '', password: '', }
        })
    
        const handleLoginData = async (data: LoginData) => {
            setIsLoading(true)
            
            const cleanEmail = data.email.trim().toLowerCase()

            try {
                const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, data.password)
    
                Alert.alert('Sucesso', 'Login realizado com sucesso. Ir para a tela home.', [
                    {
                        text: 'OK',
                        onPress: () => router.push('/home')
                    }
                ])
            } catch (error: any) {
                console.error('Erro de autenticação:', error)
                Alert.alert('Erro ao cadastrar', error.message)
            } finally {
                setIsLoading(false)
                console.log('Dados enviados:', data)
            }
        }
        
    return (
        <View style={styles.container}>
            {/* logo */}
            <Image 
                source={require('../../../assets/images/logo.png')}
                style={{width: 300, height: 300, }}
            />
            

            <Text style={styles.title}>Login</Text>

            <Text style={styles.text}>E-mail</Text>
            <View>
                <Controller
                    control={control}
                    name='email'
                    render= {({field: {onChange, onBlur, value} }) => (
                        <TextInput 
                            style={styles.input}
                            placeholder='Seu email...'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType='email-address'
                            autoCapitalize='none'
                        />
                    )}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>

            <Text style={styles.text}>Senha</Text>
            <View>
                <Controller
                    control={control}
                    name='password'
                    render= {({field: {onChange, onBlur, value} }) => (
                        <TextInput 
                            style={styles.input}
                            placeholder='Sua senha...'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry={true}
                            autoCapitalize='none'
                        />
                    )}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>

            <Link href='./signUp'>
                <Text style={[styles.text, {fontStyle: 'italic'}]}>
                    Não tem conta ainda? Cadastre-se.
                </Text>
            </Link>

            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(handleLoginData)}
            >
                <Text style={{color: 'white', fontSize:24,}}>
                    Entrar
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#fff'
    },
    title: {
        fontWeight:'bold',
        fontSize:26,
        textAlign:'center',
        color:'#2540b8',
        margin: 10,
    },
    text: {
        fontSize:21,
        textAlign:'left',
        color:'#EF476F',
        width:'100%',
        marginLeft: 30,
    },
    input: {
        backgroundColor: '#faf9f9',
        borderWidth: 3,
        borderColor:'#6c82e6',
        fontSize: 16,
        padding: 20,
        width: 300,
        borderRadius: 21,
        margin: 15,
    },
    errorText: {
        fontSize:16,
        textAlign:'left',
        color:'#d33257',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ff7092',
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 21,
        margin: 15,
        alignItems:'center',
        justifyContent:'center',
    }
})