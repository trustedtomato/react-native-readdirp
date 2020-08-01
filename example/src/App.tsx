import * as React from 'react';
import { StyleSheet, View, Text, PermissionsAndroid } from 'react-native';
import fs from 'react-native-fs';
import readdirp from 'react-native-readdirp';

const requestStorageAccess = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    {
      title: 'Storage access permission',
      message: 'To use the storage, storage access is required.',
      buttonPositive: 'OK',
    }
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  } else {
    throw new Error('Not granted!');
  }
};

export default function App() {
  const [result, setResult] = React.useState<string>();

  React.useEffect(() => {
    requestStorageAccess().then(async () => {
      const uri = fs.ExternalStorageDirectoryPath;
      let filesLength = 0;
      await readdirp(uri).forEach((file) => {
        console.log(file.path);
        filesLength += 1;
      });
      setResult(`You have ${filesLength} files!`);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
