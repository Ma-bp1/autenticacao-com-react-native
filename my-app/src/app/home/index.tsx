import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router'

import { Ionicons } from '@expo/vector-icons';

import { auth } from '../../config/firebaseConfig'
import { signOut } from 'firebase/auth'


interface CardGato {
  id: number;
  tema: string;
  descricao: string;
  imagem: string;
  jornal: string;
  url: string;
}

export default function Home() {
    const currentUser = auth.currentUser
    const displayName = currentUser?.displayName ?? 'Usuário'

    const router = useRouter()

    const handleSignOut = async () => {
      try {
        await signOut(auth)
        
        Alert.alert('Usuário deslogado com sucesso.')
        
        router.push('/login')
      } catch (error) {
        Alert.alert('Não foi possível encerrar a sessão. Tente novamente mais tarde.')
        console.error('Error de logout:', error)
      }
    }

    const [cardsAbertos, setCardsAbertos] = useState<number[]>([]);

    const cardGatos: CardGato[] = [
      {
        id: 1,
        tema: 'Por que gatos têm bigodes longos',
        descricao:
          'Os bigodes dos gatos são muito mais essenciais do que parecem. A matéria explica por que essas estruturas são importantes desde os primeiros momentos de vida dos gatos.',
        imagem:
          'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/10/decifrar-o-que-seu-gato-quer-dizer.jpg?w=1200&h=900&crop=0&quality=90',
        jornal: 'CNN Brasil',
        url:
          'https://www.cnnbrasil.com.br/curiosidades/veja-por-que-gatos-tem-bigodes-longos-e-por-que-sao-tao-uteis-para-os-felinos/'
      },
      {
        id: 2,
        tema: 'Como acontece a doação de sangue animal',
        descricao:
          'A doação de sangue pode salvar a vida de cães e gatos em situações como acidentes, cirurgias e doenças que causam anemia. A matéria explica como funciona o procedimento e quais são os principais requisitos para que um pet possa ser um doador.',
        imagem:
          'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/09/doencas-cardiacas-caes-e-gatos.jpg?w=1200&h=900&crop=0&quality=90',
        jornal: 'Simone Machado, colaboração para a CNN Brasil',
        url:
          'https://www.cnnbrasil.com.br/style/doacao-de-sangue-animal-como-funciona-e-quais-pets-podem-doar/'
      },
      {
        id: 3,
        tema: 'O que importa na hora de procurar um pet',
        descricao:
          'É importante considerar fatores como espaço disponível, rotina, tempo para cuidados, perfil da família e custos. A matéria mostra as principais diferenças entre cães e gatos para ajudar na escolha de um pet que combine com o estilo de vida do tutor.',
        imagem:
          'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/05/gatos-caes.jpg?w=1200&h=900&crop=0&quality=90',
        jornal: 'Simone Machado, colaboração para a CNN Brasil',
        url:
          'https://www.cnnbrasil.com.br/style/cachorro-ou-gato-saiba-o-que-levar-em-conta-na-hora-de-ter-um-pet/'
      }
    ];

    
    function abrirCard(id: number) {
      if (cardsAbertos.includes(id)) {
        setCardsAbertos(cardsAbertos.filter(cardId => cardId !== id));
      } else {
        setCardsAbertos([...cardsAbertos, id]);
      }
    }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topo}>
          <Image 
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
          />

          <TouchableOpacity
            style={styles.botaoSair}
            onPress={handleSignOut}
          >
            <Ionicons
              name="log-out-outline"
              size={36}
              color="#4463e6"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.perfilContainer}>
            <Image 
              source={{ uri:'https://cdn-icons-png.flaticon.com/512/3033/3033143.png'}}
              style={styles.fotoPerfil}
            />
            <Text style={styles.nomeUsuario}>
              {displayName}
            </Text>
        </View>

        <Text style={styles.tituloNoticias}>NOTÍCIAS</Text>

        {cardGatos.map((card) => {
          const aberto = cardsAbertos.includes(card.id);

          return (
            <View key={card.id} style={styles.card}>

              {!aberto && (
                <>
                  <View style={styles.cardFechado}>

                    <Image
                      source={{ uri: card.imagem }}
                      style={styles.imagemCardFechado}
                    />

                    <View style={styles.temaFechado}>
                      <Text style={styles.tema}>
                        {card.tema}
                      </Text>
                    </View>

                  </View>

                  <TouchableOpacity
                    style={styles.botao}
                    onPress={() => abrirCard(card.id)}
                  >
                    <Text style={styles.textoBotao}>
                      Saiba mais
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              {aberto && (
                <View>
                  <Text style={styles.tema}>
                    {card.tema}
                  </Text>

                  <Text style={styles.texto}>
                    {card.descricao}
                  </Text>

                  <Text style={styles.jornal}>
                    {card.jornal}
                  </Text>

                  <Image
                    source={{ uri: card.imagem }}
                    style={styles.imagemCardAberto}
                  />

                  <TouchableOpacity
                    style={styles.botao}
                    onPress={() => Linking.openURL(card.url)}
                  >
                    <Text style={styles.textoBotao}>
                      Ir para notícia
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botaoFechar}
                    onPress={() => abrirCard(card.id)}
                  >
                    <Text style={styles.textoFechar}>
                      Fechar
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

            </View>
          );
        })}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 5,
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 90,
    resizeMode: 'contain',
  },
  perfilContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 15, 
    marginBottom: 10,      
    flex: 1,              
  },
  fotoPerfil: {
    width: 50,
    height: 50,
    borderRadius: 25, 
    tintColor: '#EF476F'
  },
  nomeUsuario: {
    marginLeft: 10,       
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF476F',        
  },
  botaoSair: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  tituloNoticias: {
    fontSize: 24,
    fontWeight: '900', // Modificado para evitar erro no TS, aceita string nesses pesos de fonte
    color: '#4463e6',
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 5,
  },
  card: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#4463e6',
    backgroundColor: 'white',
  },
  cardFechado: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagemCardFechado: {
    width: 120,
    height: 100,
    borderRadius: 10,
  },
  temaFechado: {
    flex: 1,
    marginLeft: 15,
  },
  tema: {
    fontWeight: '900', // Modificado para string
    fontSize: 17,
  },
  texto: {
    fontSize: 13,
    marginTop: 12,
  },
  jornal: {
    fontSize: 11,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  imagemCardAberto: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginVertical: 5,
  },
  botao: {
    backgroundColor: '#97bae4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  textoBotao: {
    color: 'white',
    fontWeight: '800', // Modificado para string
    fontSize: 15,
  },
  botaoFechar: {
    alignItems: 'center',
    marginTop: 10,
    padding: 8,
  },
  textoFechar: {
    color: '#4463e6',
    fontWeight: 'bold',
  }
});