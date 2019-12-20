import React from 'react'
import axios from 'axios'
import { View, FlatList, SafeAreaView, Text, StyleSheet, StatusBar, Image, Dimensions } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { TextInput } from 'react-native-gesture-handler'
import { PokemonLine } from './PokemonLine'

export class Favoris extends React.Component {
    state = {
        pokemons: []
    }

    componentDidMount() {
        this.setState({pokemons: this.props.navigation.getParam('favPokemons')})
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centeredContainer}>
                    <Image
                        style={{width: 200, height: 200}}
                        source={{uri: 'https://cdn.dribbble.com/users/1771704/screenshots/6124573/attachments/1313609/pokeball.gif'}} />
                </View>
                <FlatList
                    data={this.state.pokemons}
                    keyExtractor={pokemon => pokemon.name}
                    renderItem={({item}) => {
                        return (<PokemonLine noCheck={true} navigation={this.props.navigation} pokemon={item}></PokemonLine>)
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
    centeredContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})