import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon";
import { useCoingeckoTokenPrice, useCoingeckoPrice } from '@usedapp/coingecko'

type Props = {
  handleOpenModal: any;
};

export default function ConnectButton({ handleOpenModal }: Props) {
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const weth = "0xd0a1e359811322d97991e03f863a0c30c2cf029c";
  const tokenBalance = useTokenBalance(weth, account);

  const WETH_CONTRACT = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  const wethPrice = useCoingeckoTokenPrice(WETH_CONTRACT, 'usd');
  const etherPrice = useCoingeckoPrice('ethereum', 'usd')

  let netType = "";
  if(chainId == 42) netType = "Kovan";
  else if(chainId == 1) netType = "Mainnet";
  else if(chainId == 3) netType = "Ropsten";
  else if(chainId == 4) netType = "Rinkeby";
  else if(chainId == 5) netType = "Goerli";

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return (
    account ? (
    <Box
      display="flex"
      alignItems="center"
      background="gray.700"
      borderRadius="xl"
      py="0"
    >
      <Box px="3">
        <Text color="gray" fontWeight="bold" fontSize="md">
          {netType}
        </Text>
      </Box>
      <Box px="3">
        <Text color="white" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
        </Text>
      </Box>
      <Box px="3">
        <Text color="white" fontSize="md">
          ${etherPrice}/ETH
        </Text>
      </Box>
      
      <Button
        onClick={handleOpenModal}
        bg="gray.800"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
          backgroundColor: "gray.700",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
        <Identicon />
      </Button>
    </Box>
  ) : (
    <Button
      onClick={handleConnectWallet}
      bg="blue.800"
      color="blue.300"
      fontSize="lg"
      fontWeight="medium"
      borderRadius="xl"
      border="1px solid transparent"
      _hover={{
        borderColor: "blue.700",
        color: "blue.400",
      }}
      _active={{
        backgroundColor: "blue.800",
        borderColor: "blue.700",
      }}
    >
      Connect to a wallet
    </Button>
  )
  );
}
