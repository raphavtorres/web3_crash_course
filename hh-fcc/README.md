# Web3 basics with vs code

## Compile

```bash
yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol
```

| Command        | Description                                         |
| -------------- | --------------------------------------------------- |
| --bin          | get binary code                                     |
| --abi          | get contract abi                                    |
| --include-path | to add any contracts or files from node_modules     |
| --base-path .  | set base path to "this" folder                      |
| -o .           | output the compiled binary and ABI to "this" folder |
