import React from 'react'
import axios from 'axios'
import { View, FlatList, SafeAreaView, Text, StyleSheet, StatusBar, TouchableNativeFeedback } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { TextInput } from 'react-native-gesture-handler'

export class PokemonLine extends React.Component {

    fav = (item) => {
        item.favorite = !item.favorite
        this.forceUpdate()
    }

    navigateTo(pokemon) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'PokemonDetails',
            params: {urlToFetch: pokemon.url},
            action: NavigationActions.navigate({ routeName: 'PokemonDetails' }),
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        console.log(this.props)
        return (
            <View style={styles.pokemonContainer}>
                <TouchableNativeFeedback
                    onPress={() => this.navigateTo(this.props.pokemon)}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.pokemon}>
                        <Text style={styles.pokemonName}>{this.props.pokemon.name}</Text>
                    </View>
                </TouchableNativeFeedback>
                {!this.props.noCheck && 
                    <TouchableNativeFeedback
                    onPress={() => this.fav(this.props.pokemon)}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.fav}>
                            <Text style={styles.favText}>{this.props.pokemon.favorite ? '☑' : '☐'}</Text>
                        </View>
                    </TouchableNativeFeedback>
                }
            </View>
        )

    }
}

const styles = StyleSheet.create({
    pokemon: {
        padding: 15,
        flex: 1
    },
    pokemonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    fav: {
        width: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    favText: {
        fontSize: 30,
    },
    pokemonName: {
        fontSize: 20
    }
})