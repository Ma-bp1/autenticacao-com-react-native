import { Alert, View, ScrollView, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'

import { useState } from 'react'
import { useRouter } from 'expo-router'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import { signUpSchema, type SignUpData } from '@/src/schemas/authSchema'
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { auth } from '@/src/config/firebaseConfig'

export default function SignUp(){
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const {control, handleSubmit, formState: {errors}} = useForm<SignUpData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {name: '', email: '', password: '', confirmPassword: ''}
    })

    const handleSignUpData = async (data: SignUpData) => {
        setIsLoading(true)

        const cleanEmail = data.email.trim().toLowerCase()

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, data.password)

            const user = userCredential.user

            await updateProfile(user, {
                displayName: data.name
            })

            await signOut(auth)

            Alert.alert('Sucesso', 'Cadastro realizado com sucesso. Ir para a tela de Login.', [
                {
                    text: 'OK',
                    onPress: () => router.push('/login')
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
            <ScrollView contentContainerStyle={{paddingBottom: 100,}}>
                {/* logo */}
                <Image 
                    source={require('../../../assets/images/logo.png')}
                    style={{width: 300, height: 300, }}
                />
                

                <Text style={styles.title}>Cadastro</Text>

                <Text style={styles.text}>Nome</Text>
                <View>
                    <Controller
                        control={control}
                        name='name'
                        render= {({field: {onChange, onBlur, value} }) => (
                            <TextInput 
                                style={styles.input}
                                placeholder='Seu nome/apelido aqui...'
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
                </View>

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

                <Text style={styles.text}>Confirmar Senha</Text>
                <View>
                    <Controller
                        control={control}
                        name='confirmPassword'
                        render= {({field: {onChange, onBlur, value} }) => (
                            <TextInput 
                                style={styles.input}
                                placeholder='Confirme a senha...'
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={true}
                                autoCapitalize='none'
                            />
                        )}
                    />
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(handleSignUpData)}
                >
                    <Text style={{color: 'white', fontSize:24,}}>
                        {isLoading ? 'Aguarde...' : 'Cadastrar'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor: '#fff',
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
    errorText: {
        fontSize:16,
        textAlign:'left',
        color:'#d33257',
        marginBottom: 20,
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