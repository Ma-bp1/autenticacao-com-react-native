import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Href } from 'expo-router'

export default function Sobre() {
  const router = useRouter()

  return (
    <View style={styles.tela}>
      <ScrollView
        contentContainerStyle={styles.conteudo}
      >

        <View style={styles.cabecalho}>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={()=> router.push('/welcome' as Href)}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={28}
              color="#EF476F"
            />
          </TouchableOpacity>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>

        <Text style={styles.titulo}>SOBRE NÓS</Text>

        <View style={styles.areaImagem}>
          <Image
            source={require('../../../assets/images/gato.png')}
            style={styles.imagem}
          />
        </View>

        <View style={styles.areaTexto}>
          <Text style={styles.subtitulo}>SOBRE O MEWS</Text>
          <Text style={styles.texto}>
            O MEWS é um aplicativo desenvolvido
            para reunir notícias e informações
            sobre gatos em um só lugar.
          </Text>
          <Text style={styles.texto}>
            Aqui você pode encontrar conteúdos
            sobre comportamento, saúde,
            cuidados e curiosidades do mundo
            felino.
          </Text>
          <Text style={styles.subtitulo}>
            NOSSO OBJETIVO
          </Text>
          <Text style={styles.texto}>
            Facilitar o acesso a informações
            relevantes para pessoas que amam
            gatos e desejam conhecer mais
            sobre esses animais.
          </Text>
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

  botaoVoltar: {
    width: 45,
    height: 45,

    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 90,
    height: 70,
    resizeMode: 'contain',
  },

  titulo: {
    color: '#4463e6',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 20,
  },

  areaImagem: {
    width: '100%',
    height: 180,
    
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },

  imagem: {
    width: '100%',
    height: '100%',

    resizeMode: 'contain',
  },

  areaTexto: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  subtitulo: {
    color: '#4463e6',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
    marginTop: 5,
  },

  texto: {
    color: '#555',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 18,
  },
});