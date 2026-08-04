import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function DeleteBtn({ deletePlayer, id }) {
  return (
    <button onClick={() => deletePlayer(id)}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}

export default DeleteBtn;
