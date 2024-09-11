# ECDH secp256k1 - o1js

## Overview
This project provides an implementation of the Elliptic Curve Diffie-Hellman (ECDH) key exchange protocol using the secp256k1 curve, built on top of the o1js library. ECDH allows two parties to securely exchange cryptographic keys over a public channel.

## What is ECDH?
Elliptic Curve Diffie-Hellman (ECDH) is a key exchange mechanism based on elliptic curve cryptography (ECC). It allows two parties, each with a public and private key pair, to establish a shared secret over an insecure channel. This shared secret can then be used to securely encrypt further communication.

The secp256k1 curve is a widely-used elliptic curve, particularly in blockchain and cryptocurrency applications such as Bitcoin & Ethereum.

There are interesting use cases such as:
- [Balance hiding for DAO treasuries.](https://github.com/lyronctk/treasure-house?tab=readme-ov-file) ([Based on work done by Griffin Dunaif & Dan Boneh](https://hackmd.io/nCASdhqVQNWwMhpTmKpnKQ)).


## Overview

| Category          | Count  |
|-------------------|--------|
| Total rows        | 21,059 |
| RangeCheck0       | 5,448  |
| RangeCheck1       | 2,724  |
| Zero              | 4,490  |
| ForeignFieldAdd   | 1,460  |
| Generic           | 3,939  |
| ForeignFieldMul   | 798    |
| Poseidon          | 2,200  |


## Performance Metrics

| Task                           | Time         |
|---------------------------------|--------------|
| Compile                        | 3.316s       |
| Generate ECDH keys             | 1.961ms      |
| Prove Alice                    | 22.432s      |
| Prove Bob                      | 17.200s      |
| Verify Alice                   | 818.308ms    |
| Verify Bob                     | 737.852ms    |

MacBook Pro M1, 8GB RAM

## How to build

```sh
npm run build
```

## How to run tests

```sh
npm run test
npm run testw # watch mode
```

## How to run coverage

```sh
npm run coverage
```

## How to run the example (run.ts)
```sh
npm run example
```

## License

[Apache-2.0](LICENSE)
