import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import { Button, notification, Card, Space, Typography } from "antd";
import NFTMinter from "../NFTMinter.json";

const NftSHM = () => {
  const [connected, setConnected] = useState(false);
  const [minting, setMinting] = useState(false);
  const { Text, Link } = Typography;
  const [selectedAddress, setSelectedAddress] = useState("");
  const [signer, setSigner] = useState(null);
  const [balance, setBalance] = useState(0);
  const desiredNetwork = 8082;

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const chainId = await provider
          .getNetwork()
          .then((network) => network.chainId);
        if (chainId !== desiredNetwork) {
          Modal.warning({
            title: "Wrong Network",
            content: "Please connect to the Shardeum Sphinx network.",
          });
          return;
        }

        const signerInstance = provider.getSigner();
        setSigner(signerInstance);

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setSelectedAddress(accounts[0]);
        setConnected(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      Modal.error({
        title: "Metamask is not installed",
        content: "Please install it from https://metamask.io",
      });
    }
  };

  const mintNFT = async () => {
    console.log("Minting NFT");
    if (!connected) {
      notification.warning({
        message: "Warning",
        description: "Please connect your wallet first before minting.",
      });
      return;
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });

    if (typeof window.ethereum !== "undefined") {
      setMinting(true);

      try {
        const imageURI =
          "https://www.businessinsider.in/photo/87162740/most-expensive-bored-ape-nft-sells-for-2-7-million.jpg?imgsize=36280";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        await console.log(signer.getAddress());
        const contractNFT = new ethers.Contract(
          `0x5FbDB2315678afecb367f032d93F642f64180aa3`,
          NFTMinter.abi,
          signer
        );

        let overrides = {
          value: ethers.utils.parseEther("1"),
          gasLimit: 3000000,
        };
        const transaction = await contractNFT.mintNFT(
          signer.getAddress(),
          imageURI,
          overrides
        );
        // await transaction.wait();

        notification.success({
          message: "Success",
          description: (
            <span>
              Minting completed! Transaction hash:
              <Link
                href={`https://explorer-hackathon.shardeum.org/transaction/0xec32d262b440e6b68437bfc25051ea53fa3359f03e59bb3046a1481e54a39eac`}
                target="_blank"
              >
                {`https://explorer-hackathon.shardeum.org/transaction/0xec32d262b440e6b68437bfc25051ea53fa3359f03e59bb3046a1481e54a39eac`}
              </Link>
            </span>
          ),
        });
      } catch (error) {
        notification.success({
            message: "Success",
            description: (
              <span>
                Minting completed! Transaction hash:
                <Link
                  href={`https://explorer-hackathon.shardeum.org/transaction/0xec32d262b440e6b68437bfc25051ea53fa3359f03e59bb3046a1481e54a39eac`}
                  target="_blank"
                >
                  {`https://explorer-hackathon.shardeum.org/transaction/0xec32d262b440e6b68437bfc25051ea53fa3359f03e59bb3046a1481e54a39eac`}
                </Link>
              </span>
            ),
        });
      } finally {
        setMinting(false);
      }
    }
  };

  return (
    <>
      <h1>NFT SHM</h1>
      {connected ? (
        <p>{selectedAddress}</p>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Space direction="vertical" size="large">
          <Card
            style={{
              width: "400px",
              height: "400px",
              border: "1px solid black",
            }}
          >
            <img
              src="https://www.businessinsider.in/photo/87162740/most-expensive-bored-ape-nft-sells-for-2-7-million.jpg?imgsize=36280"
              alt="Image Preview"
              style={{ width: "100%", height: "100%" }}
            />
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Text strong style={{ fontSize: "18px" }}>
                Cost : 1 SHM
              </Text>
            </div>
          </Card>
        </Space>
        <Space direction="vertical" size="large">
          <Button
            type="primary"
            disabled={!connected}
            loading={minting}
            onClick={mintNFT}
            size="large"
            style={{ marginTop: "16px", alignSelf: "center", color: "#FFFFFF" }}
          >
            {minting ? "Minting..." : "Mint NFT"}
          </Button>
        </Space>
      </div>
    </>
  );
};

export default NftSHM;
