---
layout: lesson
title: Adding Tari to Your Exchange
date: 2024-06-28 12:00
author: stringhandler
subtitle:
class: subpage
---

## Node Setup
In order to accept Tari, you will need to have a base layer Minotari node. You can either run it yourself, or find a node that has the correct GRPC methods exposed to the internet. It is recommended that you run your own node.

It may also be worth running multiple nodes as backups to ensure availability.

> NOTE: For all servers connected to the internet, they must either be running a Tor client or configure public IP information. Documentation on this is available [here](https://github.com/tari-project/tari#README) and [here](https://github.com/tari-project/tari/discussions/6366). If you are running on Linux, the Tari applications have built-in Tor support, so this can be ignored.

### Section 1: Installing Minotari Node
> NOTE: If you are using a public `minotari_node`, you can skip this section. Note that you will need the `public key` and the `public address` of the public node in question in order to correctly proceed with this exchange guide.

1. You can access the compiled binaries [here](https://tari.com/downloads/). If you would prefer to compile from source, you will need to follow the instructions located [here.](https://github.com/tari-project/tari#building-from-source)

2. Use the instructions here to [install the minotari_node](https://github.com/tari-project/tari?tab=readme-ov-file#installing-using-binaries).

> NOTE: Depending on your environment, the location of the installed files will likely change. For Mac and Linux, you will likely find it in your Home directory in a `.tari` folder. It may be hidden, in which case you will need to change your settings to be able to view hidden files. On Windows, it will install on in the location you specified during the installation process. To have Minotari create the folder in a specific location, you can use the `--b` path command. Note that you will require this command going forward if you are not using the default folder.

3. Start the node (consecutive runs): 
```
minotari_node
```

If a node has not yet been created, it will inform you that a node config file does not exist. You will also be asked if you wish to mine. Select "n" in this case.

Next, you'll be asked if you wish to create a node identity. Select 'y'. This is essential for generating the private/public key pair and getting the node recognised by the network.

Once done, the Minotari base node will boot up. You'll see a splash page with a list of the various terminal commands that are available to you. Some useful ones are:

* `watch status`: returns you to the auto-refresh status from the Command Mode

4. Press Ctrl+C to enter the command mode

5. Type `whoami` and press enter. You'll see you're Public Key, Node ID and Public Address, along with a QR Code. You should copy this data to a file for future reference.

```
18:46 v1.0.0-pre.16 esmeralda State: Listening Tip: 3872 (Tue, 23 Jul 2024 14:27:53 +0000) Mempool: 0tx (0g, +/- 0blks) Connections: 0|0 Banned: 0 Messages (last 60s): 0 Rpc: 0/100 ️🔌
>> whoami
Public Key: 90f67a04edcb36261e6304ca213629d183c44e26bd47e38c253473f44d901733
Node ID: e8ed9a4fd38577b6b01e3b8e9d
Public Addresses: /onion3/f5qbkkfkoxowzvshe5mppzpgiiy76cwumpsacungeldoal6hehcgzfqd:18141
Features: PeerFeatures(MESSAGE_PROPAGATION | DHT_STORE_FORWARD)
```

B6. Restart the node (Ctrl+C twice to quit, then typing `minotari_node` again).

### Section 2: Creating a wallet

In this section we'll create a wallet address for receiving funds. 

If you are not familiar with seed phrases, you should probably stop here and ask for help. Get in touch with the Tari contributors if you need help

> Note: It's suggested you run this step on a trusted computer, that you know will not leak the information. Ideally, this computer should be entirely offline.

1. First, let's create a folder to hold all the wallet data.
```
mkdir tari_wallet_data
cd tari_wallet_data
```

2. Now let's run the wallet. Make sure that you specify the `--base-path` field to keep all the data in the above folder so that you can delete it afterwards.
```
minotari_console_wallet --base-path ~/tari_wallet_data
```

You'll be presented with a menu. As this guide assumes you are setting up Minotari for the first time, select `1`

```
Console Wallet

1. Create a new wallet.
2. Recover wallet from seed words or hardware device.
3. Create a read-only wallet using a view key.
>>
```

3. You will be asked if you want to mine. Choose `N`

```
Node config does not exist.
Would you like to mine (Y/n)?
NOTE: this will enable additional gRPC methods that could be used to monitor and submit blocks from this node.
```

You will be asked if you wish to use a connected hardware wallet. Press 'n' here.

```
Would you like to use a connected hardware wallet? (Supported types: Ledger) (Y/n)
```

5. Next we will be asked for a password. You will need to save this password for future use. Enter this password now and confirm it. 
> NOTE: You will not see the password as you type it.

7. Next you will be presented with your seed words. You must write these down to be backed up in a secure place.

> Note: This is a very sensitive and important step. Be careful not to leak data here, and be sure that the seed words are appropriately backed up.


```
=========================
       IMPORTANT!        
=========================
These are your wallet seed words.
They can be used to recover your wallet and funds.
WRITE THEM DOWN OR COPY THEM NOW. THIS IS YOUR ONLY CHANCE TO DO SO.

=========================
<...............seed words will be presented here.............>
=========================

I confirm that I will never see these seed words again.
Type the word "confirm" to continue.
>>
```
Following the creation of the wallet, it will launch into the Minotari Console Wallet interface. 

### Section 3: Obtain the addresses of the main wallet

1. While in the wallet interface, press the right arrow twice to get to the `Receive` tab, and you will be presented with all of the addresses associated with the wallet.

 <img src="tariexchangeguide_wallet_addresses.png">

2. Copy the details you see above. Most important is the `Tari Address one-sided` field. This is the address that users will send funds to for the exchange.

3. Press `f10` or `Ctrl+Q` to exit the wallet

4. Next, we'll export the view key for the wallet. (We'll use this in step 21)
Run the following command and enter in your wallet passphrase generated earlier.

```
minotari_console_wallet --base-path ~/tari_wallet_data export-view-key-and-spend-key
```

You'll be presented with information that looks similar to the below:

```
1. ExportViewKeyAndSpendKey(ExportViewKeyAndSpendKeyArgs { output_file: None })

View key: cb6c13f07af23380c7756bbfcd622bc3277ec2cc42abd5ed3d8ddd19fa49060c
Spend key: f29039796b3430c6927f26bf216b6241dd7fad7f30a6640e8ac95f3d0af51a52
Minotari Console Wallet running... (Command mode completed)

Press Enter to continue to the wallet, or type q (or quit) followed by Enter.

```
5. Make note of the `view key` and `spend key`; copy them to an easily referenced place. We will be using them in future steps.

6. Type `q` and then press `Enter` to exit the console wallet.

7. Make sure you have saved the above data. You can now destroy the folder `tari_wallet_data` and even the machine if you wish.

> Note: If you are going to remove the configuration data or destroy the device, be sure you have correctly backed up the view and spend keys.

### Section 4: Setting up a read-only wallet to receive deposits

In this section, we will create a second, read-only wallet that will watch for funds received at the address saved in the previous section. If you are integrating an exchange, this is how you can watch for received funds. 

> NOTE: This second wallet will not have the ability to spend any funds. While this limits the security risk, it is good practice to maintain security best practices when configuring any system accessible by third-parties.

1. On a server machine that is connected to the internet. Run this command to create a wallet
> By default all data is stored in `~/.tari`. You can find all logs, config and data in there. If you would like to use a specific folder, you can use the `--base-path` folder.
```
minotari_console_wallet
```

2. You will be asked if you want to mine. Choose `N`

```
Node config does not exist.
Would you like to mine (Y/n)?
NOTE: this will enable additional gRPC methods that could be used to monitor and submit blocks from this node.
```

3. Next, you will be asked if you want to create a new wallet, restore it, or create a read-only wallet using a view key. We want to create a _read-only wallet_, so we will select `3` here.

```
Console Wallet

1. Create a new wallet.
2. Recover wallet from seed words or hardware device.
3. Create a read-only wallet using a view key.
>>
```

4. Next we will be asked for a password. You will need to save this password for future use. Enter this password now and confirm it. 

> Note: It is suggested you use a different password here from the one used to create the first wallet. 

5. You will need to enter the view and spend keys noted in *Section 4*

```
Enter view key:  (hex)
cb6c13f07af23380c7756bbfcd622bc3277ec2cc42abd5ed3d8ddd19fa49060c

Enter the public spend key:  (hex or base58)
f29039796b3430c6927f26bf216b6241dd7fad7f30a6640e8ac95f3d0af51a52  
```

6. You should now see the familiar console wallet. We'll need to configure it further, so close it by pressing `f10` and move onto the next section.

### Section 5: Configuring the read-only wallet

1. Browse to the config file under `~/.tari/mainnet/config/config.toml` and open it in your favourite text editor.

2. Find the section `[Wallet Configuration Options (WalletConfig)]`. Below is a typical example of the beginning of the wallet configuration section within the `config.toml` file.

```toml
########################################################################################################################
#                                                                                                                      #
#                      Wallet Configuration Options (WalletConfig)                                                     #
#                                                                                                                      #
########################################################################################################################

[wallet]
# The buffer size constants for the publish/subscribe connector channel, connecting comms messages to the domain layer:
# (min value = 300, default value = 50000).
#buffer_size = 50000is
```

3. Next, find the line `#grpc_enabled = false` and change it to `grpc_enabled = true`
> Note: Remember to remove the `#` character at the start of the line if it is not already removed.

```toml
# Set to true to enable grpc. (default = false)
grpc_enabled = true
# The socket to expose for the gRPC base node server (default = "/ip4/127.0.0.1/tcp/18143")
#grpc_address = "/ip4/127.0.0.1/tcp/18143"
# gRPC authentication method (default = "none")
#grpc_authentication = { username = "admin", password = "xxxx" }
```

> Note: If you wish to secure the gRPC more, you can edit the other settings. It is important that the wallet's gRPC port is not accessible from the public internet

4. Set the wallet's base node. Set this value to the `minotari_node` you created or chose at the beginning of this guide in **Section 1**.

> Note: The format is `<public_key>::<public address>`. This is what it should look like using the example data from **Section 1**. You should not use the data below, but insert your own details.

```toml
# A custom base node peer that will be used to obtain metadata from, example
# "0eefb45a4de9484eca74846a4f47d2c8d38e76be1fec63b0112bd00d297c0928::/ip4/13.40.98.39/tcp/18189"
# (default = )
custom_base_node = "22d33b525d35d256674c5184c262b70d15275effcf5f6fe6dc0d359a18541d04::/onion3/6x54mmubphz5r3opswpuhseswivvlaxbohuqvwsn4o36zmtudq73dgid:18141"
```

5. Save the file and start the wallet again.

```
minotari_console_wallet
```

You are now ready to receive deposits. In the next section we'll list for incoming transactions.

### Section 6: Listening for incoming transactions

Depending on your process, we'll use the gRPC server that is hosted in the read-only wallet we just created to listen for incoming deposits. 

In this example we will use NodeJS. Reach out to us if you would like an example in your favourite language.

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf
const PROTO_PATH = './proto/wallet.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const streamingProto = grpc.loadPackageDefinition(packageDefinition).tari.rpc;

// Create a client
console.log(streamingProto);
const client = new streamingProto.Wallet('localhost:18143', grpc.credentials.createInsecure());

const request = {};

// Call the gRPC method
const call = client.GetCompletedTransactions(request);

// Handle the stream of responses
call.on('data', (response) => {
    console.log('Received data:', response);
    // ..... Do business logic with transaction. E.g. compare the reference in payment_id to a reference provided to the exchange client and allocate
    // to their account
    // ....
});

call.on('end', () => {
    console.log('Stream ended.');
});

call.on('error', (err) => {
    console.error('Stream error:', err);
});

call.on('status', (status) => {
    console.log('Stream status:', status);
});

```

## General descriptions of activities

### Section 7: An example for receiving funds

Each exchange will have their own processes, but here is an example of receiving funds from a KYC'ed client. 

1. The client begins the deposit process. For example, clicking on a "Deposit" button

2. The exchange generates a long unique ID for the deposit. This may be a single reference that is reused for the client, or every 
deposit may have their own reference.

3. The exchange provides their `Tari Address one-sided` and the reference to the client. The exchange must also save this reference in their internal database.

> Note: Exchanges should use the one-sided or non-interactive addresses instead of interactive addresses so that they can receive deposits even if their infrastructure is offline. Interactive addresses are intended for peer-to-peer transactions.

4. The client uses Tari Aurora or another Tari-enabled wallet and sends a non-interactive transaction to the provided address. They must include the provided reference with this transaction.

5. A process similar to the example in Section 6, the exchange periodically runs the script to see if there are any new transactions.

6. For new transactions, compare against the list of expected references in their internal database and if there is a match, call the internal system to allocate funds to the client's account.

### Section 8: Performing withdrawals

In this section we'll perform a withdrawal from the same address we used in section 3. It is also possible to have a number of different wallets and send funds between them. The process is mostly the same, but is out of scope for this document.

> NOTE: The wallet used to spend funds should not be online for more time than is necessary. It is recommended that the machine running this wallet is secured.

Before we spend funds, we must have a wallet set up with the seed words created in Step 7 of Section 2. 

Once the wallet is set up, continue with the steps below.

1. Run the wallet to update the balance

```
minotari_console_wallet --password <password> --p"wallet.custom_base_node='<node_pub_key>::<node_pub_address>'" --auto-exit sync
```

> TIP: The custom base node can also be set as an environment variable `TARI_WALLET__CUSTOM_BASE_NODE`

2. Validate there are sufficient funds in the wallet
```
minotari_console_wallet --password <password> --p"wallet.custom_base_node='<node_pub_key>::<node_pub_address>'" --auto-exit get-balance
```

```
Minotari Console Wallet running... (Command mode started)
==============
Command Runner
==============

1. GetBalance

Available balance: 10000.000000 T
Time locked: 0 µT
Pending incoming balance: 27960.980255 T
Pending outgoing balance: 0 µT

Minotari Console Wallet running... (Command mode completed)

```

3. Send funds to the desired address

```
minotari_console_wallet --password <password> --p"wallet.custom_base_node='<node_pub_key>::<node_pub_address>'" --auto-exit send-minotari <amount> <destination>

```
Replace `<amount>` and `<destination>` with the amount to send and Tari address to send funds to. Note: The amount is specified in units of 0.000001 XTM. To specify the amount in Tari, you can append the letter `T`. For example, `send-minotari 10000` would send an amount of `0.01 XTM`. `send-minotari 100T` would send an amount of `100 XTM`.

> IMPORTANT: Exchanges should not allow clients to provide interactive Tari Addresses. This can be easily validated by checking the second byte of the address.