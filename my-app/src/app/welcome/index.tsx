import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useRouter, Href } from 'expo-router'

export default function Welcome() {
    const router = useRouter()

    return (
        <View style={styles.tela}>
        <ScrollView style={styles.conteudo}>
            <View style={styles.cabecalho}>
            <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
            />
            <TouchableOpacity
                onPress={() => router.push('/sobre' as Href)}
            >
                <Text style={styles.sobre}>
                    SOBRE
                </Text>
            </TouchableOpacity>
            </View>

            <View style={styles.banner}>
            <View style={styles.areaImagem}>

                <Image
                source={require('../../../assets/images/menina.png')}
                style={styles.imagem}
                />
            </View>

            <View style={styles.areaTexto}>
                <Text style={styles.titulo}>
                    BEM-VINDO!
                </Text>
                <Text style={styles.subtitulo}>
                    Encontre notícias e informações
                    para quem ama gatos.
                </Text>
            </View>
            </View>

            <View style={styles.botoes}>

            <TouchableOpacity
                style={styles.botao}
                onPress={() => router.push('/login')}
            >
                <Text style={styles.textoBotao}>
                    ENTRAR
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botao}
                onPress={() => router.push('/signUp')}
            >
                <Text style={styles.textoBotao}>
                    CADASTRAR
                </Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
  );
}


const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },

  conteudo: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    marginBottom: 10,
  },

  logo: {
    width: 90,
    height: 70,
    resizeMode: 'contain',
  },

  sobre: {
    color: '#EF476F',
    fontSize: 13,
    fontWeight: '800',
  },

  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
  },

  areaImagem: {
    width: '50%',
    height: 190,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#97bae4',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#dce8f7',
  },

  imagem: {
    width: '150%',
    height: '150%',
    resizeMode: 'contain',
  },

  areaTexto: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },

  titulo: {
    color: '#4463e6',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 10,
  },

  subtitulo: {
    color: '#555',
    fontSize: 14,
    lineHeight: 20,
  },

  botoes: {
    width: '100%',
    alignItems: 'center',
  },

  botao: {
    width: '100%',
    backgroundColor: '#97bae4',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },

  textoBotao: {
    color: 'white',
    fontSize: 15,
    fontWeight: '900',
  },
});