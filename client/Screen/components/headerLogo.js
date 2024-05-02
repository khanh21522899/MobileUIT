import { View, Image, Text } from 'react-native';

const LogoTitle = ({probs}) => {
    return (
        <View style={{ flexDirection:'row', alignItems:'center'}}>
            <Text style={{fontSize:25, color:'#fff'}}>{probs}</Text>
            <Image
            style={{ width: 60, height: 60, position:'absolute', marginLeft:150 }}
            source={require('../../assets/pngtree-chef-restaurant-logo-png.png')}
            />
        </View>
      );
}

export default LogoTitle