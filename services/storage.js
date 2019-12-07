import RNSensitiveInfo from 'react-native-sensitive-info'

const storageName = {
  sharedPreferencesName: 'ConnectMeSharedPref',
  keychainService: 'ConnectMeKeyChain',
}

// SECURE STORAGE
export const secureSet = (key: string, data: string) =>
  RNSensitiveInfo.setItem(key, data, storageName)

export const secureGet = async (key: string) => {
  const data = await RNSensitiveInfo.getItem(key, storageName)

  return data
}