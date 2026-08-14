import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDialog } from "../context/useDialog";
import { useGameContext } from "../context/useGameContext";

function DeleteBtn({ id, playerName }) {
  const { confirm, alert } = useDialog();
  const { deletePlayer, playerList, currentRoundExists } = useGameContext();

  async function handleDelete() {
    if (currentRoundExists && playerList.length < 3) {
      await alert({
        title: "Cannot Delete Player!",
        message: "Cannot continue the game with less than 2 players.",
        actionText: "Understood",
        alertType: "warning",
      });
    } else {
      const confirmed = await confirm({
        title: "Delete Player?",
        message: `Remove ${playerName} from this game? This cannot be undone.`,
        confirmText: "Delete",
        cancelText: "Cancel",
        isDangerous: true,
      });
      if (confirmed) {
        deletePlayer(id);
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      title={`Remove ${playerName}`}
      className="text-red-500 hover:text-red-400"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}

export default DeleteBtn;
