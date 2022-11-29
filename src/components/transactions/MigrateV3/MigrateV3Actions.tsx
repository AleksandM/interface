import { useTransactionHandler } from 'src/helpers/useTransactionHandler';
import { useRootStore } from 'src/store/root';

export const MigrateV3Actions = () => {
  // const selectedAssets = useRootStore((store) => )
  const migrateWithPermits = useRootStore((store) => store.migrateWithPermits);
  const migrateWithoutPermits = useRootStore((store) => store.migrateWithoutPermits);
  const getApprovePermitsForSelectedAssets = useRootStore(
    (store) => store.getApprovePermitsForSelectedAssets
  );
  const { approval, action } = useTransactionHandler({
    handleGetTxns: async () => migrateWithoutPermits(),
    handleGetPermitTxns: async (signatures, deadline) => migrateWithPermits(signatures, deadline),
    tryPermit: true,
  });

  const handleApproval = () => {
    const approvePermitsForSelectedAssets = getApprovePermitsForSelectedAssets();
    approval(approvePermitsForSelectedAssets);
  };

  return (
    <div>
      <button onClick={handleApproval}>Approve</button>
      {/* <button onClick={() => }></button> */}
      <button onClick={action}>Migrate</button>
    </div>
  );
};
