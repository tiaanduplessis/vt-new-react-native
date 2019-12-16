// @flow
import { NativeModules } from 'react-native'
import memoize from 'lodash.memoize'

// import type {
//   VcxProvision,
//   VcxProvisionResult,
//   CxsInitConfig,
//   InitWithGenesisPathConfig,
//   VcxInitConfig,
//   CxsPushTokenConfig,
//   VcxPushTokenConfig,
//   VcxCreateConnection,
//   VcxConnectionConnectResult,
//   VcxCredentialOffer,
//   WalletPoolName,
// } from './type-cxs'
// import type { InvitationPayload } from '../../invitation/type-invitation'
// import type { MyPairwiseInfo } from '../../store/type-connection-store'
import { secureSet, secureGet } from '../services/storage'
// import { BigNumber } from 'bignumber.js'
// import type { LedgerFeesData } from '../../store/ledger/type-ledger-store'



const { RNIndy } = NativeModules
// import RnIndy from 'react-native-rn-indy'

export const paymentHandle = 0
// console.log('fucking indy is ', Indy)
export const WALLET_KEY = 'WALLET_KEY'
export const getWalletKey = memoize(async function(): Promise<string> {
  try {
    let walletKey: string | null = await secureGet(WALLET_KEY)
    if (walletKey) {
      return walletKey
    }
    // console.log('new module is ', RnIndy)
    // console.log('native modules are ', NativeModules)
    // console.log('rnindy is ', RNIndy)
    const lengthOfKey = 64
    walletKey = await RNIndy.createWalletKey(lengthOfKey)
    // createWalletKey sometimes returns with a whitespace character at the end so we need to trim it
    walletKey = walletKey.trim()

    await secureSet(WALLET_KEY, walletKey)

    return walletKey
  } catch (e) {
    // not sure what to do if keychain/keystore fails
    throw e
  }
})

// export async function convertCxsInitToVcxInit(
//   init: InitWithGenesisPathConfig,
//   walletPoolName: WalletPoolName
// ): Promise<VcxInitConfig> {
//   const wallet_key = await getWalletKey()
//   return {
//     agency_endpoint: init.agencyUrl,
//     agency_did: init.agencyDID,
//     agency_verkey: init.agencyVerificationKey,
//     config: init.poolConfig,
//     pool_name: walletPoolName.poolName,
//     wallet_name: walletPoolName.walletName,
//     wallet_key,
//     genesis_path: init.genesis_path,
//     remote_to_sdk_did: init.myOneTimeAgentDid,
//     remote_to_sdk_verkey: init.myOneTimeAgentVerificationKey,
//     sdk_to_remote_did: init.myOneTimeDid,
//     sdk_to_remote_verkey: init.myOneTimeVerificationKey,
//     // TODO: These should be removed after we sdk team fix these as optional
//     institution_name: 'some-random-name',
//     institution_logo_url: 'https://robothash.com/logo.png',
//     institution_did: init.oneTimeAgencyDid,
//     institution_verkey: init.oneTimeAgencyVerificationKey,
//   }
// }

// export function convertCxsPushConfigToVcxPushTokenConfig(
//   pushConfig: CxsPushTokenConfig
// ): VcxPushTokenConfig {
//   return {
//     id: pushConfig.uniqueId,
//     value: pushConfig.pushToken,
//   }
// }

// export function convertInvitationToVcxConnectionCreate(
//   invitation: InvitationPayload
// ): VcxCreateConnection {
//   return {
//     source_id: invitation.requestId,
//     invite_details: {
//       connReqId: invitation.requestId,
//       // TODO: Add status code to be available in invitation payload
//       // for now, it would always be MS-102
//       statusCode: 'MS-102',
//       senderDetail: invitation.senderDetail,
//       senderAgencyDetail: invitation.senderAgencyDetail,
//       targetName: invitation.senderName,
//       // hard coding this for now, because this field does not matter anywhere for processing
//       // and it will always be message sent for the purpose of connection create
//       statusMsg: 'message sent',
//     },
//   }
// }

// export function convertVcxConnectionToCxsConnection(
//   vcxConnection: VcxConnectionConnectResult
// ): MyPairwiseInfo {
//   return {
//     myPairwiseDid: vcxConnection.pw_did,
//     myPairwiseVerKey: vcxConnection.pw_verkey,
//     myPairwiseAgentDid: vcxConnection.agent_did,
//     myPairwiseAgentVerKey: vcxConnection.agent_vk,
//     myPairwisePeerVerKey: vcxConnection.their_pw_verkey,
//     senderDID: vcxConnection.their_pw_did,
//   }
// }

// // 1 sovrin token = 100M sovrin atoms
// const sovrinAtomsToSovrinTokensConversionFactor = 100000000

// // this determines what is the length after decimal separator
// export const conversionFactorLength =
//   `${sovrinAtomsToSovrinTokensConversionFactor}`.length - 1

// export function convertSovrinAtomsToSovrinTokens(
//   sovrinAtoms: string | number
// ): string {
//   const atoms = new BigNumber(sovrinAtoms)
//   return atoms
//     .dividedBy(sovrinAtomsToSovrinTokensConversionFactor)
//     .toFixed()
//     .toString()
// }

// export function convertSovrinTokensToSovrinAtoms(sovrinTokens: string): string {
//   const tokens = new BigNumber(sovrinTokens)

//   return tokens
//     .multipliedBy(sovrinAtomsToSovrinTokensConversionFactor)
//     .toFixed()
//     .toString()
// }

// const LEDGER_FEE_TRANSFER_CODE = '10001'
// const noTransferFees = {
//   transfer: '0',
// }

// export function convertVcxLedgerFeesToLedgerFees(
//   feesJson: string
// ): LedgerFeesData {
//   const fees = JSON.parse(feesJson)
//   const transferFees: ?string = fees[LEDGER_FEE_TRANSFER_CODE]

//   if (!transferFees) {
//     return noTransferFees
//   }

//   const transferFeesAtoms = new BigNumber(transferFees)
//   if (transferFeesAtoms.isNaN()) {
//     return noTransferFees
//   }

//   // if there is value, then, that value is in sov-atoms
//   // so we need to convert that to sovrin tokens
//   return {
//     transfer: convertSovrinAtomsToSovrinTokens(transferFeesAtoms),
//   }
// }
