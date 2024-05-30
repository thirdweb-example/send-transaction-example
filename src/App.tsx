import {
  ADDRESS_ZERO,
  createThirdwebClient,
  prepareTransaction,
  toWei,
} from "thirdweb";
import { avalancheFuji, ethereum } from "thirdweb/chains";
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
  useSendTransaction,
} from "thirdweb/react";

const client = createThirdwebClient({
  clientId: import.meta.env.VITE_CLIENT_ID,
});

function App() {
  const account = useActiveAccount();
  return (
    <div className="flex py-12 px-3">
      <div className="m-auto max-w-[550px] text-center">
        <div className="text-3xl">
          Send transactions with{" "}
          <a
            href="https://portal.thirdweb.com/connect/pay/buy-with-crypto"
            target="_blank"
            className="underline font-bold text-purple-600"
          >
            Pay
          </a>{" "}
          integrated
        </div>
        <div className="mt-5">
          In this demo we will be sending a transaction with a very high value
          (100 ETH). Pay will then automatically be invoked when a user does not
          have enough funds to complete the transaction. <br />
          <em className="text-sm">
            Since the value is too high, Pay might be unable to fetch the price
            quote - but you get the idea of the demo!
          </em>
        </div>
        <div className="mt-5 mx-auto">
          <ConnectButton client={client} />
        </div>
        {account && (
          <TransactionButton
            payModal={{
              theme: "light",
            }}
            style={{ marginTop: "18px" }}
            transaction={() => {
              const transaction = prepareTransaction({
                to: ADDRESS_ZERO,
                chain: ethereum,
                client: client,
                value: toWei("100"),
              });
              return transaction;
            }}
          >
            Send 100 ETH
          </TransactionButton>
        )}
      </div>
    </div>
  );
}

export default App;
