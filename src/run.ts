import { CanonicalForeignField, ForeignCurveV2, Provable, ZkProgram } from 'o1js';
import { ECDHSecp256k1, Secp256k1Curve } from './ecdh-secp256k1.js';

// Create a zkSNARK program for verifying the ECDH operation on Secp256k1
let ecdhVerificationProgram = ZkProgram({
    name: 'ecdh-secp256k1-verification',
    publicOutput: ForeignCurveV2,
    methods: {
        verifyECDHSecp256k1: {
            privateInputs: [Secp256k1Curve.Scalar.Canonical, ForeignCurveV2],
            async method(
                userPrivateKey: CanonicalForeignField,
                peersPublicKey: ForeignCurveV2,
            ) {
                return ECDHSecp256k1.computeSharedSecret(userPrivateKey, peersPublicKey);
            },
        },
    },
});

let { verifyECDHSecp256k1 } = await ecdhVerificationProgram.analyzeMethods();

console.log(verifyECDHSecp256k1.summary());

console.time('compile');
const forceRecompile = false;
await ecdhVerificationProgram.compile({ forceRecompile });
console.timeEnd('compile');

console.time('generate ECDH keys');
const ecdhInstance = new ECDHSecp256k1();
const { privateKey: alicePrivateKey, publicKey: alicePublicKey } = ecdhInstance.generateKey();
const { privateKey: bobPrivateKey, publicKey: bobPublicKey } = ecdhInstance.generateKey();
console.timeEnd('generate ECDH keys');

console.time('prove');
let proof = await ecdhVerificationProgram.verifyECDHSecp256k1(alicePrivateKey, bobPublicKey);
console.timeEnd('prove');

console.time('verify');
let isVerified = await ecdhVerificationProgram.verify(proof);
console.timeEnd('verify');

console.log(`Proof verified: ${isVerified}`);
