import React from 'react'
import axios from 'axios'
import { View, FlatList, SafeAreaView, Text, StyleSheet, StatusBar, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'

export class PokemonDetails extends React.Component {
    state = {
        pokemonSpecie: {},
        pokemon: {},
        gotAnswer: false
    }

    componentDidMount() {
        axios.get(this.props.navigation.getParam('urlToFetch'))
            .then(e => e.data)
            .then(specie => {
                axios.get(`https://pokeapi.co/api/v2/pokemon/${specie.id}`)
                    .then(e => e.data)
                    .then(pokemon => {
                        this.setState({
                            pokemon: pokemon,
                            pokemonSpecie: specie,
                            gotAnswer: true
                        })
                    })
            })
    }

    render() {
        if (!this.state.gotAnswer) {
            return (<View></View>)
        }

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.pokemon}>
                    <View style={styles.centeredContainer}>
                        <Image style={{width: 150, height: 150}}
                            source={{uri: this.state.pokemon.sprites.front_default}} />
                    </View>
                    <View style={styles.identifier}>
                        <Text>{this.state.pokemonSpecie.id}</Text>
                        <Text>{this.state.pokemonSpecie.names.find(e => e.language.name === 'fr').name}</Text>
                        <Text>{this.state.pokemonSpecie.names.find(e => e.language.name === 'ja').name}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text>{this.state.pokemonSpecie.genera.find(e => e.language.name === 'fr').genus}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text>Santé : {this.state.pokemon.stats.find(e => e.stat.name === 'hp').base_stat}</Text>
                        <Text>Vitesse : {this.state.pokemon.stats.find(e => e.stat.name === 'speed').base_stat}</Text>
                        <Text>Attaque : {this.state.pokemon.stats.find(e => e.stat.name === 'attack').base_stat}</Text>
                        <Text>Défense : {this.state.pokemon.stats.find(e => e.stat.name === 'defense').base_stat}</Text>
                        <Text>Attaque spécial : {this.state.pokemon.stats.find(e => e.stat.name === 'special-attack').base_stat}</Text>
                        <Text>Défense Spécial : {this.state.pokemon.stats.find(e => e.stat.name === 'special-defense').base_stat}</Text>
                    </View>
                    <View style={styles.infos}>
                        {this.state.pokemon.types.map(type => (
                            <View><Text>{type.type.name}</Text></View>
                        ))}
                    </View>
                </View>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#f3fcff',
        height: '100%'
    },
    pokemon: {
        width: '100%',
        justifyContent: 'center',
    },
    pokemonName: {
        fontSize: 20
    },
    centeredContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    identifier: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    infos: {
        padding: 10
    }
})