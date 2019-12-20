import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Pokenul } from './components/Pokedex'
import { PokemonDetails } from './components/PokemonDetails'
import { Favoris } from './components/Favoris';

const AppNavigator = createStackNavigator(
    {
        Home: Pokenul,
        PokemonDetails: PokemonDetails,
        Favoris: Favoris
    }, {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);

export default createAppContainer(AppNavigator)