import React from 'react'
import axios from 'axios'
import { View, FlatList, SafeAreaView, Text, StyleSheet, StatusBar, TouchableNativeFeedback } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { TextInput } from 'react-native-gesture-handler'
import { PokemonLine } from './PokemonLine'

export class Pokenul extends React.Component {
    state = {
        pokemons: [],
        filteredPokemons: []
    }

    componentDidMount() {
        axios.get('https://pokeapi.co/api/v2/generation/1')
            .then(e => e.data)
            .then(data => data.pokemon_species)
            .then(species => {
                species = species.map(sp => ({
                    ...sp,
                    favorite: false
                }))
                this.setState({pokemons: species, filteredPokemons: species})
            })
    }
    
    searchHandler = (input) => {
        if (input === '') {
            this.setState({filteredPokemons: this.state.pokemons})
            return
        }
        const filteredPokemons = this.state.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(input.toLowerCase()))
        this.setState({filteredPokemons})
    }

    goToFav = () => {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Favoris',
            params: {favPokemons: this.state.pokemons.filter(p => p.favorite)},
            action: NavigationActions.navigate({ routeName: 'Favoris' }),
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} onChangeText={this.searchHandler} ></TextInput>
                    <TouchableNativeFeedback
                        onPress={() => this.goToFav(this.props.pokemon)}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.pokemon}>
                            <Text style={styles.favori}>Favoris</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <FlatList
                    data={this.state.filteredPokemons}
                    keyExtractor={pokemon => pokemon.name}
                    renderItem={({item}) => {
                        return (<PokemonLine navigation={this.props.navigation} pokemon={item}></PokemonLine>)
                }}></FlatList>
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
    input: {
        padding: 5,
        margin: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flex: 1
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    favori: {
        fontSize: 22
    }
})