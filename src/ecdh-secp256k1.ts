import { Bytes, createEcdsaV2, createForeignCurveV2, Hash, Crypto, Field } from "o1js";
const payload = new Uint8Array([1]);

class Curve extends createForeignCurveV2(Crypto.CurveParams.Secp256k1) {}
class Ecdsa extends createEcdsaV2(Curve) {}

function main() {
  let generator = Curve.generator;
  console.log(Curve.generator);
  console.log(Curve.modulus)

  let privateKeyAlice = Curve.Scalar.random();
  let publicKeyAlice = Curve.generator.scale(privateKeyAlice);

  let privateKeyBob = Curve.Scalar.random();
  let publicKeyBob = Curve.generator.scale(privateKeyBob);

  let aliceCalculatesSharedKey = publicKeyBob.scale(privateKeyAlice);
  let bobCalculatesSharedKey = publicKeyAlice.scale(privateKeyBob);
  console.log("Shared Key Alice")
  console.log(aliceCalculatesSharedKey.x.toBigInt())
  console.log(aliceCalculatesSharedKey.y.toBigInt())
  console.log("\n")
  console.log("Shared Key Bob")
  console.log(bobCalculatesSharedKey.x.toBigInt())
  console.log(bobCalculatesSharedKey.y.toBigInt()) 


}

main();