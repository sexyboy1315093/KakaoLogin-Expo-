import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview'
import axios from 'axios';

export default function App() {

  const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

  function LogInProgress(data) {
      const exp = "code=";
      var condition = data.indexOf(exp);
      if (condition != -1) {
          var request_code = data.substring(condition + exp.length);
          requestToken(request_code);
      }
  };

  const requestToken = async (request_code) => {
      var returnValue = "none";
      var request_token_url = "https://kauth.kakao.com/oauth/token";

      axios({
          method: "post",
          url: request_token_url,
          params: {
              grant_type: 'authorization_code',
              client_id: 'ic',
              redirect_uri: 'url',
              code: request_code,
          },
      }).then(function (response) {
          returnValue = response.data.access_token;
      }).catch(function (error) {
          console.log('error', error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
            <WebView
                originWhitelist={['*']}
                scalesPageToFit={false}
                style={{ marginTop: 30 }}
                source={{ uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=id&redirect_uri=http://localhost:8080/kakao' }}
                injectedJavaScript={runFirst}
                javaScriptEnabled={true}
                onMessage={(event) => { LogInProgress(event.nativeEvent["url"]); }}
            />
    </View>
  );
}

const styles = StyleSheet.create({
 
});
