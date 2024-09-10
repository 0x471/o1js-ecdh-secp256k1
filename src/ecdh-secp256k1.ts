import { createForeignCurveV2, Crypto, CanonicalForeignField, ForeignCurveV2 } from "o1js";

class Secp256k1Curve extends createForeignCurveV2(Crypto.CurveParams.Secp256k1) { }

class ECDHSecp256k1 {
  private static G = Secp256k1Curve.generator;

  generateKey(): { privateKey: CanonicalForeignField, publicKey: ForeignCurveV2 } {
    const privateKey = Secp256k1Curve.Scalar.random();
    const publicKey = ECDHSecp256k1.G.scale(privateKey);
    return { privateKey, publicKey };
  }

  publicKey(privateKey: CanonicalForeignField): ForeignCurveV2 {
    return ECDHSecp256k1.G.scale(privateKey);
  }

  computeSecret(privateKey: CanonicalForeignField, peersPublicKey: ForeignCurveV2): ForeignCurveV2 {
    return peersPublicKey.scale(privateKey);
  }
}

